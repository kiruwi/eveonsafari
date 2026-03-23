import assert from "node:assert/strict";
import test from "node:test";

import { buildContentSecurityPolicy } from "../../lib/security/csp";

test("CSP uses per-request nonces instead of unsafe-inline scripts", () => {
  const policy = buildContentSecurityPolicy("nonce123", true);

  assert.match(policy, /script-src 'self' 'nonce-nonce123'/);
  assert.doesNotMatch(policy, /script-src[^;]*'unsafe-inline'/);
  assert.doesNotMatch(policy, /script-src[^;]*'unsafe-eval'/);
  assert.match(policy, /frame-ancestors 'none'/);
});

test("production CSP upgrades insecure requests", () => {
  const productionPolicy = buildContentSecurityPolicy("nonce123", true);
  const developmentPolicy = buildContentSecurityPolicy("nonce123", false);

  assert.match(productionPolicy, /upgrade-insecure-requests/);
  assert.doesNotMatch(developmentPolicy, /upgrade-insecure-requests/);
});

test("development CSP allows unsafe-eval for React and Turbopack debugging", () => {
  const policy = buildContentSecurityPolicy("nonce123", false);

  assert.match(policy, /script-src[^;]*'unsafe-eval'/);
});
