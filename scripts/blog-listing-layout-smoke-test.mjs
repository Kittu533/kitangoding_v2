import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const page = readFileSync(new URL("../components/templates/BlogPage.tsx", import.meta.url), "utf8");

assert.match(page, /<Reveal key=\{post\.slug\} className="h-full"/, "each grid item must fill its row");
assert.match(page, /<article className="flex h-full flex-col bg-market p-7">/, "each article card must fill its grid cell");
assert.match(page, /className="mt-auto w-full bg-ink/, "each CTA must align to the card bottom");

console.log("blog listing layout smoke test: PASS");
