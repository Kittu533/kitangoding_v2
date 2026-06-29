const EXTERNAL_PROTOCOL_RE = /^(?:[a-z][a-z\d+\-.]*:|\/\/)/i;

export type LinkKind = "internal" | "external" | "hash";

export function getLinkKind(href: string): LinkKind {
  if (href.startsWith("#")) {
    return "hash";
  }

  if (EXTERNAL_PROTOCOL_RE.test(href)) {
    return "external";
  }

  return href.startsWith("/") ? "internal" : "external";
}

export function getTransitionTypes(href: string) {
  return getLinkKind(href) === "internal" ? ["nav-forward"] : undefined;
}
