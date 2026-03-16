import SafariStyleContent from "../_components/StyleContent";
import { withCanonical } from "@/lib/seo";
export const metadata = withCanonical("/safaris/style/family-safaris");


export default function SafariStyleFamilySafarisPage() {
  return <SafariStyleContent styleKey="family-safaris" />;
}
