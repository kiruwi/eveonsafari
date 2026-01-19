import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { BlogEntryCard } from "@/components/BlogEntryCard";
import { MarkdownContent } from "@/components/MarkdownContent";
import {
  formatBlogDate,
  inferCategoryFromHeading,
  matchesHeadingCategory,
  parseMarkdownSections,
  type BlogArticle,
  type BlogEntry,
} from "@/lib/blog";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export const dynamic = "force-dynamic";

type PageProps = {
  params: { slug: string };
};

const fetchArticle = async (slug: string) => {
  const { data, error } = await supabaseAdmin
    .from("blog_articles")
    .select("*")
    .eq("slug", slug)
    .eq("status", "published")
    .maybeSingle();

  if (error) {
    console.error("Blog article fetch failed:", error);
  }

  return data as BlogArticle | null;
};

const fetchEntries = async (articleId: string) => {
  const { data, error } = await supabaseAdmin
    .from("blog_entries")
    .select("*")
    .eq("article_id", articleId)
    .ilike("status", "published")
    .order("order_index", { ascending: true })
    .order("title", { ascending: true });

  if (error) {
    console.error("Blog entries fetch failed:", error);
  }

  return (data ?? []) as BlogEntry[];
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const article = await fetchArticle(params.slug);

  if (!article) {
    return {
      title: "Guide not found | Eve On Safari",
    };
  }

  return {
    title: `${article.title} | Eve On Safari`,
    description:
      article.excerpt ??
      article.intro ??
      "Explore this safari planning guide from Eve On Safari.",
  };
}

export default async function BlogArticlePage({ params }: PageProps) {
  const article = await fetchArticle(params.slug);

  if (!article) {
    notFound();
  }

  const entries = await fetchEntries(article.id);
  const { sections, toc } = parseMarkdownSections(article.content_markdown ?? "");
  const updatedLabel = formatBlogDate(
    article.updated_at ?? article.published_at ?? null,
  );

  const usedEntryIds = new Set<string>();

  return (
    <div className="bg-white">
      <section className="mx-auto max-w-6xl px-4 py-16 md:px-6 lg:px-0">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-[#ba7e47]"
        >
          <span aria-hidden="true">&larr;</span>
          Back to blog
        </Link>

        <header className="mt-6 space-y-4">
          <h1
            className="text-4xl font-semibold leading-tight text-[#231f20] sm:text-5xl"
            style={{ fontFamily: "var(--font-american-grunge, var(--font-title, inherit))" }}
          >
            {article.title}
          </h1>
          <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.3em] text-[#ba7e47]">
            <span>{article.author_name ?? "Eve On Safari"}</span>
            {updatedLabel ? <span>Updated {updatedLabel}</span> : null}
          </div>
          {article.intro ? (
            <p className="max-w-3xl text-base text-[#231f20]/80">
              {article.intro}
            </p>
          ) : null}
        </header>

        {toc.length ? (
          <div className="mt-10 rounded-[22px] border border-[#c3c3c3] bg-[#fdf2e4] px-6 py-5">
            <p className="text-xs uppercase tracking-[0.3em] text-[#ba7e47]">
              In this guide
            </p>
            <ul className="mt-4 grid gap-2 text-sm text-[#231f20]/80 md:grid-cols-2">
              {toc.map((item) => (
                <li key={item.id}>
                  <a href={`#${item.id}`} className="hover:text-[#231f20]">
                    {item.text}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        <div className="mt-12 space-y-12">
          {sections.map((section, index) => {
            const sectionCategory =
              inferCategoryFromHeading(section.heading) ??
              (section.heading ? section.heading.toLowerCase() : null);
            const sectionEntries = entries.filter((entry) => {
              const matchesCategory = sectionCategory
                ? entry.category.toLowerCase() === sectionCategory
                : false;
              const matchesHeading = matchesHeadingCategory(
                section.heading,
                entry.category,
              );
              const isMatch = matchesCategory || matchesHeading;
              if (!isMatch) return false;
              if (usedEntryIds.has(entry.id)) return false;
              usedEntryIds.add(entry.id);
              return true;
            });

            return (
              <section key={section.id ?? `section-${index}`} className="space-y-6">
                {section.heading ? (
                  <h2
                    id={section.id ?? undefined}
                    className="text-2xl font-semibold text-[#231f20]"
                  >
                    {section.heading}
                  </h2>
                ) : null}
                {section.content ? (
                  <MarkdownContent
                    content={section.content}
                    className="space-y-4"
                  />
                ) : null}
                {sectionEntries.length ? (
                  <div className="grid gap-4 md:grid-cols-2">
                    {sectionEntries.map((entry) => (
                      <BlogEntryCard key={entry.id} entry={entry} />
                    ))}
                  </div>
                ) : null}
              </section>
            );
          })}
        </div>

        {entries.length > 0 && usedEntryIds.size !== entries.length ? (
          <section className="mt-14 space-y-6">
            <h2 className="text-2xl font-semibold text-[#231f20]">
              Related entries
            </h2>
            <div className="grid gap-4 md:grid-cols-2">
              {entries
                .filter((entry) => !usedEntryIds.has(entry.id))
                .map((entry) => (
                  <BlogEntryCard key={entry.id} entry={entry} />
                ))}
            </div>
          </section>
        ) : null}
      </section>
    </div>
  );
}
