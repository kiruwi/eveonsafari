import SafariStyleContent, { styleKeys } from "../_components/StyleContent";

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

export default function SafariStylePage({ params }: { params: { style?: string | string[] } }) {
  const styleKey = normalizeStyle(params?.style);
  return <SafariStyleContent styleKey={styleKey} />;
}
