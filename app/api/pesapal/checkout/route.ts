import { NextResponse } from "next/server";

import { createPesapalOrder } from "@/lib/pesapal";
import { getSafariPricing } from "@/lib/pricing";
import { calculateSafariTotal, getPerPersonRate } from "@/lib/safariPricing";
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
import { hasJsonContentType, parseJsonBody } from "@/lib/security/request";
import { validateCheckoutPayload } from "@/lib/security/validation";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const CHECKOUT_RATE_LIMIT = {
  limit: 10,
  windowMs: 10 * 60 * 1000,
};

function classifyCheckoutFailure(detail: string) {
  if (detail.includes("PESAPAL_CALLBACK_URL") || detail.includes("PESAPAL_IPN_URL")) {
    return "config_url_validation";
  }

  if (detail.includes("NEXT_PUBLIC_SITE_URL")) {
    return "config_canonical_origin";
  }

  if (detail.includes("PESAPAL_CONSUMER_KEY") || detail.includes("PESAPAL_CONSUMER_SECRET")) {
    return "config_credentials";
  }

  if (detail.includes("PESAPAL_IPN_ID") || detail.includes("PESAPAL_IPN_URL")) {
    return "config_ipn";
  }

  if (detail.startsWith("Unable to get Pesapal token:")) {
    return "request_token";
  }

  if (detail.startsWith("Unable to register Pesapal IPN URL:")) {
    return "register_ipn";
  }

  if (detail.startsWith("Unable to create Pesapal checkout session:")) {
    return "create_order";
  }

  if (detail.includes("aborted")) {
    return "network_timeout";
  }

  return "unknown";
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

  const auth = await requireAuthenticatedUser(request, requestId);
  if (!auth.ok) return auth.response;

  if (!hasJsonContentType(request)) {
    securityLog("warn", "pesapal.invalid_content_type", {
      requestId,
      ip,
      userId: auth.user.id,
      contentType: request.headers.get("content-type") ?? "missing",
    });
    return errorResponse(
      request,
      requestId,
      415,
      "Content-Type must be application/json.",
      "invalid_content_type",
    );
  }

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

  const pricing = getSafariPricing(payload.data.packageSlug);
  const perPersonRate = getPerPersonRate(pricing, payload.data.pax);
  const totalAmount = calculateSafariTotal(pricing, payload.data.pax);
  if (!perPersonRate || !totalAmount) {
    return errorResponse(
      request,
      requestId,
      400,
      "This safari price is not available for the selected group size.",
      "pricing_unavailable",
    );
  }

  const descriptionBase = payload.data.packageName || "Eve On Safari checkout";
  const suffix = ` - ${payload.data.pax} travelers`;
  const description = `${descriptionBase}${suffix}`.trim();

  try {
    const { redirectUrl, orderTrackingId, merchantReference } = await createPesapalOrder({
      amount: totalAmount,
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
    const errorDetail =
      error instanceof Error ? error.message : "Unknown checkout error";

    securityLog("error", "pesapal.checkout_failed", {
      requestId,
      ip,
      userId: auth.user.id,
      failureStage: classifyCheckoutFailure(errorDetail),
      errorName: error instanceof Error ? error.name : "UnknownError",
      errorDetail,
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
