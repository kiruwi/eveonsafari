import SafariStyleContent from "../_components/StyleContent";
import { withCanonical } from "@/lib/seo";
export const metadata = withCanonical("/safaris/style/cultural-safaris");


export default function SafariStyleCulturalSafarisPage() {
  return <SafariStyleContent styleKey="cultural-safaris" />;
}
