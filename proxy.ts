import { NextRequest, NextResponse } from "next/server";

import { getApiAccessLevel } from "@/lib/security/access";
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

function hasBearerAuth(request: NextRequest) {
  const authorization = request.headers.get("authorization");
  if (!authorization) return false;
  const [scheme, token] = authorization.split(" ");
  return /^Bearer$/i.test(scheme ?? "") && Boolean(token?.trim());
}

export function proxy(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const nonce = crypto.randomUUID().replace(/-/g, "");
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-csp-nonce", nonce);
  const accessLevel = path.startsWith("/api/")
    ? getApiAccessLevel(path)
    : null;

  if (
    accessLevel &&
    accessLevel !== "public" &&
    request.method !== "OPTIONS" &&
    !hasBearerAuth(request)
  ) {
    return withSecurityHeaders(
      NextResponse.json(
        { ok: false, error: "Authentication required." },
        { status: 401 },
      ),
      nonce,
    );
  }

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

export const config = {
  matcher: ["/((?!_next|favicon.ico|robots.txt|sitemap.xml).*)"],
};
