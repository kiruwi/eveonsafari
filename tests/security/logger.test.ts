import assert from "node:assert/strict";
import test from "node:test";

import { redactSensitive } from "../../lib/security/logger";

test("redactSensitive masks sensitive keys while preserving non-sensitive fields", () => {
  const redacted = redactSensitive({
    event: "auth.failed",
    email: "user@example.com",
    nested: {
      token: "secret-token",
      reason: "invalid csrf",
    },
  });

  assert.equal(redacted.event, "auth.failed");
  assert.equal(redacted.email, "us...[REDACTED]");
  assert.equal(redacted.nested.reason, "in...[REDACTED]");
  assert.equal(redacted.nested.token, "se...[REDACTED]");
});
