import { redirect } from "next/navigation";
import { withCanonical } from "@/lib/seo";
export const metadata = withCanonical("/activities/cultural-visits");


export default function CulturalVisitsRedirect() {
  redirect("/travel-style/cultural-eco-tourism-safari");
}
