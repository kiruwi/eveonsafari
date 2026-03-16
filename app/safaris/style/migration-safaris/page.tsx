import SafariStyleContent from "../_components/StyleContent";
import { withCanonical } from "@/lib/seo";
export const metadata = withCanonical("/safaris/style/migration-safaris");


export default function SafariStyleMigrationSafarisPage() {
  return <SafariStyleContent styleKey="migration-safaris" />;
}
