import assert from "node:assert/strict";
import test from "node:test";

import { getTrustedAuthOrigins, resolveAuthClientBasePath } from "../lib/auth-url";

test("resolveAuthClientBasePath keeps auth requests same-origin", () => {
  assert.equal(resolveAuthClientBasePath(), "/api/auth");
});

test("getTrustedAuthOrigins accepts both www and apex production domains", () => {
  assert.deepEqual(getTrustedAuthOrigins("https://www.kitangoding.my.id"), [
    "https://www.kitangoding.my.id",
    "https://kitangoding.my.id",
  ]);

  assert.deepEqual(getTrustedAuthOrigins("https://kitangoding.my.id"), [
    "https://kitangoding.my.id",
    "https://www.kitangoding.my.id",
  ]);
});

test("getTrustedAuthOrigins leaves localhost alone", () => {
  assert.deepEqual(getTrustedAuthOrigins("http://localhost:3000"), [
    "http://localhost:3000",
  ]);
});
