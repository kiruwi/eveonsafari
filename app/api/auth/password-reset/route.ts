import { NextResponse } from "next/server";

import { getCanonicalOrigin, isProduction } from "@/lib/security/config";
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
import { parseJsonBody } from "@/lib/security/request";
import { validatePasswordResetPayload } from "@/lib/security/validation";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

const PASSWORD_RESET_RATE_LIMIT = {
  limit: 5,
  windowMs: 60 * 60 * 1000,
};

function resolvePasswordResetRedirect() {
  const configured = process.env.PASSWORD_RESET_REDIRECT_URL;
  if (configured) {
    const parsed = new URL(configured);
    if (isProduction() && parsed.protocol !== "https:") {
      throw new Error("PASSWORD_RESET_REDIRECT_URL must use HTTPS in production.");
    }
    return parsed.toString();
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
    await supabaseAdmin.auth.resetPasswordForEmail(payload.data.email, redirectTo ? { redirectTo } : undefined);
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
