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
  if (canonical) configured.add(canonical.toLowerCase());
  if (configured.size === 0 && !isProduction()) {
    configured.add("http://localhost:3000");
    configured.add("http://127.0.0.1:3000");
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
