export function buildContentSecurityPolicy(nonce: string, isProduction: boolean) {
  const scriptSrc = [
    "'self'",
    "'strict-dynamic'",
    `'nonce-${nonce}'`,
    "https://www.googletagmanager.com",
    "https://*.clerk.accounts.dev",
    "https://*.clerk.com",
    "https://challenges.cloudflare.com",
    "https:",
    ...(isProduction ? [] : ["http:"]),
    ...(isProduction ? [] : ["'unsafe-eval'"]),
  ].join(" ");

  return [
    "default-src 'self'",
    `script-src ${scriptSrc}`,
    "connect-src 'self' https://www.google-analytics.com https://www.googletagmanager.com https://*.clerk.accounts.dev https://*.clerk.com https://clerk-telemetry.com https://*.clerk-telemetry.com https://img.clerk.com https://*.supabase.co https://cybqa.pesapal.com https://pay.pesapal.com",
    "img-src 'self' data: blob: https: https://img.clerk.com",
    "style-src 'self' 'unsafe-inline'",
    "font-src 'self' data:",
    "worker-src 'self' blob:",
    "frame-src 'self' https://*.clerk.accounts.dev https://*.clerk.com https://challenges.cloudflare.com",
    "frame-ancestors 'none'",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self' https://*.clerk.accounts.dev https://*.clerk.com",
    ...(isProduction ? ["upgrade-insecure-requests"] : []),
  ].join("; ");
}
