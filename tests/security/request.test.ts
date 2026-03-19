import assert from "node:assert/strict";
import test from "node:test";

import { hasJsonContentType, parseJsonBody } from "../../lib/security/request";

test("hasJsonContentType accepts application/json and rejects other types", () => {
  const jsonRequest = new Request("https://eveonsafari.com/api/plan", {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    body: "{}",
  });
  const textRequest = new Request("https://eveonsafari.com/api/plan", {
    method: "POST",
    headers: {
      "Content-Type": "text/plain",
    },
    body: "{}",
  });

  assert.equal(hasJsonContentType(jsonRequest), true);
  assert.equal(hasJsonContentType(textRequest), false);
});

test("parseJsonBody rejects oversized payloads", async () => {
  const request = new Request("https://eveonsafari.com/api/plan", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ data: "x".repeat(20_000) }),
  });

  const result = await parseJsonBody(request, 128);
  assert.equal(result.ok, false);
  if (!result.ok) {
    assert.match(result.error, /payload too large/i);
  }
});
