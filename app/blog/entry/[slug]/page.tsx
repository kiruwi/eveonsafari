import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { MarkdownContent } from "@/components/MarkdownContent";
import type { BlogArticle, BlogEntry } from "@/lib/blog";
import { formatBlogDate } from "@/lib/blog";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export const dynamic = "force-dynamic";

type PageProps = {
  params: { slug: string };
};

const fetchEntry = async (slug: string) => {
  const { data, error } = await supabaseAdmin
    .from("blog_entries")
    .select("*")
    .eq("slug", slug)
    .ilike("status", "published")
    .maybeSingle();

  if (error) {
    console.error("Blog entry fetch failed:", error);
  }

  return data as BlogEntry | null;
};

const fetchArticle = async (articleId: string) => {
  const { data, error } = await supabaseAdmin
    .from("blog_articles")
    .select("id, title, slug, status")
    .eq("id", articleId)
    .maybeSingle();

  if (error) {
    console.error("Blog article lookup failed:", error);
  }

  return data as Pick<BlogArticle, "id" | "title" | "slug" | "status"> | null;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const entry = await fetchEntry(params.slug);

  if (!entry) {
    return {
      title: "Entry not found | Eve On Safari",
    };
  }

  return {
    title: `${entry.title} | Eve On Safari`,
    description:
      entry.location ??
      "Explore this safari planning entry from Eve On Safari.",
  };
}

const formatCategory = (category: string) =>
  category
    .replace(/[_-]+/g, " ")
    .replace(/\b\w/g, (match) => match.toUpperCase());

export default async function BlogEntryPage({ params }: PageProps) {
  const entry = await fetchEntry(params.slug);

  if (!entry) {
    notFound();
  }

  const article =
    entry.article_id ? await fetchArticle(entry.article_id) : null;

  return (
    <div className="bg-white">
      <section className="mx-auto max-w-4xl px-4 py-16 md:px-6 lg:px-0">
        {article && article.status === "published" ? (
          <Link
            href={`/blog/${article.slug}`}
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-[#ba7e47]"
          >
            <span aria-hidden="true">&larr;</span>
            Back to {article.title}
          </Link>
        ) : (
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-[#ba7e47]"
          >
            <span aria-hidden="true">&larr;</span>
            Back to blog
          </Link>
        )}

        <header className="mt-6 space-y-4">
          <p className="text-xs uppercase tracking-[0.3em] text-[#ba7e47]">
            {formatCategory(entry.category)}
          </p>
          <h1
            className="text-4xl font-semibold leading-tight text-[#231f20] sm:text-5xl"
            style={{ fontFamily: "var(--font-american-grunge, var(--font-title, inherit))" }}
          >
            {entry.title}
          </h1>
          <div className="flex flex-wrap items-center gap-3 text-sm text-[#231f20]/70">
            {entry.location ? <span>{entry.location}</span> : null}
            {entry.created_at ? (
              <span>Updated {formatBlogDate(entry.created_at)}</span>
            ) : null}
          </div>
        </header>

        {entry.featured_image_url ? (
          <div className="mt-8 overflow-hidden rounded-[26px] border border-[#c3c3c3]">
            <img
              src={entry.featured_image_url}
              alt={entry.title}
              className="h-full w-full object-cover"
              loading="lazy"
              referrerPolicy={
                entry.featured_image_url.startsWith("/") ? undefined : "no-referrer"
              }
            />
          </div>
        ) : null}

        <div className="mt-10">
          <MarkdownContent
            content={entry.content_markdown}
            className="space-y-4"
          />
        </div>
      </section>
    </div>
  );
}
