import { NextResponse } from "next/server";

import { createPesapalOrder } from "@/lib/pesapal";
import { requireAuthenticatedUser } from "@/lib/security/auth";
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
import { validateCheckoutPayload } from "@/lib/security/validation";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const CHECKOUT_RATE_LIMIT = {
  limit: 10,
  windowMs: 10 * 60 * 1000,
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

  const auth = await requireAuthenticatedUser(request, requestId);
  if (!auth.ok) return auth.response;

  const rateLimit = checkRateLimit({
    key: `pesapal_checkout:${auth.user.id}:${ip}`,
    ...CHECKOUT_RATE_LIMIT,
  });
  if (!rateLimit.allowed) {
    securityLog("warn", "rate_limit.pesapal_checkout", {
      requestId,
      ip,
      userId: auth.user.id,
    });
    const response = errorResponse(
      request,
      requestId,
      429,
      "Too many checkout attempts. Try again later.",
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

  const payload = validateCheckoutPayload(parsed.data);
  if (!payload.ok) {
    return errorResponse(request, requestId, 400, payload.error, "validation_failed");
  }

  const descriptionBase = payload.data.packageName || "Eve On Safari checkout";
  const suffix =
    payload.data.tier || payload.data.pax
      ? `${payload.data.tier ? ` ${payload.data.tier}` : ""}${payload.data.pax ? ` - ${payload.data.pax} pax` : ""}`
      : "";
  const description = `${descriptionBase}${suffix}`.trim();

  try {
    const { redirectUrl, orderTrackingId, merchantReference } = await createPesapalOrder({
      amount: payload.data.amount,
      currency: payload.data.currency,
      description,
      billingAddressOverride: {
        first_name: payload.data.packageName ?? auth.user.email ?? undefined,
        email_address: auth.user.email ?? undefined,
      },
    });

    const response = NextResponse.json(
      { ok: true, redirectUrl, orderTrackingId, merchantReference, requestId },
      { headers: buildApiHeaders(request, requestId) },
    );
    attachRateLimitHeaders(
      response,
      rateLimit.limit,
      rateLimit.remaining,
      rateLimit.resetAt,
    );
    return response;
  } catch (error) {
    securityLog("error", "pesapal.checkout_failed", {
      requestId,
      ip,
      userId: auth.user.id,
      reason: error instanceof Error ? error.message : "Unknown checkout error",
    });
    return errorResponse(
      request,
      requestId,
      500,
      "Unable to start checkout at this time.",
      "checkout_failed",
    );
  }
}
