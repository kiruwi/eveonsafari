export type ApiAccessLevel = "public" | "authenticated" | "admin";

const PUBLIC_API_ROUTES = new Set([
  "/api/auth/password-reset",
  "/api/newsletter",
  "/api/pesapal/ipn",
]);

const ADMIN_API_ROUTES = new Set(["/api/supabase-test"]);

export function getApiAccessLevel(pathname: string): ApiAccessLevel {
  if (ADMIN_API_ROUTES.has(pathname)) {
    return "admin";
  }

  if (PUBLIC_API_ROUTES.has(pathname)) {
    return "public";
  }

  return "authenticated";
}

export function isPublicApiRoute(pathname: string) {
  return getApiAccessLevel(pathname) === "public";
}

export function isAdminApiRoute(pathname: string) {
  return getApiAccessLevel(pathname) === "admin";
}
