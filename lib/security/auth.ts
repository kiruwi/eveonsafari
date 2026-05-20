import { auth, clerkClient } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

import { isAdminEmail } from "./config";
import { errorResponse, getClientIp } from "./http";
import { securityLog } from "./logger";

export type AuthenticatedUser = {
  id: string;
  email: string | null;
};

export type RequireUserResult =
  | { ok: true; user: AuthenticatedUser }
  | { ok: false; response: NextResponse };

async function getPrimaryEmail(userId: string) {
  const client = await clerkClient();
  const user = await client.users.getUser(userId);

  return (
    user.primaryEmailAddress?.emailAddress ??
    user.emailAddresses.find((email) => email.id === user.primaryEmailAddressId)
      ?.emailAddress ??
    user.emailAddresses[0]?.emailAddress ??
    null
  );
}

export async function requireAuthenticatedUser(
  request: Request,
  requestId: string,
): Promise<RequireUserResult> {
  const session = await auth();
  if (!session.isAuthenticated || !session.userId) {
    securityLog("warn", "auth.missing_session", {
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

  try {
    const email = await getPrimaryEmail(session.userId);
    return {
      ok: true,
      user: {
        id: session.userId,
        email,
      },
    };
  } catch (error) {
    securityLog("warn", "auth.invalid_token", {
      requestId,
      path: new URL(request.url).pathname,
      ip: getClientIp(request),
      reason: error instanceof Error ? error.message : "Unable to load Clerk user",
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

export function isEmailOwnedByUser(email: string, user: AuthenticatedUser) {
  const userEmail = user.email?.trim().toLowerCase();
  return Boolean(userEmail) && userEmail === email.trim().toLowerCase();
}
