export type BlogArticle = {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  cover_image_url: string | null;
  intro: string | null;
  content_markdown: string;
  status: "draft" | "published";
  published_at: string | null;
  author_name: string | null;
  created_at: string | null;
  updated_at: string | null;
};

export type BlogEntry = {
  id: string;
  article_id: string | null;
  title: string;
  slug: string;
  category: string;
  location: string | null;
  content_markdown: string;
  featured_image_url: string | null;
  order_index: number | null;
  status: string;
  created_at: string | null;
};

export type TocItem = {
  id: string;
  text: string;
};

export type MarkdownSection = {
  heading: string | null;
  id: string | null;
  content: string;
};

export const normalizeSlug = (value: string | null | undefined) => {
  const raw = typeof value === "string" ? value : "";
  return raw
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
};

const cleanHeading = (value: string) =>
  value.replace(/\s*#+\s*$/, "").trim();

const createHeadingId = (value: string, counts: Map<string, number>) => {
  const base = normalizeSlug(value) || "section";
  const currentCount = counts.get(base) ?? 0;
  counts.set(base, currentCount + 1);
  return currentCount ? `${base}-${currentCount + 1}` : base;
};

export const parseMarkdownSections = (markdown: string) => {
  const lines = markdown.split(/\r?\n/);
  const sections: MarkdownSection[] = [];
  const toc: TocItem[] = [];
  const counts = new Map<string, number>();
  let currentHeading: string | null = null;
  let currentId: string | null = null;
  let buffer: string[] = [];

  const pushSection = () => {
    const hasContent = buffer.some((line) => line.trim().length > 0);
    if (!currentHeading && !hasContent) {
      buffer = [];
      return;
    }

    sections.push({
      heading: currentHeading,
      id: currentId,
      content: buffer.join("\n").trim(),
    });
    buffer = [];
  };

  for (const line of lines) {
    const match = line.match(/^\s*##\s+(.+)\s*$/);
    if (match) {
      pushSection();
      const headingText = cleanHeading(match[1] ?? "");
      const headingId = createHeadingId(headingText, counts);
      currentHeading = headingText;
      currentId = headingId;
      toc.push({ id: headingId, text: headingText });
      continue;
    }
    buffer.push(line);
  }

  pushSection();

  return { sections, toc };
};

export const formatBlogDate = (value: string | null) => {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
};

export const inferCategoryFromHeading = (heading: string | null | undefined) => {
  if (typeof heading !== "string" || !heading.trim()) return null;
  const lowered = heading.toLowerCase();
  if (lowered.includes("park")) return "park";
  if (lowered.includes("island")) return "island";
  if (lowered.includes("camp")) return "camp";
  if (lowered.includes("activity")) return "activity";
  return null;
};

export const matchesHeadingCategory = (
  heading: string | null | undefined,
  category: string | null | undefined,
) => {
  if (typeof heading !== "string" || typeof category !== "string") return false;
  const loweredHeading = heading.toLowerCase();
  const loweredCategory = category.toLowerCase();
  return (
    loweredHeading.includes(loweredCategory) ||
    loweredHeading.replace(/s$/, "") === loweredCategory
  );
};
