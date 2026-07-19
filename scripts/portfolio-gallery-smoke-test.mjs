import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const read = async (path) => readFile(path, "utf8").catch(() => "");
const [schema, content, form, actions, detailPage, gallery] = await Promise.all([
  read("lib/db/schema.ts"),
  read("lib/public-content.ts"),
  read("components/admin/portfolio-form.tsx"),
  read("app/admin/(dashboard)/portfolio/actions.ts"),
  read("app/portfolio/[id]/page.tsx"),
  read("components/molecules/PortfolioImageGallery.tsx"),
]);

assert.match(schema, /gallery: text\("gallery"\)\.array\(\)/);
assert.match(content, /gallery: string\[\];/);
assert.match(actions, /gallery: z\.array\(z\.string\(\)\)\.max\(2/);
assert.match(form, /handleGalleryChange/);
assert.match(form, /multiple/);
assert.match(form, /form\.setValue\("gallery"/);
assert.match(detailPage, /PortfolioImageGallery/);
assert.match(gallery, /^"use client";/m);
assert.match(gallery, /useState/);
assert.match(gallery, /aria-pressed/);
assert.match(gallery, /grid-cols-3/);

console.log("Portfolio gallery smoke test passed.");
