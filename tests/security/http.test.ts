import assert from "node:assert/strict";
import test from "node:test";

import { enforceCsrfToken, enforceSameOrigin } from "../../lib/security/http";

const env = process.env as Record<string, string | undefined>;

function setEnv(key: string, value: string) {
  env[key] = value;
}

test("enforceSameOrigin accepts allowed origins", () => {
  setEnv("ALLOWED_ORIGINS", "https://eveonsafari.com");

  const request = new Request("https://eveonsafari.com/api/plan", {
    method: "POST",
    headers: {
      Origin: "https://eveonsafari.com",
    },
  });

  assert.equal(enforceSameOrigin(request, "req-1"), null);
});

test("enforceSameOrigin accepts same-host origins even without allowlist", () => {
  setEnv("NODE_ENV", "production");
  setEnv("ALLOWED_ORIGINS", "");

  const request = new Request("https://www.eveonsafari.com/api/plan", {
    method: "POST",
    headers: {
      Origin: "https://www.eveonsafari.com",
    },
  });

  assert.equal(enforceSameOrigin(request, "req-same-host"), null);
});

test("enforceSameOrigin accepts localhost origins in non-production", () => {
  setEnv("NODE_ENV", "test");
  setEnv("ALLOWED_ORIGINS", "https://eveonsafari.com");
  setEnv("NEXT_PUBLIC_SITE_URL", "https://eveonsafari.com");

  const request = new Request("http://localhost:3001/api/plan", {
    method: "POST",
    headers: {
      Origin: "http://localhost:3001",
    },
  });

  assert.equal(enforceSameOrigin(request, "req-local"), null);
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
