import type { Metadata } from "next";
import Link from "next/link";

import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { formatBlogDate, normalizeSlug } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog | Eve On Safari",
  description:
    "Explore planning guides, destination notes, and safari insights from the Eve On Safari team.",
};

export const dynamic = "force-dynamic";

type BlogArticleListItem = {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  intro: string | null;
  cover_image_url: string | null;
  published_at: string | null;
  updated_at: string | null;
  author_name: string | null;
};

export default async function BlogIndexPage() {
  const { data, error } = await supabaseAdmin
    .from("blog_articles")
    .select(
      "id, title, slug, excerpt, intro, cover_image_url, published_at, updated_at, author_name",
    )
    .eq("status", "published")
    .order("published_at", { ascending: false, nullsFirst: false });

  if (error) {
    console.error("Blog list fetch failed:", error);
  }

  const articles = (data ?? []) as BlogArticleListItem[];

  return (
    <div className="bg-white">
      <section className="mx-auto max-w-6xl px-4 py-16 md:px-6 lg:px-0">
        <header className="space-y-3 text-center">
          <p className="text-xs uppercase tracking-[0.4em] text-[#ba7e47]">
            Eve On Safari Journal
          </p>
          <h1
            className="text-4xl font-semibold leading-tight text-[#231f20] sm:text-5xl"
            style={{ fontFamily: "var(--font-american-grunge, var(--font-title, inherit))" }}
          >
            Blog and travel guides
          </h1>
          <p className="text-base text-[#231f20]/80">
            Planning notes, park spotlights, and itineraries built from real safari
            experience.
          </p>
        </header>

        {articles.length ? (
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {articles.map((article) => {
              const articleSlug = normalizeSlug(article.slug || article.title);
              const teaser =
                article.excerpt ??
                article.intro ??
                "Explore this guide for planning tips and safari inspiration.";
              const dateLabel = formatBlogDate(
                article.published_at ?? article.updated_at,
              );

              return (
                <Link
                  key={article.id}
                  href={`/blog/${articleSlug}`}
                  className="group flex h-full flex-col overflow-hidden rounded-[26px] border border-[#c3c3c3] bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                >
                  {article.cover_image_url ? (
                    <div className="h-44 w-full overflow-hidden">
                      <img
                        src={article.cover_image_url}
                        alt={article.title}
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                        loading="lazy"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  ) : (
                    <div className="flex h-44 w-full items-center justify-center bg-[#f4f1ea] text-xs uppercase tracking-[0.3em] text-[#ba7e47]">
                      Eve On Safari
                    </div>
                  )}
                  <div className="flex h-full flex-col gap-3 px-5 py-5">
                    <div className="space-y-2">
                      <h2 className="text-xl font-semibold text-[#231f20]">
                        {article.title}
                      </h2>
                      <p className="text-sm text-[#231f20]/70">{teaser}</p>
                    </div>
                    <div className="mt-auto flex items-center justify-between text-xs uppercase tracking-[0.3em] text-[#ba7e47]">
                      <span>{article.author_name ?? "Eve On Safari"}</span>
                      {dateLabel ? <span>{dateLabel}</span> : null}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="mt-12 rounded-[24px] border border-[#c3c3c3] bg-[#fdf2e4] p-8 text-center">
            <p className="text-sm uppercase tracking-[0.3em] text-[#ba7e47]">
              Coming soon
            </p>
            <p className="mt-3 text-base text-[#231f20]/80">
              New planning guides are on the way. Check back shortly.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
