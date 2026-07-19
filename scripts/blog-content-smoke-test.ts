import assert from "node:assert/strict";
import { richTextToPlainText, sanitizeRichTextHtml } from "../lib/blog-content";

const sanitized = sanitizeRichTextHtml('<h2 style="font-size: 24px">Judul</h2><p><strong>Isi</strong><script>alert(1)</script><a href="javascript:alert(1)">buruk</a></p>');

assert.match(sanitized, /<strong>Isi<\/strong>/);
assert.match(sanitized, /font-size:24px/);
assert.doesNotMatch(sanitized, /script|javascript:/i);
assert.equal(richTextToPlainText(sanitized), "JudulIsiburuk");

console.log("blog content smoke test: PASS");
