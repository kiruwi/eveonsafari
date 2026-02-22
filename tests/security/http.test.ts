import assert from "node:assert/strict";
import test from "node:test";

import { enforceCsrfToken, enforceSameOrigin } from "../../lib/security/http";

test("enforceSameOrigin accepts allowed origins", () => {
  process.env.ALLOWED_ORIGINS = "https://eveonsafari.com";

  const request = new Request("https://eveonsafari.com/api/plan", {
    method: "POST",
    headers: {
      Origin: "https://eveonsafari.com",
    },
  });

  assert.equal(enforceSameOrigin(request, "req-1"), null);
});

test("enforceCsrfToken rejects missing tokens", () => {
  const request = new Request("https://eveonsafari.com/api/plan", {
    method: "POST",
    headers: {
      Origin: "https://eveonsafari.com",
    },
  });

  const result = enforceCsrfToken(request, "req-2");
  assert.ok(result);
  assert.equal(result.status, 403);
});

test("enforceCsrfToken accepts matching header and cookie", () => {
  const request = new Request("https://eveonsafari.com/api/plan", {
    method: "POST",
    headers: {
      Origin: "https://eveonsafari.com",
      "X-CSRF-Token": "abc123",
      Cookie: "eos_csrf_token=abc123",
    },
  });

  assert.equal(enforceCsrfToken(request, "req-3"), null);
});
