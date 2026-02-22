import assert from "node:assert/strict";
import test from "node:test";

import {
  validateCheckoutPayload,
  validateNewsletterPayload,
  validatePlanPayload,
} from "../../lib/security/validation";

test("validatePlanPayload accepts a valid payload", () => {
  const result = validatePlanPayload({
    fullName: "Asha N.",
    email: "asha@example.com",
    travelDates: "2026-07-01 to 2026-07-10",
    groupSize: 2,
    interests: "Safari",
    budgetRange: "Under $2,000 per person",
    phone: "+255700000000",
    package: "7-day-northern-highlights",
  });

  assert.equal(result.ok, true);
  if (result.ok) {
    assert.equal(result.data.email, "asha@example.com");
    assert.equal(result.data.groupSize, 2);
  }
});

test("validatePlanPayload rejects invalid interests", () => {
  const result = validatePlanPayload({
    fullName: "Asha N.",
    email: "asha@example.com",
    travelDates: "2026-07-01 to 2026-07-10",
    groupSize: 2,
    interests: "Anything",
  });

  assert.equal(result.ok, false);
});

test("validateNewsletterPayload normalizes valid input", () => {
  const result = validateNewsletterPayload({
    email: "USER@Example.com",
    source: "trekking page",
  });

  assert.equal(result.ok, true);
  if (result.ok) {
    assert.equal(result.data.email, "user@example.com");
  }
});

test("validateCheckoutPayload enforces max pax and amount boundaries", () => {
  const rejected = validateCheckoutPayload({
    amount: 10,
    currency: "USD",
    pax: 3,
  });
  assert.equal(rejected.ok, false);

  const accepted = validateCheckoutPayload({
    amount: 2500,
    currency: "usd",
    tier: "midrange",
    pax: 2,
    packageName: "Grand Tanzania",
    packageSlug: "9-day-grand-tanzania",
  });
  assert.equal(accepted.ok, true);
  if (accepted.ok) {
    assert.equal(accepted.data.currency, "USD");
  }
});
