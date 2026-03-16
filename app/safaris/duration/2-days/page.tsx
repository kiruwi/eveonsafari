import SafariDurationContent from "../_components/DurationContent";
import { withCanonical } from "@/lib/seo";
export const metadata = withCanonical("/safaris/duration/2-days");


export default function SafariDurationTwoDaysPage() {
  return <SafariDurationContent durationKey="2-days" />;
}
