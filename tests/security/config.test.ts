import assert from "node:assert/strict";
import test from "node:test";

import { getAllowedOrigins, isAdminEmail } from "../../lib/security/config";

test("getAllowedOrigins merges configured origins and canonical origin", () => {
  process.env.ALLOWED_ORIGINS = "https://app.example.com,https://www.example.com";
  process.env.NEXT_PUBLIC_SITE_URL = "https://example.com";

  const origins = getAllowedOrigins();
  assert.equal(origins.has("https://app.example.com"), true);
  assert.equal(origins.has("https://www.example.com"), true);
  assert.equal(origins.has("https://example.com"), true);
});

test("isAdminEmail checks allowlist case-insensitively", () => {
  process.env.ADMIN_EMAIL_ALLOWLIST = "admin@example.com,owner@example.com";
  assert.equal(isAdminEmail("ADMIN@example.com"), true);
  assert.equal(isAdminEmail("user@example.com"), false);
});
