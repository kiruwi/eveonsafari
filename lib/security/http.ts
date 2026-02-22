import { randomUUID, timingSafeEqual } from "crypto";
import { NextResponse } from "next/server";

import { CSRF_COOKIE_NAME } from "./constants";
import { getAllowedOrigins, isProduction } from "./config";
import { securityLog } from "./logger";

const SAFE_METHODS = new Set(["GET", "HEAD", "OPTIONS"]);

export function getRequestId(request: Request) {
  const incomingId = request.headers.get("x-request-id");
  return incomingId?.trim() || randomUUID();
}

export function getClientIp(request: Request) {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) {
    const first = forwardedFor.split(",")[0]?.trim();
    if (first) return first;
  }
  const realIp = request.headers.get("x-real-ip");
  if (realIp?.trim()) return realIp.trim();
  return "unknown";
}

function safeDecodeURIComponent(value: string) {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}

function parseCookies(request: Request) {
  const cookieHeader = request.headers.get("cookie");
  if (!cookieHeader) return new Map<string, string>();

  return new Map(
    cookieHeader
      .split(";")
      .map((chunk) => chunk.trim())
      .filter(Boolean)
      .map((chunk) => {
        const separator = chunk.indexOf("=");
        if (separator < 0) return [chunk, ""];
        return [chunk.slice(0, separator), safeDecodeURIComponent(chunk.slice(separator + 1))];
      }),
  );
}

export function buildApiHeaders(request: Request, requestId?: string) {
  const headers = new Headers({
    "Cache-Control": "no-store",
    Pragma: "no-cache",
  });

  if (requestId) {
    headers.set("x-request-id", requestId);
  }

  const origin = request.headers.get("origin");
  if (origin && isOriginAllowed(origin)) {
    headers.set("Access-Control-Allow-Origin", origin);
    headers.set("Access-Control-Allow-Credentials", "true");
    headers.set("Access-Control-Allow-Headers", "Authorization, Content-Type, X-CSRF-Token, X-Requested-With");
    headers.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    headers.set("Vary", "Origin");
  }

  return headers;
}

export function errorResponse(
  request: Request,
  requestId: string,
  status: number,
  message: string,
  errorCode: string,
) {
  return NextResponse.json(
    { ok: false, error: message, errorCode, requestId },
    { status, headers: buildApiHeaders(request, requestId) },
  );
}

export function isOriginAllowed(origin: string) {
  const allowedOrigins = getAllowedOrigins();
  if (allowedOrigins.size === 0) return false;
  return allowedOrigins.has(origin.toLowerCase());
}

export function enforceSameOrigin(request: Request, requestId: string) {
  if (SAFE_METHODS.has(request.method.toUpperCase())) {
    return null;
  }

  const origin = request.headers.get("origin");
  if (!origin || !isOriginAllowed(origin)) {
    securityLog("warn", "csrf.origin_rejected", {
      requestId,
      method: request.method,
      path: new URL(request.url).pathname,
      origin: origin ?? "missing",
      ip: getClientIp(request),
    });
    return errorResponse(
      request,
      requestId,
      403,
      "Invalid request origin.",
      "origin_not_allowed",
    );
  }

  return null;
}

export function enforceCsrfToken(request: Request, requestId: string) {
  if (SAFE_METHODS.has(request.method.toUpperCase())) {
    return null;
  }

  const headerValue = request.headers.get("x-csrf-token");
  if (!headerValue) {
    return errorResponse(
      request,
      requestId,
      403,
      "Missing CSRF token.",
      "missing_csrf_token",
    );
  }

  const cookies = parseCookies(request);
  const cookieValue = cookies.get(CSRF_COOKIE_NAME);
  if (!cookieValue) {
    return errorResponse(
      request,
      requestId,
      403,
      "Missing CSRF cookie.",
      "missing_csrf_cookie",
    );
  }

  const headerBuffer = Buffer.from(headerValue);
  const cookieBuffer = Buffer.from(cookieValue);
  if (
    headerBuffer.length !== cookieBuffer.length ||
    !timingSafeEqual(headerBuffer, cookieBuffer)
  ) {
    securityLog("warn", "csrf.token_mismatch", {
      requestId,
      method: request.method,
      path: new URL(request.url).pathname,
      ip: getClientIp(request),
    });
    return errorResponse(
      request,
      requestId,
      403,
      "Invalid CSRF token.",
      "invalid_csrf_token",
    );
  }

  return null;
}

export function buildPreflightResponse(request: Request, requestId: string) {
  const origin = request.headers.get("origin");
  if (!origin || !isOriginAllowed(origin)) {
    return errorResponse(
      request,
      requestId,
      403,
      "Origin not allowed.",
      "origin_not_allowed",
    );
  }

  return new NextResponse(null, {
    status: 204,
    headers: buildApiHeaders(request, requestId),
  });
}

export function attachRateLimitHeaders(
  response: NextResponse,
  limit: number,
  remaining: number,
  resetAt: number,
) {
  response.headers.set("X-RateLimit-Limit", String(limit));
  response.headers.set("X-RateLimit-Remaining", String(Math.max(0, remaining)));
  response.headers.set("X-RateLimit-Reset", String(Math.floor(resetAt / 1000)));
}

export function ensureCsrfCookie(response: NextResponse, currentValue?: string | null) {
  if (currentValue) return response;

  const token = randomUUID().replace(/-/g, "");
  response.cookies.set(CSRF_COOKIE_NAME, token, {
    path: "/",
    secure: isProduction(),
    sameSite: "strict",
    httpOnly: false,
    maxAge: 60 * 60 * 24,
  });
  return response;
}
