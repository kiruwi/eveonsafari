import { NextResponse } from "next/server";

import {
  attachRateLimitHeaders,
  buildApiHeaders,
  buildPreflightResponse,
  enforceCsrfToken,
  enforceSameOrigin,
  errorResponse,
  getClientIp,
  getRequestId,
} from "@/lib/security/http";
import { securityLog } from "@/lib/security/logger";
import { checkRateLimit } from "@/lib/security/rateLimit";
import { parseJsonBody } from "@/lib/security/request";
import {
  normalizeSourceForStorage,
  validateNewsletterPayload,
} from "@/lib/security/validation";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

const NEWSLETTER_RATE_LIMIT = {
  limit: 8,
  windowMs: 15 * 60 * 1000,
};

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

  const rateLimit = checkRateLimit({
    key: `newsletter:${ip}`,
    ...NEWSLETTER_RATE_LIMIT,
  });

  if (!rateLimit.allowed) {
    securityLog("warn", "rate_limit.newsletter", { requestId, ip });
    const response = errorResponse(
      request,
      requestId,
      429,
      "Too many requests. Try again later.",
      "rate_limit_exceeded",
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

  const parsed = await parseJsonBody(request);
  if (!parsed.ok) {
    return errorResponse(request, requestId, 400, parsed.error, "invalid_payload");
  }

  const payload = validateNewsletterPayload(parsed.data);
  if (!payload.ok) {
    return errorResponse(request, requestId, 400, payload.error, "validation_failed");
  }

  const { error } = await supabaseAdmin.from("newsletter_subscribers").insert({
    email: payload.data.email,
    source: normalizeSourceForStorage(payload.data.source),
  });

  if (error) {
    if (error.code === "23505") {
      const response = NextResponse.json(
        { ok: true, alreadySubscribed: true, requestId },
        { headers: buildApiHeaders(request, requestId) },
      );
      attachRateLimitHeaders(
        response,
        rateLimit.limit,
        rateLimit.remaining,
        rateLimit.resetAt,
      );
      return response;
    }

    securityLog("error", "newsletter.insert_failed", {
      requestId,
      ip,
      code: error.code,
      message: error.message,
    });
    return errorResponse(
      request,
      requestId,
      500,
      "Unable to process your request.",
      "newsletter_insert_failed",
    );
  }

  const response = NextResponse.json(
    { ok: true, requestId },
    { headers: buildApiHeaders(request, requestId) },
  );
  attachRateLimitHeaders(response, rateLimit.limit, rateLimit.remaining, rateLimit.resetAt);
  return response;
}
