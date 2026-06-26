import assert from "node:assert/strict";
import test from "node:test";

import { mapPublicServices } from "../lib/public-content";

test("mapPublicServices keeps database content and falls back when description is missing", () => {
  const services = mapPublicServices([
    {
      title: "Website Company Profile",
      description: "DB description",
      price: "Rp 1.800.000",
      icon: "monitor-smartphone",
    },
    {
      title: "Landing Page Campaign",
      description: null,
      price: null,
      icon: null,
    },
  ]);

  assert.equal(services[0].title, "Website Company Profile");
  assert.equal(services[0].description, "DB description");
  assert.equal(services[0].price, "Rp 1.800.000");
  assert.equal(services[0].icon, "monitor-smartphone");
  assert.equal(services[1].description, "Halaman fokus konversi untuk promo, launching produk, atau lead generation yang lebih terukur.");
});
