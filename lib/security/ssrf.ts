import { isIP } from "net";

import { isProduction } from "./config";

function isLocalHostname(hostname: string) {
  const lowered = hostname.toLowerCase();
  return (
    lowered === "localhost" ||
    lowered === "::1" ||
    lowered.endsWith(".local") ||
    lowered.endsWith(".internal")
  );
}

function isPrivateIPv4(ip: string) {
  const parts = ip.split(".").map((part) => Number.parseInt(part, 10));
  if (parts.length !== 4 || parts.some((part) => Number.isNaN(part))) return false;

  const [a, b] = parts;
  if (a === 10) return true;
  if (a === 127) return true;
  if (a === 169 && b === 254) return true;
  if (a === 172 && b >= 16 && b <= 31) return true;
  if (a === 192 && b === 168) return true;
  return false;
}

function isPrivateIPv6(ip: string) {
  const normalized = ip.toLowerCase();
  return (
    normalized === "::1" ||
    normalized.startsWith("fc") ||
    normalized.startsWith("fd") ||
    normalized.startsWith("fe80")
  );
}

function isPrivateAddress(hostname: string) {
  const ipType = isIP(hostname);
  if (!ipType) return false;
  if (ipType === 4) return isPrivateIPv4(hostname);
  return isPrivateIPv6(hostname);
}

export function assertSafeOutboundUrl(
  rawUrl: string,
  allowedHosts: Set<string>,
  label: string,
) {
  let parsed: URL;

  try {
    parsed = new URL(rawUrl);
  } catch {
    throw new Error(`${label} is not a valid URL.`);
  }

  if (isProduction() && parsed.protocol !== "https:") {
    throw new Error(`${label} must use HTTPS in production.`);
  }

  if (isLocalHostname(parsed.hostname) || isPrivateAddress(parsed.hostname)) {
    throw new Error(`${label} points to a private or local network address.`);
  }

  if (allowedHosts.size > 0 && !allowedHosts.has(parsed.hostname.toLowerCase())) {
    throw new Error(`${label} host is not in the outbound allowlist.`);
  }

  return parsed;
}
