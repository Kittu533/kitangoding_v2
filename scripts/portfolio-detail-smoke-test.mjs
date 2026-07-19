import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const read = async (path) => readFile(path, "utf8").catch(() => "");
const [schema, content, card, form, actions, detailPage] = await Promise.all([
  read("lib/db/schema.ts"),
  read("lib/public-content.ts"),
  read("components/molecules/PortfolioCard.tsx"),
  read("components/admin/portfolio-form.tsx"),
  read("app/admin/(dashboard)/portfolio/actions.ts"),
  read("app/portfolio/[id]/page.tsx"),
]);

assert.match(schema, /role: varchar\("role", \{ length: 255 \}\)/);
assert.match(schema, /features: text\("features"\)\.array\(\)/);
assert.match(content, /export type PortfolioDetail/);
assert.match(content, /export async function getPortfolioProject\(id: string\)/);
assert.match(card, /href=\{`\/portfolio\/\$\{item\.id\}`\}/);
assert.match(form, /form\.register\("role"\)/);
assert.match(form, /form\.register\("features"\)/);
assert.match(actions, /function parseFeatures/);
assert.match(detailPage, /getPortfolioProject/);
assert.match(detailPage, /Fitur Utama/);

console.log("Portfolio detail smoke test passed.");
