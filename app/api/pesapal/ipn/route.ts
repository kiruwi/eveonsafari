import { NextResponse, type NextRequest } from "next/server";

import { getPesapalTransactionStatus } from "@/lib/pesapal";
import { isIpnSignatureRequired } from "@/lib/security/config";
import {
  attachRateLimitHeaders,
  buildApiHeaders,
  errorResponse,
  getClientIp,
  getRequestId,
} from "@/lib/security/http";
import { securityLog } from "@/lib/security/logger";
import { checkRateLimit } from "@/lib/security/rateLimit";
import { validateTransactionIdentifier } from "@/lib/security/validation";
import { verifyHmacSha256Signature } from "@/lib/security/webhook";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

const trackingKeys = [
  "orderTrackingId",
  "OrderTrackingId",
  "order_tracking_id",
  "ordertrackingid",
];

const merchantKeys = [
  "merchantReference",
  "MerchantReference",
  "merchant_reference",
  "merchantreference",
];

const IPN_RATE_LIMIT = {
  limit: 120,
  windowMs: 60 * 1000,
};

function readFromSearchParams(params: URLSearchParams, keys: string[]) {
  for (const key of keys) {
    const value = params.get(key);
    if (value) {
      return value;
    }
  }
  return null;
}

function readFromObject(
  payload: Record<string, unknown> | null | undefined,
  keys: string[],
) {
  if (!payload) {
    return null;
  }

  const entries = Object.entries(payload).map(([key, value]) => [
    key.toLowerCase(),
    value,
  ]);

  for (const key of keys) {
    const match = entries.find(([payloadKey]) => payloadKey === key.toLowerCase());
    if (match) {
      const value = match[1];
      if (typeof value === "string" && value.trim()) {
        return value;
      }
    }
  }

  return null;
}

async function parseBody(
  request: NextRequest,
): Promise<{ body: Record<string, unknown> | null; rawBody: string | null }> {
  if (request.method !== "POST") {
    return { body: null, rawBody: null };
  }

  const contentType = request.headers.get("content-type") ?? "";
  const rawBody = await request.text();
  if (!rawBody.trim()) {
    return { body: null, rawBody };
  }

  if (contentType.includes("application/x-www-form-urlencoded")) {
    return {
      body: Object.fromEntries(new URLSearchParams(rawBody)),
      rawBody,
    };
  }

  try {
    return {
      body: JSON.parse(rawBody) as Record<string, unknown>,
      rawBody,
    };
  } catch {
    return { body: null, rawBody };
  }
}

function parseAmount(rawAmount?: string | null) {
  if (!rawAmount) {
    return null;
  }

  const amount = Number.parseFloat(rawAmount);
  return Number.isFinite(amount) ? amount : null;
}

type TransactionStatus = Awaited<ReturnType<typeof getPesapalTransactionStatus>>;

type PersistTransactionArgs = {
  transaction: TransactionStatus;
  orderTrackingId: string | null;
  merchantReference: string | null;
  body?: Record<string, unknown> | null;
  requestMethod: string;
};

async function persistTransaction({
  transaction,
  orderTrackingId,
  merchantReference,
  body,
  requestMethod,
}: PersistTransactionArgs) {
  const resolvedOrderTrackingId =
    transaction.order_tracking_id ?? orderTrackingId ?? null;
  const resolvedMerchantReference =
    transaction.merchant_reference ?? merchantReference ?? null;
  const paymentStatus =
    transaction.payment_status_description ?? transaction.status ?? null;
  const amountValue = parseAmount(transaction.amount ?? null);
  const now = new Date().toISOString();

  const record = {
    order_tracking_id: resolvedOrderTrackingId,
    merchant_reference: resolvedMerchantReference,
    payment_status: paymentStatus,
    status_code: transaction.status_code ?? null,
    payment_method: transaction.payment_method ?? null,
    amount: amountValue,
    confirmation_code: transaction.confirmation_code ?? null,
    description: transaction.description ?? null,
    call_back_url: transaction.call_back_url ?? null,
    created_date: transaction.created_date ?? null,
    received_at: now,
    last_notification_method: requestMethod,
    raw_payload: JSON.stringify(transaction),
    ipn_body: body ? JSON.stringify(body) : null,
    updated_at: now,
  };

  if (!record.order_tracking_id && !record.merchant_reference) {
    throw new Error("Unable to store Pesapal transaction: missing identifiers.");
  }

  const onConflict = record.order_tracking_id
    ? "order_tracking_id"
    : "merchant_reference";

  const { error } = await supabaseAdmin
    .from("pesapal_transactions")
    .upsert(record, { onConflict });

  if (error) {
    throw new Error(`Unable to store Pesapal transaction: ${error.message}`);
  }

  return record;
}

function verifyIpnSignature(
  request: NextRequest,
  rawPayload: string,
  requestId: string,
  ip: string,
) {
  const secret = process.env.PESAPAL_IPN_SECRET ?? "";
  const signatureHeader =
    request.headers.get("x-pesapal-signature") ??
    request.headers.get("x-signature");

  if (!secret) {
    if (isIpnSignatureRequired()) {
      securityLog("error", "pesapal.ipn_missing_secret", { requestId, ip });
      return false;
    }
    return true;
  }

  const valid = verifyHmacSha256Signature(rawPayload, signatureHeader, secret);
  if (!valid) {
    securityLog("warn", "pesapal.ipn_invalid_signature", {
      requestId,
      ip,
      hasSignature: Boolean(signatureHeader),
    });
  }
  return valid;
}

async function handleIpn(
  request: NextRequest,
  body?: Record<string, unknown> | null,
  rawBody?: string | null,
) {
  const requestId = getRequestId(request);
  const ip = getClientIp(request);

  const rateLimit = checkRateLimit({
    key: `pesapal_ipn:${ip}`,
    ...IPN_RATE_LIMIT,
  });
  if (!rateLimit.allowed) {
    const response = errorResponse(
      request,
      requestId,
      429,
      "Too many webhook requests.",
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

  const url = new URL(request.url);
  const signaturePayload =
    request.method === "GET"
      ? (url.search.startsWith("?") ? url.search.slice(1) : "")
      : (rawBody ?? "");

  if (!verifyIpnSignature(request, signaturePayload, requestId, ip)) {
    return errorResponse(
      request,
      requestId,
      401,
      "Invalid webhook signature.",
      "invalid_signature",
    );
  }

  const rawOrderTrackingId =
    readFromSearchParams(url.searchParams, trackingKeys) ||
    readFromObject(body, trackingKeys);
  const rawMerchantReference =
    readFromSearchParams(url.searchParams, merchantKeys) ||
    readFromObject(body, merchantKeys);

  const orderTrackingId = validateTransactionIdentifier(rawOrderTrackingId);
  const merchantReference = validateTransactionIdentifier(rawMerchantReference);

  if (!orderTrackingId && !merchantReference) {
    return errorResponse(
      request,
      requestId,
      400,
      "Missing or invalid Pesapal identifiers.",
      "missing_identifiers",
    );
  }

  try {
    const transaction = await getPesapalTransactionStatus({
      orderTrackingId,
      merchantReference,
    });

    await persistTransaction({
      transaction,
      orderTrackingId,
      merchantReference,
      body,
      requestMethod: request.method,
    });

    const response = NextResponse.json(
      {
        ok: true,
        requestId,
        receivedAt: new Date().toISOString(),
        orderTrackingId: transaction.order_tracking_id ?? orderTrackingId ?? null,
        merchantReference: transaction.merchant_reference ?? merchantReference ?? null,
        paymentStatus:
          transaction.payment_status_description ?? transaction.status ?? null,
      },
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
    securityLog("error", "pesapal.ipn_processing_failed", {
      requestId,
      ip,
      reason: error instanceof Error ? error.message : "Unknown processing error",
    });
    return errorResponse(
      request,
      requestId,
      500,
      "Unable to process webhook.",
      "webhook_processing_failed",
    );
  }
}

export async function GET(request: NextRequest) {
  return handleIpn(request);
}

export async function POST(request: NextRequest) {
  const { body, rawBody } = await parseBody(request);
  return handleIpn(request, body, rawBody);
}
