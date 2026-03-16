import SafariDurationContent from "../_components/DurationContent";
import { withCanonical } from "@/lib/seo";
export const metadata = withCanonical("/safaris/duration/3-days");


export default function SafariDurationThreeDaysPage() {
  return <SafariDurationContent durationKey="3-days" />;
}
