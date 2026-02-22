import { createHmac, timingSafeEqual } from "crypto";

function normalizeSignature(input: string) {
  const trimmed = input.trim();
  if (trimmed.startsWith("sha256=")) {
    return trimmed.slice("sha256=".length);
  }
  return trimmed;
}

export function verifyHmacSha256Signature(
  payload: string,
  providedSignature: string | null,
  secret: string,
) {
  if (!providedSignature) return false;
  const expected = createHmac("sha256", secret).update(payload).digest("hex");
  const actual = normalizeSignature(providedSignature);

  const expectedBuffer = Buffer.from(expected, "hex");
  const actualBuffer = Buffer.from(actual, "hex");

  if (expectedBuffer.length !== actualBuffer.length) return false;
  return timingSafeEqual(expectedBuffer, actualBuffer);
}
