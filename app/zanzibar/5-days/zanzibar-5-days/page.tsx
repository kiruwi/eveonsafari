import { permanentRedirect } from "next/navigation";
import { withCanonical } from "@/lib/seo";

export const metadata = withCanonical("/travel-style/beach-and-holiday-in-africa", {
  robots: {
    index: false,
    follow: false,
  },
});

export default function ZanzibarFiveDaysRedirectPage() {
  permanentRedirect("/travel-style/beach-and-holiday-in-africa");
}
