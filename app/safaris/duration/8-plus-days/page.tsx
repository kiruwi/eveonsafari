import SafariDurationContent from "../_components/DurationContent";
import { withCanonical } from "@/lib/seo";
export const metadata = withCanonical("/safaris/duration/8-plus-days");


export default function SafariDurationEightPlusDaysPage() {
  return <SafariDurationContent durationKey="8-plus-days" />;
}
