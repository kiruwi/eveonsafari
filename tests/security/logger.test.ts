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

test("redactSensitive strips token and email patterns from plain strings", () => {
  const redacted = redactSensitive({
    event: "auth.failed",
    detail:
      "User user@example.com sent Bearer abc.def.ghi and jwt eyJhbGciOiJIUzI1NiJ9.abc.def",
  });

  assert.equal(redacted.event, "auth.failed");
  assert.doesNotMatch(redacted.detail, /user@example.com/);
  assert.doesNotMatch(redacted.detail, /Bearer abc\.def\.ghi/);
  assert.doesNotMatch(redacted.detail, /eyJhbGciOiJIUzI1NiJ9/);
});
