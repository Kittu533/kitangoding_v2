import assert from "node:assert/strict";
import test from "node:test";
import { slugify } from "@/lib/slug";

test("slugify membuat slug URL yang stabil", () => {
  assert.equal(slugify("Toko Online Café Jogja!"), "toko-online-cafe-jogja");
  assert.equal(slugify("  ---  "), "");
});
