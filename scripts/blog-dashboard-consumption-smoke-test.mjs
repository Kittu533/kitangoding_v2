import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), "utf8");
const publicContent = read("lib/public-content.ts");
const blogPage = read("app/blog/page.tsx");

assert.match(blogPage, /getPublicBlogPosts/);
assert.match(blogPage, /<BlogPage activeCategory=\{activeCategory\} categories=\{categories\} posts=\{posts\}/);
assert.doesNotMatch(publicContent, /\[\.\.\.databaseItems, \.\.\.fallbackWithSort\]/, "published dashboard articles must not mix with static fallback articles");
assert.match(publicContent, /return typeof limit === "number" \? databaseItems\.slice\(0, limit\) : databaseItems;/, "published dashboard articles must be returned directly");

console.log("blog dashboard consumption smoke test: PASS");
