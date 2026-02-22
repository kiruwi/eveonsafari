type ParseBodyResult<T> =
  | { ok: true; data: T }
  | { ok: false; error: string };

export async function parseJsonBody<T = Record<string, unknown>>(
  request: Request,
  maxBytes = 16_384,
): Promise<ParseBodyResult<T>> {
  const raw = await request.text();
  if (Buffer.byteLength(raw, "utf8") > maxBytes) {
    return { ok: false, error: "Payload too large." };
  }

  if (!raw.trim()) {
    return { ok: true, data: {} as T };
  }

  try {
    return { ok: true, data: JSON.parse(raw) as T };
  } catch {
    return { ok: false, error: "Malformed JSON payload." };
  }
}
