import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

import {
  isEmailOwnedByUser,
  requireAuthenticatedUser,
} from "@/lib/security/auth";
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
  sanitizeEmailHeaderValue,
  validatePlanPayload,
} from "@/lib/security/validation";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

const PLAN_RATE_LIMIT = {
  limit: 5,
  windowMs: 60 * 60 * 1000,
};

const REQUIRED_BUDGET_LABEL = "Budget range";

type EmailBodyPayload = {
  fullName: string;
  email: string;
  travelDates: string;
  groupSize: number;
  interests: string;
  budgetRange: string | null;
  phone: string | null;
  packageSlug: string | null;
};

const buildEmailBody = (payload: EmailBodyPayload) => {
  const safe = (value: string | number | null) =>
    value === null || value === "" ? "Not provided" : String(value);

  return [
    "New safari plan request",
    "",
    `Name: ${safe(payload.fullName)}`,
    `Email: ${safe(payload.email)}`,
    `Ideal travel dates: ${safe(payload.travelDates)}`,
    `Group size: ${safe(payload.groupSize)}`,
    `Interests: ${safe(payload.interests)}`,
    `${REQUIRED_BUDGET_LABEL}: ${safe(payload.budgetRange)}`,
    `Phone/WhatsApp: ${safe(payload.phone)}`,
    `Package: ${safe(payload.packageSlug)}`,
  ].join("\n");
};

async function sendPlanNotification(
  payload: EmailBodyPayload,
  requestId: string,
  ip: string,
) {
  const smtpHost = process.env.SMTP_HOST;
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;
  const smtpPort = Number.parseInt(process.env.SMTP_PORT ?? "", 10);
  const smtpSecureEnv = (process.env.SMTP_SECURE ?? "").toLowerCase();
  const smtpSecure =
    smtpSecureEnv === "true" || (!smtpSecureEnv && smtpPort === 465);
  const mailFrom = process.env.PLAN_EMAIL_FROM ?? smtpUser;
  const mailTo = process.env.PLAN_EMAIL_TO ?? smtpUser;

  if (!smtpHost || !smtpUser || !smtpPass || !mailFrom || !mailTo || !smtpPort) {
    securityLog("warn", "plan.smtp_not_configured", { requestId, ip });
    return false;
  }

  try {
    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpSecure,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    await transporter.sendMail({
      from: mailFrom,
      to: mailTo,
      replyTo: sanitizeEmailHeaderValue(payload.email),
      subject: `New safari plan request: ${sanitizeEmailHeaderValue(payload.fullName)}`,
      text: buildEmailBody(payload),
    });
    return true;
  } catch (sendError) {
    securityLog("error", "plan.smtp_send_failed", {
      requestId,
      ip,
      reason:
        sendError instanceof Error ? sendError.message : "unknown smtp error",
    });
    return false;
  }
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

  const rateLimit = checkRateLimit({
    key: `plan:${auth.user.id}:${ip}`,
    ...PLAN_RATE_LIMIT,
  });
  if (!rateLimit.allowed) {
    securityLog("warn", "rate_limit.plan", { requestId, ip, userId: auth.user.id });
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

  const payload = validatePlanPayload(parsed.data);
  if (!payload.ok) {
    return errorResponse(request, requestId, 400, payload.error, "validation_failed");
  }

  if (!isEmailOwnedByUser(payload.data.email, auth.user)) {
    securityLog("warn", "plan.ownership_mismatch", {
      requestId,
      ip,
      userId: auth.user.id,
    });
    return errorResponse(
      request,
      requestId,
      403,
      "Submitted email must match the signed-in account.",
      "ownership_mismatch",
    );
  }

  const destinations = [
    `Interests: ${payload.data.interests}`,
    payload.data.phone ? `Phone/WhatsApp: ${payload.data.phone}` : null,
  ]
    .filter(Boolean)
    .join(" | ");

  const wildlifeMoment = payload.data.budgetRange
    ? `${REQUIRED_BUDGET_LABEL}: ${payload.data.budgetRange}`
    : null;

  const { error } = await supabaseAdmin.from("plan_requests").insert({
    full_name: payload.data.fullName,
    email: payload.data.email,
    travel_dates: payload.data.travelDates,
    group_size: payload.data.groupSize,
    destinations: destinations || null,
    wildlife_moment: wildlifeMoment,
    package_slug: payload.data.packageSlug,
  });

  if (error) {
    securityLog("error", "plan.insert_failed", {
      requestId,
      ip,
      userId: auth.user.id,
      code: error.code,
      message: error.message,
    });
    return errorResponse(
      request,
      requestId,
      500,
      "Unable to process your request.",
      "plan_insert_failed",
    );
  }

  const emailSent = await sendPlanNotification(payload.data, requestId, ip);

  const response = NextResponse.json(
    { ok: true, emailSent, requestId },
    { headers: buildApiHeaders(request, requestId) },
  );
  attachRateLimitHeaders(response, rateLimit.limit, rateLimit.remaining, rateLimit.resetAt);
  return response;
}
