import { NextResponse } from "next/server";

import { getCanonicalOrigin } from "@/lib/security/config";
import {
  attachRateLimitHeaders,
  buildApiHeaders,
  buildPreflightResponse,
  enforceCsrfToken,
  enforceSameOrigin,
  getClientIp,
  getRequestId,
} from "@/lib/security/http";
import { securityLog } from "@/lib/security/logger";
import { checkRateLimit } from "@/lib/security/rateLimit";
import { hasJsonContentType, parseJsonBody } from "@/lib/security/request";
import { assertTrustedAppUrl } from "@/lib/security/url";
import { validatePasswordResetPayload } from "@/lib/security/validation";
import { getSupabaseAdmin } from "@/lib/supabaseAdmin";

const PASSWORD_RESET_RATE_LIMIT = {
  limit: 5,
  windowMs: 60 * 60 * 1000,
};

function resolvePasswordResetRedirect() {
  const configured = process.env.PASSWORD_RESET_REDIRECT_URL;
  if (configured) {
    return assertTrustedAppUrl(configured, "PASSWORD_RESET_REDIRECT_URL");
  }

  const canonicalOrigin = getCanonicalOrigin();
  if (!canonicalOrigin) {
    return undefined;
  }
  return `${canonicalOrigin}/auth/callback`;
}

export function OPTIONS(request: Request) {
  return buildPreflightResponse(request, getRequestId(request));
}

export async function POST(request: Request) {
  const requestId = getRequestId(request);
  const ip = getClientIp(request);

  const originError = enforceSameOrigin(request, requestId);
  if (originError) return originError;

  const csrfError = enforceCsrfToken(request, requestId);
  if (csrfError) return csrfError;

  if (!hasJsonContentType(request)) {
    securityLog("warn", "auth.password_reset_invalid_content_type", {
      requestId,
      ip,
      contentType: request.headers.get("content-type") ?? "missing",
    });
    return NextResponse.json(
      { ok: true, requestId },
      { headers: buildApiHeaders(request, requestId) },
    );
  }

  const parsed = await parseJsonBody(request);
  if (!parsed.ok) {
    return NextResponse.json(
      { ok: true, requestId },
      { headers: buildApiHeaders(request, requestId) },
    );
  }

  const payload = validatePasswordResetPayload(parsed.data);
  if (!payload.ok) {
    return NextResponse.json(
      { ok: true, requestId },
      { headers: buildApiHeaders(request, requestId) },
    );
  }

  const rateLimit = checkRateLimit({
    key: `password_reset:${payload.data.email}:${ip}`,
    ...PASSWORD_RESET_RATE_LIMIT,
  });

  if (!rateLimit.allowed) {
    const response = NextResponse.json(
      { ok: true, requestId },
      { headers: buildApiHeaders(request, requestId) },
    );
    response.headers.set("Retry-After", String(rateLimit.retryAfterSeconds));
    attachRateLimitHeaders(
      response,
      rateLimit.limit,
      rateLimit.remaining,
      rateLimit.resetAt,
    );
    return response;
  }

  try {
    const redirectTo = resolvePasswordResetRedirect();
    await getSupabaseAdmin().auth.resetPasswordForEmail(
      payload.data.email,
      redirectTo ? { redirectTo } : undefined,
    );
  } catch (error) {
    securityLog("warn", "auth.password_reset_request_failed", {
      requestId,
      ip,
      reason:
        error instanceof Error ? error.message : "Unknown password reset failure",
    });
  }

  const response = NextResponse.json(
    { ok: true, requestId },
    { headers: buildApiHeaders(request, requestId) },
  );
  attachRateLimitHeaders(response, rateLimit.limit, rateLimit.remaining, rateLimit.resetAt);
  return response;
}
