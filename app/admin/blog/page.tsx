"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";

import { normalizeSlug, type BlogArticle, type BlogEntry } from "@/lib/blog";
import { supabase } from "@/lib/supabaseClient";

const inputClass =
  "mt-1 w-full rounded-[12px] border border-[#c3c3c3] bg-white px-3 py-2 text-sm text-[#231f20]";
const labelClass = "text-[11px] uppercase tracking-[0.3em] text-[#ba7e47]";
const sectionClass =
  "rounded-[24px] border border-[#c3c3c3] bg-white p-6 shadow-sm";

const getFormText = (formData: FormData, key: string) => {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
};

const getOptionalFormText = (formData: FormData, key: string) => {
  const value = getFormText(formData, key);
  return value.length ? value : null;
};

const getFileFromForm = (formData: FormData, key: string) => {
  const value = formData.get(key);
  if (value instanceof File && value.size > 0) {
    return value;
  }
  return null;
};

type ArticlePayload = {
  title: string;
  slug: string;
  excerpt?: string | null;
  cover_image_url?: string | null;
  intro?: string | null;
  content_markdown: string;
  author_name?: string | null;
  status?: string;
  published_at?: string | null;
};

type EntryPayload = {
  article_id: string;
  title: string;
  slug: string;
  category: string;
  location?: string | null;
  content_markdown: string;
  featured_image_url?: string | null;
  status?: string;
};

const authRedirectPath = "/admin/blog";
const allowedAdminEmail = "iankcheruiyot@gmail.com";

const isAllowedEmail = (email: string | null | undefined) =>
  (email ?? "").toLowerCase() === allowedAdminEmail;

const storageBucket = "blog-images";

const getFileExtension = (filename: string) => {
  const parts = filename.split(".");
  return parts.length > 1 ? parts.pop() : null;
};

export default function AdminBlogPage() {
  const router = useRouter();
  const [authStatus, setAuthStatus] = useState<
    "loading" | "signedIn" | "signedOut" | "unauthorized"
  >("loading");
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [articles, setArticles] = useState<BlogArticle[]>([]);
  const [entries, setEntries] = useState<BlogEntry[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const authHref = useMemo(
    () => `/auth?next=${encodeURIComponent(authRedirectPath)}`,
    [],
  );

  useEffect(() => {
    const loadSession = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (error || !data.session) {
        setAuthStatus("signedOut");
        setUserEmail(null);
        setAccessToken(null);
        return;
      }
      const email = data.session.user.email ?? null;
      setUserEmail(email);
      if (!isAllowedEmail(email)) {
        setAuthStatus("unauthorized");
        setAccessToken(null);
        return;
      }
      setAuthStatus("signedIn");
      setAccessToken(data.session.access_token);
    };

    loadSession();

    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        setAuthStatus("signedOut");
        setUserEmail(null);
        setAccessToken(null);
        return;
      }
      const email = session.user.email ?? null;
      setUserEmail(email);
      if (!isAllowedEmail(email)) {
        setAuthStatus("unauthorized");
        setAccessToken(null);
        return;
      }
      setAuthStatus("signedIn");
      setAccessToken(session.access_token);
    });

    return () => {
      data.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (authStatus === "signedOut") {
      router.replace(authHref);
    }
  }, [authStatus, authHref, router]);

  const handleSignOut = useCallback(async () => {
    await supabase.auth.signOut();
    setAuthStatus("signedOut");
    setUserEmail(null);
    setAccessToken(null);
    router.replace(authHref);
  }, [authHref, router]);

  const fetchAdmin = useCallback(
    async <T,>(path: string, options?: RequestInit): Promise<T> => {
      if (!accessToken) {
        throw new Error("Missing auth token.");
      }
      const response = await fetch(path, {
        ...options,
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
          ...(options?.headers ?? {}),
        },
      });

      if (!response.ok) {
        const payload = await response.json().catch(() => ({}));
        throw new Error(payload.error || "Request failed.");
      }

      return response.json() as Promise<T>;
    },
    [accessToken],
  );

  const loadData = useCallback(async () => {
    if (!accessToken) return;
    setIsLoading(true);
    setErrorMessage(null);
    try {
      const [articlesPayload, entriesPayload] = await Promise.all([
        fetchAdmin<{ data: BlogArticle[] }>("/api/admin/blog/articles"),
        fetchAdmin<{ data: BlogEntry[] }>("/api/admin/blog/entries"),
      ]);
      setArticles(articlesPayload.data ?? []);
      setEntries(entriesPayload.data ?? []);
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : "Failed to load data.",
      );
    } finally {
      setIsLoading(false);
    }
  }, [accessToken, fetchAdmin]);

  useEffect(() => {
    if (authStatus === "signedIn" && accessToken) {
      loadData();
    }
  }, [authStatus, accessToken, loadData]);

  const uploadImage = async (file: File, folder: string, slugSeed: string) => {
    setIsUploading(true);
    try {
      const extension = getFileExtension(file.name) ?? "jpg";
      const filename = `${normalizeSlug(slugSeed || file.name) || "image"}-${Date.now()}.${extension}`;
      const path = `${folder}/${filename}`;
      const { error } = await supabase.storage
        .from(storageBucket)
        .upload(path, file, { upsert: true });
      if (error) {
        throw error;
      }
      const { data } = supabase.storage.from(storageBucket).getPublicUrl(path);
      return data.publicUrl;
    } finally {
      setIsUploading(false);
    }
  };

  const handleCreateArticle = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const title = getFormText(formData, "title");
    const slugInput = getFormText(formData, "slug");
    const slug = normalizeSlug(slugInput || title);
    const coverFile = getFileFromForm(formData, "cover_image_file");
    const coverImageUrl = coverFile
      ? await uploadImage(coverFile, "covers", slug)
      : null;
    const payload: ArticlePayload = {
      title,
      slug,
      excerpt: getOptionalFormText(formData, "excerpt"),
      cover_image_url: coverImageUrl,
      intro: getOptionalFormText(formData, "intro"),
      content_markdown: getFormText(formData, "content_markdown"),
      author_name: getOptionalFormText(formData, "author_name"),
      status: getFormText(formData, "status"),
    };

    try {
      await fetchAdmin("/api/admin/blog/articles", {
        method: "POST",
        body: JSON.stringify(payload),
      });
      form.reset();
      await loadData();
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : "Failed to create article.",
      );
    }
  };

  const handleUpdateArticle = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const title = getFormText(formData, "title");
    const slugInput = getFormText(formData, "slug");
    const slug = normalizeSlug(slugInput || title);
    const coverFile = getFileFromForm(formData, "cover_image_file");
    const existingCover = getOptionalFormText(formData, "cover_image_url");
    const coverImageUrl = coverFile
      ? await uploadImage(coverFile, "covers", slug)
      : existingCover;
    const payload: ArticlePayload & { id: string } = {
      id: getFormText(formData, "id"),
      title,
      slug,
      excerpt: getOptionalFormText(formData, "excerpt"),
      cover_image_url: coverImageUrl,
      intro: getOptionalFormText(formData, "intro"),
      content_markdown: getFormText(formData, "content_markdown"),
      author_name: getOptionalFormText(formData, "author_name"),
      status: getFormText(formData, "status"),
      published_at: getOptionalFormText(formData, "published_at"),
    };

    try {
      await fetchAdmin("/api/admin/blog/articles", {
        method: "PATCH",
        body: JSON.stringify(payload),
      });
      await loadData();
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : "Failed to update article.",
      );
    }
  };

  const handleCreateEntry = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const title = getFormText(formData, "title");
    const slugInput = getFormText(formData, "slug");
    const slug = normalizeSlug(slugInput || title);
    const featuredFile = getFileFromForm(formData, "featured_image_file");
    const featuredImageUrl = featuredFile
      ? await uploadImage(featuredFile, "entries", slug)
      : null;
    const payload: EntryPayload = {
      article_id: getFormText(formData, "article_id"),
      title,
      slug,
      category: getFormText(formData, "category"),
      location: getOptionalFormText(formData, "location"),
      content_markdown: getFormText(formData, "content_markdown"),
      featured_image_url: featuredImageUrl,
      status: getFormText(formData, "status"),
    };

    try {
      await fetchAdmin("/api/admin/blog/entries", {
        method: "POST",
        body: JSON.stringify(payload),
      });
      form.reset();
      await loadData();
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : "Failed to create entry.",
      );
    }
  };

  const handleUpdateEntry = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const title = getFormText(formData, "title");
    const slugInput = getFormText(formData, "slug");
    const slug = normalizeSlug(slugInput || title);
    const featuredFile = getFileFromForm(formData, "featured_image_file");
    const existingFeatured = getOptionalFormText(formData, "featured_image_url");
    const featuredImageUrl = featuredFile
      ? await uploadImage(featuredFile, "entries", slug)
      : existingFeatured;
    const payload: EntryPayload & { id: string } = {
      id: getFormText(formData, "id"),
      article_id: getFormText(formData, "article_id"),
      title,
      slug,
      category: getFormText(formData, "category"),
      location: getOptionalFormText(formData, "location"),
      content_markdown: getFormText(formData, "content_markdown"),
      featured_image_url: featuredImageUrl,
      status: getFormText(formData, "status"),
    };

    try {
      await fetchAdmin("/api/admin/blog/entries", {
        method: "PATCH",
        body: JSON.stringify(payload),
      });
      await loadData();
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : "Failed to update entry.",
      );
    }
  };

  if (authStatus === "loading") {
    return (
      <div className="bg-white">
        <section className="mx-auto max-w-3xl px-4 py-16 md:px-6 lg:px-0">
          <p className="text-sm text-[#231f20]/70">Checking access...</p>
        </section>
      </div>
    );
  }

  if (authStatus === "unauthorized") {
    return (
      <div className="bg-white">
        <section className="mx-auto max-w-3xl px-4 py-16 md:px-6 lg:px-0">
          <h1 className="text-2xl font-semibold text-[#231f20]">
            Access restricted
          </h1>
          <p className="mt-3 text-base text-[#231f20]/70">
            Only {allowedAdminEmail} can manage blog content.
          </p>
          {userEmail ? (
            <p className="mt-2 text-sm text-[#231f20]/70">
              Signed in as {userEmail}.
            </p>
          ) : null}
          <button
            type="button"
            onClick={handleSignOut}
            className="mt-6 inline-flex rounded-full bg-[#231f20] px-5 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-white"
          >
            Sign out
          </button>
        </section>
      </div>
    );
  }

  if (authStatus === "signedOut") {
    return (
      <div className="bg-white">
        <section className="mx-auto max-w-3xl px-4 py-16 md:px-6 lg:px-0">
          <h1 className="text-2xl font-semibold text-[#231f20]">
            Sign in required
          </h1>
          <p className="mt-3 text-base text-[#231f20]/70">
            You need an authenticated Supabase session to manage blog content.
          </p>
          <Link
            href={authHref}
            className="mt-6 inline-flex rounded-full bg-[#231f20] px-5 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-white"
          >
            Continue to sign in
          </Link>
        </section>
      </div>
    );
  }

  return (
    <div className="bg-white">
      <section className="mx-auto max-w-6xl px-4 py-16 md:px-6 lg:px-0">
        <header className="space-y-3">
          <p className="text-xs uppercase tracking-[0.3em] text-[#ba7e47]">
            Admin
          </p>
          <h1
            className="text-4xl font-semibold text-[#231f20] sm:text-5xl"
            style={{ fontFamily: "var(--font-american-grunge, var(--font-title, inherit))" }}
          >
            Blog manager
          </h1>
          <p className="text-base text-[#231f20]/80">
            Create and maintain guide pages and their linked entries.
          </p>
          {errorMessage ? (
            <p className="text-sm text-red-600">{errorMessage}</p>
          ) : null}
          {isUploading ? (
            <p className="text-sm text-[#231f20]/70">Uploading image...</p>
          ) : null}
        </header>

        <div className="mt-12 grid gap-10 lg:grid-cols-2">
          <section className="space-y-6">
            <div className={sectionClass}>
              <h2 className="text-lg font-semibold text-[#231f20]">
                Create a guide
              </h2>
              <form onSubmit={handleCreateArticle} className="mt-5 space-y-4">
                <div>
                  <label className={labelClass} htmlFor="article-title">
                    Title
                  </label>
                  <input
                    id="article-title"
                    name="title"
                    className={inputClass}
                    required
                  />
                </div>
                <div>
                  <label className={labelClass} htmlFor="article-slug">
                    Slug (optional)
                  </label>
                  <input
                    id="article-slug"
                    name="slug"
                    className={inputClass}
                    placeholder="tanzania-safari-guide"
                  />
                </div>
                <div>
                  <label className={labelClass} htmlFor="article-excerpt">
                    Excerpt
                  </label>
                  <textarea
                    id="article-excerpt"
                    name="excerpt"
                    className={`${inputClass} min-h-[90px]`}
                  />
                </div>
                <div>
                  <label className={labelClass} htmlFor="article-cover-image">
                    Cover image (upload)
                  </label>
                  <input
                    id="article-cover-image"
                    name="cover_image_file"
                    type="file"
                    accept="image/*"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass} htmlFor="article-intro">
                    Intro text
                  </label>
                  <textarea
                    id="article-intro"
                    name="intro"
                    className={`${inputClass} min-h-[100px]`}
                  />
                </div>
                <div>
                  <label className={labelClass} htmlFor="article-content">
                    Content markdown (use H2 sections)
                  </label>
                  <p className="mt-2 text-sm text-[#231f20]/70">
                    Headings like "Parks", "Islands", "Camps", or "Activities"
                    will auto-link matching entries by category.
                  </p>
                  <textarea
                    id="article-content"
                    name="content_markdown"
                    className={`${inputClass} min-h-[220px]`}
                    required
                  />
                </div>
                <div>
                  <label className={labelClass} htmlFor="article-author">
                    Author name
                  </label>
                  <input
                    id="article-author"
                    name="author_name"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass} htmlFor="article-status">
                    Status
                  </label>
                  <select
                    id="article-status"
                    name="status"
                    className={inputClass}
                    defaultValue="draft"
                  >
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                  </select>
                </div>
                <button
                  type="submit"
                  className="w-full rounded-full bg-[#231f20] px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-white transition hover:bg-black"
                >
                  Create guide
                </button>
              </form>
            </div>

            <div className="space-y-4">
              {isLoading ? (
                <div className={sectionClass}>
                  <p className="text-sm text-[#231f20]/70">Loading guides...</p>
                </div>
              ) : articles.length ? (
                articles.map((article) => (
                  <details key={article.id} className={sectionClass}>
                    <summary className="cursor-pointer text-sm font-semibold text-[#231f20]">
                      {article.title}{" "}
                      <span className="text-xs uppercase tracking-[0.3em] text-[#ba7e47]">
                        {article.status}
                      </span>
                    </summary>
                    <form onSubmit={handleUpdateArticle} className="mt-5 space-y-4">
                      <input type="hidden" name="id" value={article.id} />
                      <input
                        type="hidden"
                        name="published_at"
                        value={article.published_at ?? ""}
                      />
                      <input
                        type="hidden"
                        name="cover_image_url"
                        value={article.cover_image_url ?? ""}
                      />
                      <div>
                        <label className={labelClass}>Title</label>
                        <input
                          name="title"
                          className={inputClass}
                          defaultValue={article.title}
                          required
                        />
                      </div>
                      <div>
                        <label className={labelClass}>Slug</label>
                        <input
                          name="slug"
                          className={inputClass}
                          defaultValue={article.slug}
                        />
                      </div>
                      <div>
                        <label className={labelClass}>Excerpt</label>
                        <textarea
                          name="excerpt"
                          className={`${inputClass} min-h-[90px]`}
                          defaultValue={article.excerpt ?? ""}
                        />
                      </div>
                      <div>
                        <label className={labelClass}>Cover image (upload)</label>
                        {article.cover_image_url ? (
                          <img
                            src={article.cover_image_url}
                            alt={article.title}
                            className="mt-3 h-32 w-full rounded-[18px] object-cover"
                            loading="lazy"
                            referrerPolicy="no-referrer"
                          />
                        ) : null}
                        <input
                          name="cover_image_file"
                          type="file"
                          accept="image/*"
                          className={`${inputClass} mt-3`}
                        />
                      </div>
                      <div>
                        <label className={labelClass}>Intro text</label>
                        <textarea
                          name="intro"
                          className={`${inputClass} min-h-[100px]`}
                          defaultValue={article.intro ?? ""}
                        />
                      </div>
                      <div>
                        <label className={labelClass}>
                          Content markdown (use H2 sections)
                        </label>
                        <p className="mt-2 text-sm text-[#231f20]/70">
                          Headings like "Parks", "Islands", "Camps", or "Activities"
                          will auto-link matching entries by category.
                        </p>
                        <textarea
                          name="content_markdown"
                          className={`${inputClass} min-h-[220px]`}
                          defaultValue={article.content_markdown}
                          required
                        />
                      </div>
                      <div>
                        <label className={labelClass}>Author name</label>
                        <input
                          name="author_name"
                          className={inputClass}
                          defaultValue={article.author_name ?? ""}
                        />
                      </div>
                      <div>
                        <label className={labelClass}>Status</label>
                        <select
                          name="status"
                          className={inputClass}
                          defaultValue={article.status}
                        >
                          <option value="draft">Draft</option>
                          <option value="published">Published</option>
                        </select>
                      </div>
                      <div className="flex flex-wrap items-center gap-3">
                        <button
                          type="submit"
                          className="rounded-full bg-[#231f20] px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-white transition hover:bg-black"
                        >
                          Update guide
                        </button>
                        <Link
                          href={`/blog/${normalizeSlug(article.slug || article.title)}`}
                          className="text-xs uppercase tracking-[0.3em] text-[#ba7e47]"
                        >
                          View guide
                        </Link>
                      </div>
                    </form>
                  </details>
                ))
              ) : (
                <div className={sectionClass}>
                  <p className="text-sm text-[#231f20]/70">
                    No guides yet. Create your first guide above.
                  </p>
                </div>
              )}
            </div>
          </section>

          <section className="space-y-6">
            <div className={sectionClass}>
              <h2 className="text-lg font-semibold text-[#231f20]">
                Create an entry
              </h2>
              <form onSubmit={handleCreateEntry} className="mt-5 space-y-4">
                <div>
                  <label className={labelClass} htmlFor="entry-article">
                    Guide
                  </label>
                  <select
                    id="entry-article"
                    name="article_id"
                    className={inputClass}
                    required
                  >
                    <option value="">Select a guide</option>
                    {articles.map((article) => (
                      <option key={article.id} value={article.id}>
                        {article.title}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className={labelClass} htmlFor="entry-title">
                    Title
                  </label>
                  <input
                    id="entry-title"
                    name="title"
                    className={inputClass}
                    required
                  />
                </div>
                <div>
                  <label className={labelClass} htmlFor="entry-slug">
                    Slug (optional)
                  </label>
                  <input
                    id="entry-slug"
                    name="slug"
                    className={inputClass}
                    placeholder="serengeti-park-overview"
                  />
                </div>
                <div>
                  <label className={labelClass} htmlFor="entry-category">
                    Category
                  </label>
                  <select
                    id="entry-category"
                    name="category"
                    className={inputClass}
                    defaultValue="park"
                  >
                    <option value="park">Park</option>
                    <option value="island">Island</option>
                    <option value="camp">Camp</option>
                    <option value="activity">Activity</option>
                  </select>
                </div>
                <div>
                  <label className={labelClass} htmlFor="entry-location">
                    Location
                  </label>
                  <input
                    id="entry-location"
                    name="location"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass} htmlFor="entry-featured-image">
                    Featured image (upload)
                  </label>
                  <input
                    id="entry-featured-image"
                    name="featured_image_file"
                    type="file"
                    accept="image/*"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass} htmlFor="entry-content">
                    Content markdown
                  </label>
                  <textarea
                    id="entry-content"
                    name="content_markdown"
                    className={`${inputClass} min-h-[220px]`}
                    required
                  />
                </div>
                <div>
                  <label className={labelClass} htmlFor="entry-status">
                    Status
                  </label>
                  <select
                    id="entry-status"
                    name="status"
                    className={inputClass}
                    defaultValue="published"
                  >
                    <option value="published">Published</option>
                    <option value="draft">Draft</option>
                  </select>
                </div>
                <button
                  type="submit"
                  className="w-full rounded-full bg-[#231f20] px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-white transition hover:bg-black"
                >
                  Create entry
                </button>
              </form>
            </div>

            <div className="space-y-4">
              {isLoading ? (
                <div className={sectionClass}>
                  <p className="text-sm text-[#231f20]/70">Loading entries...</p>
                </div>
              ) : entries.length ? (
                entries.map((entry) => (
                  <details key={entry.id} className={sectionClass}>
                    <summary className="cursor-pointer text-sm font-semibold text-[#231f20]">
                      {entry.title}{" "}
                      <span className="text-xs uppercase tracking-[0.3em] text-[#ba7e47]">
                        {entry.status}
                      </span>
                    </summary>
                    <form onSubmit={handleUpdateEntry} className="mt-5 space-y-4">
                      <input type="hidden" name="id" value={entry.id} />
                      <input
                        type="hidden"
                        name="featured_image_url"
                        value={entry.featured_image_url ?? ""}
                      />
                      <div>
                        <label className={labelClass}>Guide</label>
                        <select
                          name="article_id"
                          className={inputClass}
                          defaultValue={entry.article_id ?? ""}
                        >
                          <option value="">Select a guide</option>
                          {articles.map((article) => (
                            <option key={article.id} value={article.id}>
                              {article.title}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className={labelClass}>Title</label>
                        <input
                          name="title"
                          className={inputClass}
                          defaultValue={entry.title}
                          required
                        />
                      </div>
                      <div>
                        <label className={labelClass}>Slug</label>
                        <input
                          name="slug"
                          className={inputClass}
                          defaultValue={entry.slug}
                        />
                      </div>
                      <div>
                        <label className={labelClass}>Category</label>
                        <select
                          name="category"
                          className={inputClass}
                          defaultValue={entry.category}
                        >
                          <option value="park">Park</option>
                          <option value="island">Island</option>
                          <option value="camp">Camp</option>
                          <option value="activity">Activity</option>
                        </select>
                      </div>
                      <div>
                        <label className={labelClass}>Location</label>
                        <input
                          name="location"
                          className={inputClass}
                          defaultValue={entry.location ?? ""}
                        />
                      </div>
                      <div>
                        <label className={labelClass}>Featured image (upload)</label>
                        {entry.featured_image_url ? (
                          <img
                            src={entry.featured_image_url}
                            alt={entry.title}
                            className="mt-3 h-32 w-full rounded-[18px] object-cover"
                            loading="lazy"
                            referrerPolicy="no-referrer"
                          />
                        ) : null}
                        <input
                          name="featured_image_file"
                          type="file"
                          accept="image/*"
                          className={`${inputClass} mt-3`}
                        />
                      </div>
                      <div>
                        <label className={labelClass}>Content markdown</label>
                        <textarea
                          name="content_markdown"
                          className={`${inputClass} min-h-[220px]`}
                          defaultValue={entry.content_markdown}
                          required
                        />
                      </div>
                      <div>
                        <label className={labelClass}>Status</label>
                        <select
                          name="status"
                          className={inputClass}
                          defaultValue={entry.status}
                        >
                          <option value="published">Published</option>
                          <option value="draft">Draft</option>
                        </select>
                      </div>
                      <div className="flex flex-wrap items-center gap-3">
                        <button
                          type="submit"
                          className="rounded-full bg-[#231f20] px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-white transition hover:bg-black"
                        >
                          Update entry
                        </button>
                        <Link
                          href={`/blog/entry/${normalizeSlug(entry.slug || entry.title)}`}
                          className="text-xs uppercase tracking-[0.3em] text-[#ba7e47]"
                        >
                          View entry
                        </Link>
                      </div>
                    </form>
                  </details>
                ))
              ) : (
                <div className={sectionClass}>
                  <p className="text-sm text-[#231f20]/70">
                    No entries yet. Create your first entry above.
                  </p>
                </div>
              )}
            </div>
          </section>
        </div>
      </section>
    </div>
  );
}
