type SecurityLogLevel = "info" | "warn" | "error";

const SENSITIVE_KEY_PATTERNS = [
  "password",
  "secret",
  "token",
  "authorization",
  "cookie",
  "email",
  "phone",
  "set-cookie",
  "message",
  "reason",
] as const;

function isSensitiveKey(key: string) {
  const lowered = key.toLowerCase();
  return SENSITIVE_KEY_PATTERNS.some((pattern) => lowered.includes(pattern));
}

function redactString(value: string) {
  if (value.length <= 4) return "[REDACTED]";
  return `${value.slice(0, 2)}...[REDACTED]`;
}

function redactPatterns(value: string) {
  return value
    .replace(
      /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/gi,
      "[REDACTED_EMAIL]",
    )
    .replace(/\bBearer\s+[A-Za-z0-9._~+/=-]+\b/gi, "Bearer [REDACTED_TOKEN]")
    .replace(
      /\beyJ[A-Za-z0-9_-]+\.[A-Za-z0-9._-]+\.[A-Za-z0-9._-]+\b/g,
      "[REDACTED_JWT]",
    );
}

export function redactSensitive<T>(value: T): T {
  if (value === null || value === undefined) return value;

  if (typeof value === "string") {
    return redactPatterns(value) as T;
  }

  if (Array.isArray(value)) {
    return value.map((item) => redactSensitive(item)) as T;
  }

  if (typeof value === "object") {
    const entries = Object.entries(value as Record<string, unknown>).map(
      ([key, nestedValue]) => [
        key,
        isSensitiveKey(key)
          ? typeof nestedValue === "string"
            ? redactString(nestedValue)
            : "[REDACTED]"
          : redactSensitive(nestedValue),
      ],
    );
    return Object.fromEntries(entries) as T;
  }

  return value;
}

function write(level: SecurityLogLevel, payload: Record<string, unknown>) {
  const serialized = JSON.stringify(payload);
  if (level === "error") {
    console.error(serialized);
    return;
  }
  if (level === "warn") {
    console.warn(serialized);
    return;
  }
  console.info(serialized);
}

export function securityLog(
  level: SecurityLogLevel,
  event: string,
  details: Record<string, unknown> = {},
) {
  write(level, {
    timestamp: new Date().toISOString(),
    level,
    event,
    details: redactSensitive(details),
  });
}
