import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const page = readFileSync(new URL("../../components/marketing/pages/BlogListing.tsx", import.meta.url), "utf8");

const styles = readFileSync(new URL("../../components/marketing/pages/Blog.module.css", import.meta.url), "utf8");
assert.match(styles, /grid-template-columns:repeat\(3,minmax\(0,1fr\)\)/, "desktop listing needs three columns");
assert.match(page, /styles.byline/, "cards need author information above the cover");
assert.match(page, /getBlogAuthorName\(post.author\)/, "cards must preserve real author names");
assert.match(page, /dateTime=\{post.publishedAt\}/, "dates must retain their machine-readable value");
assert.match(page, /aria-labelledby=/, "cards must have accessible titles");
assert.match(page, /popstate/, "filters must support browser history");

console.log("blog listing layout smoke test: PASS");
