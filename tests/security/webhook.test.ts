import assert from "node:assert/strict";
import { createHmac } from "node:crypto";
import test from "node:test";

import { verifyHmacSha256Signature } from "../../lib/security/webhook";

test("verifyHmacSha256Signature accepts valid signatures", () => {
  const payload = '{"ok":true}';
  const secret = "test-secret";
  const digest = createHmac("sha256", secret).update(payload).digest("hex");

  assert.equal(verifyHmacSha256Signature(payload, digest, secret), true);
  assert.equal(
    verifyHmacSha256Signature(payload, `sha256=${digest}`, secret),
    true,
  );
});

test("verifyHmacSha256Signature rejects invalid signatures", () => {
  const payload = '{"ok":true}';
  const secret = "test-secret";

  assert.equal(verifyHmacSha256Signature(payload, "bad-signature", secret), false);
  assert.equal(verifyHmacSha256Signature(payload, null, secret), false);
});
