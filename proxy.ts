import { clerkMiddleware } from "@clerk/nextjs/server";
import { NextResponse, type NextRequest } from "next/server";

import { CSRF_COOKIE_NAME } from "@/lib/security/constants";
import { buildContentSecurityPolicy } from "@/lib/security/csp";
import { ensureCsrfCookie } from "@/lib/security/http";

const isProduction = process.env.NODE_ENV === "production";

function withSecurityHeaders(response: NextResponse, nonce: string) {
  response.headers.set(
    "Content-Security-Policy",
    buildContentSecurityPolicy(nonce, isProduction),
  );
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set(
    "Permissions-Policy",
    "camera=(), geolocation=(), microphone=(), payment=()",
  );
  response.headers.set("Cross-Origin-Opener-Policy", "same-origin");
  response.headers.set("Cross-Origin-Resource-Policy", "same-site");
  response.headers.set("X-DNS-Prefetch-Control", "off");
  response.headers.set("X-Permitted-Cross-Domain-Policies", "none");
  response.headers.set("Origin-Agent-Cluster", "?1");
  response.headers.set("x-csp-nonce", nonce);
  if (isProduction) {
    response.headers.set(
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains; preload",
    );
  }
  return response;
}

function applySecurityHeaders(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const nonce = crypto.randomUUID().replace(/-/g, "");
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-nonce", nonce);
  requestHeaders.set("x-csp-nonce", nonce);

  const response = withSecurityHeaders(
    NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    }),
    nonce,
  );
  if (!path.startsWith("/api/")) {
    ensureCsrfCookie(response, request.cookies.get(CSRF_COOKIE_NAME)?.value ?? null);
  }
  return response;
}

const bypassClerkMiddleware =
  process.env.NODE_ENV !== "production" &&
  process.env.DISABLE_CLERK_MIDDLEWARE === "true";

export default bypassClerkMiddleware
  ? applySecurityHeaders
  : clerkMiddleware((_auth, request) => applySecurityHeaders(request));

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
    "/__clerk/(.*)",
  ],
};
