import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const page = readFileSync(new URL("../app/blog/[slug]/page.tsx", import.meta.url), "utf8");

assert.match(page, /aspect-\[16\/9\]/, "article cover must retain its full image frame");
assert.doesNotMatch(page, /md:aspect-\[21\/9\]/, "article cover must not crop into a wider frame");
assert.match(page, /className="object-contain"/, "article cover must not crop the image");
assert.match(page, /xl:grid-cols-\[minmax\(0,780px\)_300px\]/, "article layout needs a readable 780px column");
assert.match(page, /xl:sticky xl:top-24/, "sidebar must be sticky only on desktop");

console.log("blog editorial layout smoke test: PASS");
