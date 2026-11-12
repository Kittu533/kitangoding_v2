export function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export const TITLE_MAX = 60;

/**
 * Picks the first candidate that fits the ~60 characters search results usually show.
 * List candidates from most to least complete; the last one is used when none fits,
 * so a page's own title is never truncated.
 */
export function buildPageTitle(...candidates: string[][]) {
  const titles = candidates.map(parts => parts.map(part => part.trim()).filter(Boolean).join(" | "));
  return titles.find(title => title.length <= TITLE_MAX) ?? titles[titles.length - 1] ?? "";
}

export const META_DESCRIPTION_MIN = 70;
export const META_DESCRIPTION_MAX = 155;

/** Trims a search-result description to ~155 characters, preferring whole sentences. */
export function fitMetaDescription(text: string) {
  if (text.length <= META_DESCRIPTION_MAX) return text;

  // Prefer the longest run of whole sentences that still fits.
  const sentences = text.split(/(?<=[.!?])\s+/);
  let fitted = "";
  for (const sentence of sentences) {
    const next = fitted ? `${fitted} ${sentence}` : sentence;
    if (next.length > META_DESCRIPTION_MAX) break;
    fitted = next;
  }
  if (fitted.length >= META_DESCRIPTION_MIN) return fitted;

  // No usable sentence boundary: cut on a word boundary.
  const cut = text.slice(0, META_DESCRIPTION_MAX - 1);
  const lastSpace = cut.lastIndexOf(" ");
  return `${(lastSpace > META_DESCRIPTION_MIN ? cut.slice(0, lastSpace) : cut).replace(/[\s,;:.\-–—]+$/u, "")}…`;
}
