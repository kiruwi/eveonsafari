import type { Metadata } from "next";
import SafariStyleContent, { styleKeys, getStyleContent } from "../_components/StyleContent";
import { withCanonical } from "@/lib/seo";

export const dynamicParams = false;

export const generateStaticParams = () =>
  styleKeys.map((style) => ({ style }));

const normalizeStyle = (value?: unknown) => {
  if (typeof value === "string") {
    return value
      .trim()
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");
  }
  if (Array.isArray(value)) {
    return value
      .join(" ")
      .trim()
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");
  }
  return "";
};

export function generateMetadata({ params }: { params: { style?: string | string[] } }): Metadata {
  const styleKey = normalizeStyle(params?.style);
  const content = getStyleContent(styleKey);

  if (!content) {
    return {};
  }

  return withCanonical(`/safaris/style/${styleKey}`, {
    title: `Tanzania Safaris: ${content.label} | Eve On Safari`,
    description: content.summary,
  });
}

export default function SafariStylePage({ params }: { params: { style?: string | string[] } }) {
  const styleKey = normalizeStyle(params?.style);
  return <SafariStyleContent styleKey={styleKey} />;
}
