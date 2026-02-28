const DEFAULT_PESAPAL_ALLOWED_HOSTS = ["cybqa.pesapal.com", "pay.pesapal.com"];

function parseCsvSet(raw: string | undefined) {
  return new Set(
    (raw ?? "")
      .split(",")
      .map((item) => item.trim().toLowerCase())
      .filter(Boolean),
  );
}

function normalizeOrigin(raw: string) {
  try {
    return new URL(raw).origin;
  } catch {
    return null;
  }
}

function addNormalizedOrigin(origins: Set<string>, raw: string | null) {
  if (!raw) return;
  const normalized = normalizeOrigin(raw);
  if (!normalized) return;
  origins.add(normalized.toLowerCase());
}

function addCanonicalSiblingOrigin(origins: Set<string>, canonical: string | null) {
  if (!canonical) return;

  try {
    const url = new URL(canonical);
    const host = url.hostname.toLowerCase();
    if (host === "localhost" || host === "127.0.0.1" || host === "[::1]" || host === "::1") {
      return;
    }

    const siblingHost = host.startsWith("www.") ? host.slice(4) : `www.${host}`;
    const siblingOrigin = `${url.protocol}//${siblingHost}${url.port ? `:${url.port}` : ""}`;
    origins.add(siblingOrigin.toLowerCase());
  } catch {
    // Ignore malformed values from env.
  }
}

export function isProduction() {
  return process.env.NODE_ENV === "production";
}

export function getCanonicalOrigin() {
  const raw = process.env.NEXT_PUBLIC_SITE_URL;
  if (!raw) return null;
  return normalizeOrigin(raw);
}

export function getAllowedOrigins() {
  const configured = parseCsvSet(process.env.ALLOWED_ORIGINS);
  const canonical = getCanonicalOrigin();
  addNormalizedOrigin(configured, canonical);
  addCanonicalSiblingOrigin(configured, canonical);
  if (configured.size === 0 && !isProduction()) {
    configured.add("http://localhost:3000");
    configured.add("http://127.0.0.1:3000");
    configured.add("http://[::1]:3000");
  }
  return configured;
}

export function isAdminEmail(email: string | null | undefined) {
  if (!email) return false;
  const admins = parseCsvSet(process.env.ADMIN_EMAIL_ALLOWLIST);
  return admins.has(email.toLowerCase());
}

export function isIpnSignatureRequired() {
  const configured = (process.env.PESAPAL_IPN_SIGNATURE_REQUIRED ?? "").toLowerCase();
  if (configured === "true") return true;
  if (configured === "false") return false;
  return isProduction();
}

export function getPesapalAllowedHosts() {
  const configured = parseCsvSet(process.env.PESAPAL_ALLOWED_HOSTS);
  if (configured.size === 0) {
    return new Set(DEFAULT_PESAPAL_ALLOWED_HOSTS);
  }
  return configured;
}
