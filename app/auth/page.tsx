import { withCanonical } from "@/lib/seo";
import AuthPageClient from "./AuthPageClient";

export const metadata = withCanonical("/auth", {
  robots: {
    index: false,
    follow: false,
  },
});

export default function AuthPage() {
  return <AuthPageClient />;
}
