import { assertSafeOutboundUrl } from "./ssrf";
import { getAllowedOrigins, getCanonicalOriginOrThrow, isProduction } from "./config";

export function assertTrustedAppUrl(rawUrl: string, label: string) {
  const canonicalOrigin = getCanonicalOriginOrThrow();
  const trustedOrigins = getAllowedOrigins();
  const parsed = assertSafeOutboundUrl(rawUrl, new Set(), label);
  const normalizedOrigin = parsed.origin.toLowerCase();

  if (!trustedOrigins.has(normalizedOrigin)) {
    throw new Error(`${label} must stay on an allowed application origin.`);
  }

  if (isProduction() && normalizedOrigin !== canonicalOrigin.toLowerCase()) {
    throw new Error(`${label} must match NEXT_PUBLIC_SITE_URL in production.`);
  }

  return parsed.toString();
}
