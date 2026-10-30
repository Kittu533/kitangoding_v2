import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const navbar = await readFile("components/marketing/sections/StudioChrome.tsx", "utf8");
const styles = await readFile("components/marketing/Studio.module.css", "utf8");

assert.match(navbar, /<details className=\{styles.mobileMenu\}>/);
assert.match(navbar, /aria-label="Buka menu navigasi"/);
assert.match(navbar, /aria-label="Navigasi mobile"/);
assert.match(navbar, /navigation\.map/);
assert.match(styles, /@media\(max-width:700px\)/);
assert.match(styles, /\.desktopNav,\.navCta \{ display:none; \}/);

console.log("Responsive navbar smoke test passed.");
