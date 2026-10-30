import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const siteConfig = readFileSync("lib/site.ts", "utf8");
const environment = readFileSync(".env", "utf8");

assert.match(siteConfig, /phoneDisplay: process\.env\.NEXT_PUBLIC_SITE_PHONE_DISPLAY \|\| "\+62 822-4190-8389"/);
assert.match(siteConfig, /phoneHref: normalizePhoneHref\(process\.env\.NEXT_PUBLIC_SITE_PHONE_HREF \|\| "6282241908389"\)/);
assert.match(environment, /^NEXT_PUBLIC_SITE_PHONE_HREF="6282241908389"$/m);

console.log("WhatsApp configuration smoke test: PASS");
