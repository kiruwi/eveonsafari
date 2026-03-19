import assert from "node:assert/strict";
import test from "node:test";

import { assertTrustedAppUrl } from "../../lib/security/url";

const env = process.env as Record<string, string | undefined>;

test("assertTrustedAppUrl allows URLs on configured application origins", () => {
  env.NODE_ENV = "production";
  env.NEXT_PUBLIC_SITE_URL = "https://eveonsafari.com";
  env.ALLOWED_ORIGINS = "https://eveonsafari.com,https://www.eveonsafari.com";

  const trusted = assertTrustedAppUrl(
    "https://eveonsafari.com/auth/callback",
    "PASSWORD_RESET_REDIRECT_URL",
  );

  assert.equal(trusted, "https://eveonsafari.com/auth/callback");
});

test("assertTrustedAppUrl rejects redirects to untrusted origins", () => {
  env.NODE_ENV = "production";
  env.NEXT_PUBLIC_SITE_URL = "https://eveonsafari.com";
  env.ALLOWED_ORIGINS = "https://eveonsafari.com";

  assert.throws(
    () =>
      assertTrustedAppUrl(
        "https://evil.example.com/auth/callback",
        "PASSWORD_RESET_REDIRECT_URL",
      ),
    /allowed application origin/i,
  );
});
