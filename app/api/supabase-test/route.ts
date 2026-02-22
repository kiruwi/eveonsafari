import { NextResponse } from "next/server";

import { requireAdminUser } from "@/lib/security/auth";
import {
  attachRateLimitHeaders,
  buildApiHeaders,
  errorResponse,
  getClientIp,
  getRequestId,
} from "@/lib/security/http";
import { securityLog } from "@/lib/security/logger";
import { checkRateLimit } from "@/lib/security/rateLimit";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

const TABLE_REGEX = /^[a-z_][a-z0-9_]{0,62}$/;

const SUPABASE_TEST_RATE_LIMIT = {
  limit: 30,
  windowMs: 60 * 1000,
};

function getAllowedTables() {
  return new Set(
    (process.env.SUPABASE_TEST_ALLOWED_TABLES ?? "")
      .split(",")
      .map((value) => value.trim())
      .filter(Boolean),
  );
}

function isEndpointEnabled() {
  if ((process.env.ENABLE_SUPABASE_TEST_ENDPOINT ?? "").toLowerCase() === "true") {
    return true;
  }
  return process.env.NODE_ENV !== "production";
}

export async function GET(request: Request) {
  const requestId = getRequestId(request);
  const ip = getClientIp(request);

  if (!isEndpointEnabled()) {
    return errorResponse(
      request,
      requestId,
      404,
      "Not found.",
      "endpoint_disabled",
    );
  }

  const auth = await requireAdminUser(request, requestId);
  if (!auth.ok) return auth.response;

  const rateLimit = checkRateLimit({
    key: `supabase_test:${auth.user.id}:${ip}`,
    ...SUPABASE_TEST_RATE_LIMIT,
  });
  if (!rateLimit.allowed) {
    const response = errorResponse(
      request,
      requestId,
      429,
      "Too many requests.",
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

  const { searchParams } = new URL(request.url);
  const tableParam = searchParams.get("table")?.trim() || "example_table";
  if (!TABLE_REGEX.test(tableParam)) {
    return errorResponse(
      request,
      requestId,
      400,
      "Table name is invalid.",
      "invalid_table_name",
    );
  }

  const allowedTables = getAllowedTables();
  if (allowedTables.size > 0 && !allowedTables.has(tableParam)) {
    securityLog("warn", "supabase_test.table_denied", {
      requestId,
      ip,
      userId: auth.user.id,
      table: tableParam,
    });
    return errorResponse(
      request,
      requestId,
      403,
      "Table access denied.",
      "table_not_allowed",
    );
  }

  const { data, error } = await supabaseAdmin.from(tableParam).select("*").limit(1);

  if (error?.code === "42P01") {
    const response = NextResponse.json(
      {
        ok: true,
        requestId,
        message: `Connected to Supabase, but table "${tableParam}" does not exist.`,
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
  }

  if (error) {
    securityLog("error", "supabase_test.query_failed", {
      requestId,
      ip,
      userId: auth.user.id,
      code: error.code,
      message: error.message,
      table: tableParam,
    });
    return errorResponse(
      request,
      requestId,
      500,
      "Unable to run Supabase test query.",
      "query_failed",
    );
  }

  const response = NextResponse.json(
    {
      ok: true,
      requestId,
      table: tableParam,
      rows: data?.length ?? 0,
      note: "Connection succeeded.",
    },
    { headers: buildApiHeaders(request, requestId) },
  );
  attachRateLimitHeaders(response, rateLimit.limit, rateLimit.remaining, rateLimit.resetAt);
  return response;
}
