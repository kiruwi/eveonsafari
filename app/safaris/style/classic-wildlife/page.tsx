import SafariStyleContent from "../_components/StyleContent";
import { withCanonical } from "@/lib/seo";
export const metadata = withCanonical("/safaris/style/classic-wildlife");


export default function SafariStyleClassicWildlifePage() {
  return <SafariStyleContent styleKey="classic-wildlife" />;
}
