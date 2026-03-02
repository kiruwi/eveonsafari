import { NextRequest, NextResponse } from "next/server";

import { CSRF_COOKIE_NAME } from "@/lib/security/constants";
import { ensureCsrfCookie } from "@/lib/security/http";

const publicApiRoutes = new Set([
  "/api/newsletter",
  "/api/pesapal/ipn",
  "/api/auth/password-reset",
]);

const isProduction = process.env.NODE_ENV === "production";

const contentSecurityPolicy = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com",
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

function withSecurityHeaders(response: NextResponse) {
  response.headers.set("Content-Security-Policy", contentSecurityPolicy);
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set(
    "Permissions-Policy",
    "camera=(), geolocation=(), microphone=(), payment=()",
  );
  response.headers.set("Cross-Origin-Opener-Policy", "same-origin");
  response.headers.set("Cross-Origin-Resource-Policy", "same-site");
  if (isProduction) {
    response.headers.set(
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains; preload",
    );
  }
  return response;
}

function hasBearerAuth(request: NextRequest) {
  const authorization = request.headers.get("authorization");
  if (!authorization) return false;
  const [scheme, token] = authorization.split(" ");
  return /^Bearer$/i.test(scheme ?? "") && Boolean(token?.trim());
}

export function proxy(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const hasAuthCode = request.nextUrl.searchParams.has("code");
  const shouldRouteOauthCode =
    hasAuthCode && path !== "/auth/callback" && (path === "/" || path === "/auth");

  // Some OAuth providers may fall back to "/" with ?code=... if redirect allowlists are mismatched.
  // Force those requests through the callback page that exchanges code for a session.
  if (shouldRouteOauthCode) {
    const url = request.nextUrl.clone();
    url.pathname = "/auth/callback";
    return withSecurityHeaders(NextResponse.redirect(url, 307));
  }

  if (
    path.startsWith("/api/") &&
    !publicApiRoutes.has(path) &&
    request.method !== "OPTIONS" &&
    !hasBearerAuth(request)
  ) {
    return withSecurityHeaders(
      NextResponse.json(
        { ok: false, error: "Authentication required." },
        { status: 401 },
      ),
    );
  }

  const response = withSecurityHeaders(NextResponse.next());
  if (!path.startsWith("/api/")) {
    ensureCsrfCookie(response, request.cookies.get(CSRF_COOKIE_NAME)?.value ?? null);
  }
  return response;
}

export const config = {
  matcher: ["/((?!_next|favicon.ico|robots.txt|sitemap.xml).*)"],
};
