import assert from "node:assert/strict";
import test from "node:test";

import { assertSafeOutboundUrl } from "../../lib/security/ssrf";

test("assertSafeOutboundUrl allows explicitly allowlisted hosts", () => {
  const url = assertSafeOutboundUrl(
    "https://cybqa.pesapal.com/pesapalv3",
    new Set(["cybqa.pesapal.com"]),
    "PESAPAL_BASE_URL",
  );

  assert.equal(url.hostname, "cybqa.pesapal.com");
});

test("assertSafeOutboundUrl rejects localhost and private IP targets", () => {
  assert.throws(
    () =>
      assertSafeOutboundUrl(
        "https://127.0.0.1:8443/webhook",
        new Set(["127.0.0.1"]),
        "PESAPAL_BASE_URL",
      ),
    /private or local network address/i,
  );

  assert.throws(
    () =>
      assertSafeOutboundUrl(
        "https://localhost:8443/webhook",
        new Set(["localhost"]),
        "PESAPAL_BASE_URL",
      ),
    /private or local network address/i,
  );
});

test("assertSafeOutboundUrl rejects hosts outside the allowlist", () => {
  assert.throws(
    () =>
      assertSafeOutboundUrl(
        "https://evil.example.com/api",
        new Set(["cybqa.pesapal.com"]),
        "PESAPAL_BASE_URL",
      ),
    /not in the outbound allowlist/i,
  );
});
