import assert from "node:assert/strict";
import test from "node:test";

import { checkRateLimit, resetRateLimitBuckets } from "../../lib/security/rateLimit";

test("rate limiter denies after threshold within the window", () => {
  resetRateLimitBuckets();
  const key = "test:auth";

  const first = checkRateLimit({ key, limit: 2, windowMs: 60_000, now: 1000 });
  const second = checkRateLimit({ key, limit: 2, windowMs: 60_000, now: 2000 });
  const third = checkRateLimit({ key, limit: 2, windowMs: 60_000, now: 3000 });

  assert.equal(first.allowed, true);
  assert.equal(second.allowed, true);
  assert.equal(third.allowed, false);
  assert.equal(third.remaining, 0);
});

test("rate limiter resets after window expires", () => {
  resetRateLimitBuckets();
  const key = "test:reset";

  checkRateLimit({ key, limit: 1, windowMs: 10_000, now: 0 });
  const afterWindow = checkRateLimit({ key, limit: 1, windowMs: 10_000, now: 10_001 });

  assert.equal(afterWindow.allowed, true);
});
