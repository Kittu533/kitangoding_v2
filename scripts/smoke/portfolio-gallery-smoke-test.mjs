import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const read = async (path) => readFile(path, "utf8").catch(() => "");
const [schema, types, form, actions, detailPage, gallery] = await Promise.all([
  read("lib/db/schema.ts"),
  read("features/portfolio/types.ts"),
  read("components/admin/portfolio-form.tsx"),
  read("app/admin/(dashboard)/portfolio/actions.ts"),
  read("app/portfolio/[id]/page.tsx"),
  read("components/marketing/components/PortfolioImageGallery.tsx"),
]);

assert.match(schema, /gallery: text\("gallery"\)\.array\(\)/);
assert.match(types, /gallery: string\[\];/);
assert.match(actions, /gallery: z\.array\(z\.string\(\)\)\.max\(2/);
assert.match(form, /handleGalleryChange/);
assert.match(form, /multiple/);
assert.match(form, /form\.setValue\("gallery"/);
assert.match(detailPage, /PortfolioImageGallery/);
assert.match(gallery, /^"use client";/m);
assert.match(gallery, /useState/);
assert.match(gallery, /aria-haspopup="dialog"/);
assert.match(gallery, /showModal\(\)/);
assert.match(gallery, /aria-label="Tutup preview gambar"/);

console.log("Portfolio gallery smoke test passed.");
