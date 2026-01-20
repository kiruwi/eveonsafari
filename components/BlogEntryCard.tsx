import Link from "next/link";

import { normalizeSlug, type BlogEntry } from "@/lib/blog";

type BlogEntryCardProps = {
  entry: BlogEntry;
};

const categoryLabel = (category: string) =>
  category
    .replace(/[_-]+/g, " ")
    .replace(/\b\w/g, (match) => match.toUpperCase());

export function BlogEntryCard({ entry }: BlogEntryCardProps) {
  const entrySlug = normalizeSlug(entry.slug || entry.title);

  return (
    <Link
      href={`/blog/entry/${entrySlug}`}
      className="group flex h-full flex-col gap-3 rounded-[22px] border border-[#c3c3c3] bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
    >
      {entry.featured_image_url ? (
        <img
          src={entry.featured_image_url}
          alt={entry.title}
          className="h-36 w-full rounded-[16px] object-cover"
          loading="lazy"
          referrerPolicy="no-referrer"
        />
      ) : null}
      <div className="space-y-2">
        <p className="text-[11px] uppercase tracking-[0.3em] text-[#ba7e47]">
          {categoryLabel(entry.category)}
        </p>
        <h3 className="text-lg font-semibold text-[#231f20]">{entry.title}</h3>
        {entry.location ? (
          <p className="text-sm text-[#231f20]/70">{entry.location}</p>
        ) : null}
        <span className="inline-flex items-center gap-2 text-sm font-semibold text-[#ba7e47]">
          Read entry
          <svg
            aria-hidden="true"
            className="h-4 w-4 -translate-y-px"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M7 17 17 7" />
            <path d="M10 7h7v7" />
          </svg>
        </span>
      </div>
    </Link>
  );
}
