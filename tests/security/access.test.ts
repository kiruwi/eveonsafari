import assert from "node:assert/strict";
import test from "node:test";

import {
  getApiAccessLevel,
  isAdminApiRoute,
  isPublicApiRoute,
} from "../../lib/security/access";

test("API access policy is deny-by-default", () => {
  assert.equal(getApiAccessLevel("/api/plan"), "authenticated");
  assert.equal(getApiAccessLevel("/api/unknown"), "authenticated");
});

test("API access policy classifies public and admin routes centrally", () => {
  assert.equal(isPublicApiRoute("/api/newsletter"), true);
  assert.equal(isPublicApiRoute("/api/pesapal/ipn"), true);
  assert.equal(isAdminApiRoute("/api/supabase-test"), true);
  assert.equal(getApiAccessLevel("/api/supabase-test"), "admin");
});
