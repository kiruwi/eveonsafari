import SafariDurationContent from "../_components/DurationContent";
import { withCanonical } from "@/lib/seo";
export const metadata = withCanonical("/safaris/duration/6-days");


export default function SafariDurationSixDaysPage() {
  return <SafariDurationContent durationKey="6-days" />;
}
