import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const page = readFileSync(new URL("../../app/blog/[slug]/page.tsx", import.meta.url), "utf8");

const styles = readFileSync(new URL("../../components/marketing/pages/Blog.module.css", import.meta.url), "utf8");
assert.match(page, /<article className=\{styles.articlePage\}/, "article must use the shared editorial panel");
assert.match(styles, /\.articleCover img \{ object-fit:contain;/, "article cover must preserve the full image");
assert.match(page, /styles.body/, "plain and rich content must share the reading layout");
assert.doesNotMatch(page, /<aside/, "article should use a single reading column");
assert.match(page, /post.publishedAt \|\| toIsoDate/, "structured data must prefer the original ISO date");

console.log("blog editorial layout smoke test: PASS");
