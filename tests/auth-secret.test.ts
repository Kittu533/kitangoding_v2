import assert from "node:assert/strict";
import test from "node:test";

import { resolveBetterAuthSecret } from "../lib/auth-secret";

test("resolveBetterAuthSecret uses a build-only placeholder during production builds", () => {
  const secret = resolveBetterAuthSecret({
    NODE_ENV: "production",
    NEXT_PHASE: "phase-production-build",
  });

  assert.equal(secret, "build-only-secret-placeholder-1234567890");
});

test("resolveBetterAuthSecret throws in production runtime when secret is missing", () => {
  assert.throws(
    () =>
      resolveBetterAuthSecret({
        NODE_ENV: "production",
      }),
    /BETTER_AUTH_SECRET must be set/
  );
});

test("resolveBetterAuthSecret keeps an explicit secret", () => {
  const secret = resolveBetterAuthSecret({
    NODE_ENV: "production",
    BETTER_AUTH_SECRET: "this-is-a-real-secret-with-at-least-32-chars",
  });

  assert.equal(secret, "this-is-a-real-secret-with-at-least-32-chars");
});
