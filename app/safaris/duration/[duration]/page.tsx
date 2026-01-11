import SafariDurationContent, { durationKeys } from "../_components/DurationContent";

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

export default function SafariDurationPage({ params }: { params: { duration?: string | string[] } }) {
  const durationKey = normalizeDuration(params?.duration);
  return <SafariDurationContent durationKey={durationKey} />;
}
