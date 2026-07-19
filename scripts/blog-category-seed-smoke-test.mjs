import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), "utf8");
const seed = read("scripts/seed-blog-categories.mjs");
const packageJson = JSON.parse(read("package.json"));

assert.match(seed, /create table if not exists blog_categories/i);
assert.match(seed, /Tips Bisnis/);
assert.match(seed, /Digital Marketing/);
assert.match(seed, /Web Development/);
assert.match(seed, /on conflict \(slug\) do nothing/i);
assert.equal(packageJson.scripts["seed:blog-categories"], "node scripts/seed-blog-categories.mjs");

console.log("blog category seed smoke test: PASS");
