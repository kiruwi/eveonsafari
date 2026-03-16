import SafariDurationContent from "../_components/DurationContent";
import { withCanonical } from "@/lib/seo";
export const metadata = withCanonical("/safaris/duration/4-days");


export default function SafariDurationFourDaysPage() {
  return <SafariDurationContent durationKey="4-days" />;
}
