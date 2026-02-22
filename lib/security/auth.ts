import type { User } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

import { supabaseAdmin } from "../supabaseAdmin";
import { isAdminEmail } from "./config";
import { errorResponse, getClientIp } from "./http";
import { securityLog } from "./logger";

function extractBearerToken(request: Request) {
  const authorization = request.headers.get("authorization");
  if (!authorization) return null;

  const [scheme, token] = authorization.split(" ");
  if (!scheme || !token) return null;
  if (!/^Bearer$/i.test(scheme)) return null;
  return token.trim();
}

export type RequireUserResult =
  | { ok: true; user: User; token: string }
  | { ok: false; response: NextResponse };

export async function requireAuthenticatedUser(
  request: Request,
  requestId: string,
): Promise<RequireUserResult> {
  const token = extractBearerToken(request);
  if (!token) {
    securityLog("warn", "auth.missing_bearer", {
      requestId,
      path: new URL(request.url).pathname,
      ip: getClientIp(request),
    });
    return {
      ok: false,
      response: errorResponse(
        request,
        requestId,
        401,
        "Authentication required.",
        "auth_required",
      ),
    };
  }

  const { data, error } = await supabaseAdmin.auth.getUser(token);
  if (error || !data.user) {
    securityLog("warn", "auth.invalid_token", {
      requestId,
      path: new URL(request.url).pathname,
      ip: getClientIp(request),
      reason: error?.message ?? "No user",
    });
    return {
      ok: false,
      response: errorResponse(
        request,
        requestId,
        401,
        "Invalid authentication token.",
        "invalid_auth_token",
      ),
    };
  }

  return { ok: true, user: data.user, token };
}

export async function requireAdminUser(
  request: Request,
  requestId: string,
): Promise<RequireUserResult> {
  const auth = await requireAuthenticatedUser(request, requestId);
  if (!auth.ok) return auth;

  const email = auth.user.email?.toLowerCase() ?? null;
  if (!isAdminEmail(email)) {
    securityLog("warn", "auth.admin_denied", {
      requestId,
      path: new URL(request.url).pathname,
      ip: getClientIp(request),
      userId: auth.user.id,
      email,
    });
    return {
      ok: false,
      response: errorResponse(
        request,
        requestId,
        403,
        "Admin access required.",
        "admin_required",
      ),
    };
  }

  return auth;
}

export function isEmailOwnedByUser(email: string, user: User) {
  const userEmail = user.email?.trim().toLowerCase();
  return Boolean(userEmail) && userEmail === email.trim().toLowerCase();
}
