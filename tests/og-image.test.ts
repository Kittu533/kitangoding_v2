import assert from "node:assert/strict";
import test from "node:test";
import { GET } from "../app/og-image.png/route";

// Satori swallows layout errors at runtime and the route then answers 200 with an empty body,
// which silently breaks every social preview. Render the real route and inspect the bytes.
test("og-image route renders a non-empty 1200x630 PNG", async () => {
  const response = await GET();
  const bytes = Buffer.from(await response.arrayBuffer());

  assert.equal(response.status, 200);
  assert.equal(response.headers.get("content-type"), "image/png");
  assert.ok(bytes.length > 10_000, `expected a real image, got ${bytes.length} bytes`);
  assert.equal(bytes.subarray(0, 8).toString("hex"), "89504e470d0a1a0a", "must start with the PNG signature");
  assert.equal(bytes.readUInt32BE(16), 1200, "PNG width");
  assert.equal(bytes.readUInt32BE(20), 630, "PNG height");
});
