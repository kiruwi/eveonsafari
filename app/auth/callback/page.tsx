import { withCanonical } from "@/lib/seo";
import AuthCallbackPageClient from "./AuthCallbackPageClient";

export const metadata = withCanonical("/auth/callback", {
  robots: {
    index: false,
    follow: false,
  },
});

export default function AuthCallbackPage() {
  return <AuthCallbackPageClient />;
}
