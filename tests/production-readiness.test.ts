import assert from "node:assert/strict";
import test from "node:test";

import { normalizePublicPricingPlans } from "../lib/public-content";
import { createWhatsAppHref, normalizePhoneHref } from "../lib/site";

test("normalizePhoneHref strips non-digits from malformed env values", () => {
  assert.equal(normalizePhoneHref('"6282241908389"tam'), "6282241908389");
  assert.equal(normalizePhoneHref("+62 822-4190-8389"), "6282241908389");
});

test("createWhatsAppHref always produces a valid wa.me URL", () => {
  const href = createWhatsAppHref("Halo kitangoding.id, saya ingin konsultasi website.");

  assert.ok(href.startsWith("https://wa.me/"));
  assert.ok(href.includes("6282241908389"));
  assert.ok(href.includes("?text="));
  assert.ok(!href.includes('"'));
  assert.ok(!href.endsWith("tam"));
});

test("normalizePublicPricingPlans keeps only one featured badge", () => {
  const plans = normalizePublicPricingPlans([
    {
      name: "Plan C",
      price: "Rp 5.500.000",
      description: "desc",
      features: [],
      featured: true,
    },
    {
      name: "Plan A",
      price: "Rp 1.800.000",
      description: "desc",
      features: [],
      featured: true,
    },
    {
      name: "Plan B",
      price: "Rp 3.500.000",
      description: "desc",
      features: [],
      featured: true,
    },
  ]);

  assert.deepEqual(
    plans.map((plan) => [plan.name, plan.featured]),
    [
      ["Plan A", true],
      ["Plan B", false],
      ["Plan C", false],
    ]
  );
});
