import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const navbar = await readFile("components/organisms/MarketplaceShell.tsx", "utf8");

assert.match(navbar, /import \{ Menu, MessageCircle, X \} from "lucide-react";/);
assert.match(navbar, /<details className="group relative lg:hidden">/);
assert.match(navbar, /id="mobile-navigation"/);
assert.match(navbar, /<div className="hidden lg:block">/);
assert.match(navbar, /marketplaceNav\.map/);

console.log("Responsive navbar smoke test passed.");
