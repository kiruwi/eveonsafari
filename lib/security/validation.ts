type ValidationSuccess<T> = {
  ok: true;
  data: T;
};

type ValidationFailure = {
  ok: false;
  error: string;
};

type ValidationResult<T> = ValidationSuccess<T> | ValidationFailure;

export type PlanPayload = {
  fullName: string;
  email: string;
  travelDates: string;
  groupSize: number;
  interests: "Safari" | "Trekking" | "Both";
  budgetRange: string | null;
  phone: string | null;
  packageSlug: string | null;
};

export type NewsletterPayload = {
  email: string;
  source: string | null;
};

export type CheckoutPayload = {
  amount: number;
  currency: string;
  tier: "midrange" | "luxury" | null;
  pax: number;
  packageName: string | null;
  packageSlug: string | null;
};

export type PasswordResetPayload = {
  email: string;
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const SLUG_REGEX = /^[a-z0-9-]{1,100}$/i;
const PHONE_REGEX = /^[+()\-\s\d]{6,24}$/;

const VALID_INTERESTS = new Set(["Safari", "Trekking", "Both"]);
const VALID_TIERS = new Set(["midrange", "luxury"]);

function asRecord(input: unknown): Record<string, unknown> | null {
  return typeof input === "object" && input !== null && !Array.isArray(input)
    ? (input as Record<string, unknown>)
    : null;
}

function cleanText(value: unknown, maxLength: number) {
  if (typeof value !== "string") return null;
  const normalized = value.replace(/[\u0000-\u001f\u007f]/g, "").trim();
  if (!normalized.length) return null;
  return normalized.slice(0, maxLength);
}

function cleanOptionalText(value: unknown, maxLength: number) {
  const normalized = cleanText(value, maxLength);
  return normalized ?? null;
}

function cleanEmail(value: unknown) {
  const normalized = cleanText(value, 254);
  if (!normalized || !EMAIL_REGEX.test(normalized)) return null;
  return normalized.toLowerCase();
}

function cleanSlug(value: unknown, maxLength = 100) {
  const normalized = cleanText(value, maxLength);
  if (!normalized) return null;
  if (!SLUG_REGEX.test(normalized)) return null;
  return normalized.toLowerCase();
}

function cleanInt(value: unknown, min: number, max: number) {
  if (typeof value === "number" && Number.isInteger(value)) {
    if (value < min || value > max) return null;
    return value;
  }
  if (typeof value === "string" && value.trim()) {
    const parsed = Number.parseInt(value, 10);
    if (!Number.isInteger(parsed) || parsed < min || parsed > max) return null;
    return parsed;
  }
  return null;
}

function cleanCurrency(value: unknown) {
  const normalized = cleanText(value, 3);
  if (!normalized) return "USD";
  const upper = normalized.toUpperCase();
  return /^[A-Z]{3}$/.test(upper) ? upper : null;
}

function cleanAmount(value: unknown) {
  if (typeof value === "number" && Number.isFinite(value)) {
    if (value <= 0 || value > 100_000) return null;
    return Number.parseFloat(value.toFixed(2));
  }

  if (typeof value === "string" && value.trim()) {
    const parsed = Number.parseFloat(value);
    if (!Number.isFinite(parsed) || parsed <= 0 || parsed > 100_000) return null;
    return Number.parseFloat(parsed.toFixed(2));
  }

  return null;
}

export function validatePlanPayload(payload: unknown): ValidationResult<PlanPayload> {
  const record = asRecord(payload);
  if (!record) return { ok: false, error: "Invalid request payload." };

  const fullName = cleanText(record.fullName, 120);
  if (!fullName) return { ok: false, error: "Please enter your full name." };

  const email = cleanEmail(record.email);
  if (!email) return { ok: false, error: "Enter a valid email address." };

  const travelDates = cleanText(record.travelDates, 120);
  if (!travelDates) return { ok: false, error: "Please provide your travel dates." };

  const groupSize = cleanInt(record.groupSize, 1, 20);
  if (!groupSize) return { ok: false, error: "Please provide your group size." };

  const interestsRaw = cleanText(record.interests, 20);
  if (!interestsRaw || !VALID_INTERESTS.has(interestsRaw)) {
    return { ok: false, error: "Please select your interests." };
  }
  const interests = interestsRaw as PlanPayload["interests"];

  const budgetRange = cleanOptionalText(record.budgetRange, 80);
  const phone = cleanOptionalText(record.phone, 24);
  if (phone && !PHONE_REGEX.test(phone)) {
    return { ok: false, error: "Phone number format is not valid." };
  }

  const packageSlug = cleanOptionalText(record.package, 100);
  if (packageSlug && !SLUG_REGEX.test(packageSlug)) {
    return { ok: false, error: "Package identifier is not valid." };
  }

  return {
    ok: true,
    data: {
      fullName,
      email,
      travelDates,
      groupSize,
      interests,
      budgetRange,
      phone,
      packageSlug: packageSlug ? packageSlug.toLowerCase() : null,
    },
  };
}

export function validateNewsletterPayload(payload: unknown): ValidationResult<NewsletterPayload> {
  const record = asRecord(payload);
  if (!record) return { ok: false, error: "Invalid request payload." };

  const email = cleanEmail(record.email);
  if (!email) return { ok: false, error: "Enter a valid email address." };

  const source = cleanOptionalText(record.source, 40);
  if (source && !SLUG_REGEX.test(source.replace(/\s+/g, "-"))) {
    return { ok: false, error: "Source format is invalid." };
  }

  return { ok: true, data: { email, source } };
}

export function validateCheckoutPayload(payload: unknown): ValidationResult<CheckoutPayload> {
  const record = asRecord(payload);
  if (!record) return { ok: false, error: "Invalid request payload." };

  const amount = cleanAmount(record.amount);
  if (!amount) {
    return { ok: false, error: "Amount must be greater than zero." };
  }

  const currency = cleanCurrency(record.currency);
  if (!currency) return { ok: false, error: "Currency is invalid." };

  const pax = cleanInt(record.pax, 1, 2);
  if (!pax) return { ok: false, error: "Online checkout supports up to 2 travelers." };

  const tierRaw = cleanOptionalText(record.tier, 20);
  const tier = tierRaw ? (tierRaw.toLowerCase() as CheckoutPayload["tier"]) : null;
  if (tier && !VALID_TIERS.has(tier)) {
    return { ok: false, error: "Pricing tier is invalid." };
  }

  const packageName = cleanOptionalText(record.packageName, 120);
  const packageSlug = cleanOptionalText(record.packageSlug, 100);
  if (packageSlug && !SLUG_REGEX.test(packageSlug)) {
    return { ok: false, error: "Package identifier is invalid." };
  }

  return {
    ok: true,
    data: {
      amount,
      currency,
      tier,
      pax,
      packageName,
      packageSlug: packageSlug ? packageSlug.toLowerCase() : null,
    },
  };
}

export function validatePasswordResetPayload(
  payload: unknown,
): ValidationResult<PasswordResetPayload> {
  const record = asRecord(payload);
  if (!record) return { ok: false, error: "Invalid request payload." };
  const email = cleanEmail(record.email);
  if (!email) return { ok: false, error: "Enter a valid email address." };
  return { ok: true, data: { email } };
}

export function validateTransactionIdentifier(value: unknown) {
  const normalized = cleanText(value, 128);
  if (!normalized) return null;
  return /^[A-Za-z0-9_-]{3,128}$/.test(normalized) ? normalized : null;
}

export function sanitizeEmailHeaderValue(value: string) {
  return value.replace(/[\r\n]/g, " ").trim();
}

export function normalizeSourceForStorage(source: string | null) {
  if (!source) return null;
  return source.trim().toLowerCase().replace(/\s+/g, "-");
}
