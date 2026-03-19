export function buildContentSecurityPolicy(nonce: string, isProduction: boolean) {
  return [
    "default-src 'self'",
    `script-src 'self' 'nonce-${nonce}' https://www.googletagmanager.com`,
    "connect-src 'self' https://www.google-analytics.com https://www.googletagmanager.com https://*.supabase.co https://cybqa.pesapal.com https://pay.pesapal.com",
    "img-src 'self' data: blob: https:",
    "style-src 'self' 'unsafe-inline'",
    "font-src 'self' data:",
    "frame-ancestors 'none'",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    ...(isProduction ? ["upgrade-insecure-requests"] : []),
  ].join("; ");
}
