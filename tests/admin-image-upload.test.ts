import assert from "node:assert/strict";
import test from "node:test";

import nextConfig from "../next.config";
import { estimateDataUrlBytes, MAX_SERVER_ACTION_BODY_SIZE } from "../lib/admin-image-upload";

test("server actions body limit is raised for admin image uploads", () => {
  assert.equal(MAX_SERVER_ACTION_BODY_SIZE, 4 * 1024 * 1024);
  assert.equal(nextConfig.experimental?.serverActions?.bodySizeLimit, "4mb");
});

test("estimateDataUrlBytes calculates decoded base64 payload size", () => {
  assert.equal(estimateDataUrlBytes("data:image/png;base64,SGVsbG8="), 5);
  assert.equal(estimateDataUrlBytes(""), 0);
  assert.equal(estimateDataUrlBytes("data:image/webp;base64,"), 0);
});
