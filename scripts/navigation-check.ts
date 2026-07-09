import assert from "node:assert/strict";
import { getLinkKind, getTransitionTypes } from "../lib/navigation";

assert.equal(getLinkKind("/pricing"), "internal");
assert.equal(getLinkKind("/blog/post-1"), "internal");
assert.equal(getLinkKind("#portfolio"), "hash");
assert.equal(getLinkKind("mailto:halo@kitangoding.com"), "external");
assert.equal(getLinkKind("https://kitangoding.com"), "external");
assert.equal(getTransitionTypes("/pricing"), undefined);
assert.equal(getTransitionTypes("#portfolio"), undefined);
assert.equal(getTransitionTypes("https://kitangoding.com"), undefined);

console.log("navigation-check: ok");
