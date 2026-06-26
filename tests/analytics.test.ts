import assert from "node:assert/strict";
import test from "node:test";

import { isTrackablePublicPath } from "../lib/analytics";

test("trackable public path excludes internal surfaces", () => {
  assert.equal(isTrackablePublicPath("/pricing"), true);
  assert.equal(isTrackablePublicPath("/admin"), false);
  assert.equal(isTrackablePublicPath("/admin/login"), false);
  assert.equal(isTrackablePublicPath("/login"), false);
  assert.equal(isTrackablePublicPath("/api/analytics/track"), false);
  assert.equal(isTrackablePublicPath("/_next/static/chunk.js"), false);
});
