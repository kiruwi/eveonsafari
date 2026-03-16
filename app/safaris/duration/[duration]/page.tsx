import type { Metadata } from "next";
import SafariDurationContent, { durationKeys, getDurationContent } from "../_components/DurationContent";
import { withCanonical } from "@/lib/seo";

export const dynamicParams = false;

export const generateStaticParams = () =>
  durationKeys.map((duration) => ({ duration }));

const normalizeDuration = (value?: unknown) => {
  if (typeof value === "string") {
    return value
      .trim()
      .toLowerCase()
      .replace(/\+/g, " plus ")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");
  }
  if (Array.isArray(value)) {
    return value
      .join(" ")
      .trim()
      .toLowerCase()
      .replace(/\+/g, " plus ")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");
  }
  return "";
};

export function generateMetadata({ params }: { params: { duration?: string | string[] } }): Metadata {
  const durationKey = normalizeDuration(params?.duration);
  const content = getDurationContent(durationKey);

  if (!content) {
    return {};
  }

  return withCanonical(`/safaris/duration/${durationKey}`, {
    title: `Tanzania Safaris: ${content.label} | Eve On Safari`,
    description: content.summary,
  });
}

export default function SafariDurationPage({ params }: { params: { duration?: string | string[] } }) {
  const durationKey = normalizeDuration(params?.duration);
  return <SafariDurationContent durationKey={durationKey} />;
}
