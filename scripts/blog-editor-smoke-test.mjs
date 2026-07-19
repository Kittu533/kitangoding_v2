import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), "utf8");

const schema = read("lib/db/schema.ts");
const form = read("components/admin/blog-form.tsx");
const actions = read("app/admin/(dashboard)/blog/actions.ts");
const detail = read("app/blog/[slug]/page.tsx");
const listing = read("components/templates/BlogPage.tsx");
const categoryActions = read("app/admin/(dashboard)/blog-categories/actions.ts");
const adminList = read("app/admin/(dashboard)/blog/page.tsx");
const createPage = read("app/admin/(dashboard)/blog/new/page.tsx");
const editPage = read("app/admin/(dashboard)/blog/[id]/edit/page.tsx");

assert.match(schema, /author:/, "blog posts need an author field");
assert.match(schema, /tags:/, "blog posts need a tags field");
assert.match(form, /RichTextEditor/, "blog form needs a rich text editor");
assert.match(form, /author/, "blog form needs an author field");
assert.match(form, /tags/, "blog form needs a tags field");
assert.match(form, /aspect-video/, "cover preview must preserve the full image frame");
assert.match(form, /object-contain/, "cover preview must not crop the image");
assert.match(actions, /sanitizeRichTextHtml/, "server action must sanitize rich HTML");
assert.match(detail, /dangerouslySetInnerHTML/, "blog detail must render approved rich HTML");
assert.match(listing, /blog\?category=/, "blog categories need URL filters");
assert.match(categoryActions, /transaction/, "category rename must update existing articles");
assert.match(categoryActions, /masih dipakai artikel/, "used categories must not be deleted");
assert.doesNotMatch(form, /SheetContent/, "blog form must not render inside a Sheet");
assert.doesNotMatch(form, /render={<Link/, "blog form links must not render through a native Button");
assert.match(adminList, /\/admin\/blog\/new/, "admin list needs a create page link");
assert.match(adminList, /\/admin\/blog\/\$\{item\.id\}\/edit/, "admin list needs an edit page link");
assert.match(createPage, /BlogForm/, "create page must render the blog form");
assert.match(editPage, /BlogForm/, "edit page must render the blog form");

console.log("blog editor smoke test: PASS");
