import SafariDurationContent from "../_components/DurationContent";
import { withCanonical } from "@/lib/seo";
export const metadata = withCanonical("/safaris/duration/7-days");


export default function SafariDurationSevenDaysPage() {
  return <SafariDurationContent durationKey="7-days" />;
}
