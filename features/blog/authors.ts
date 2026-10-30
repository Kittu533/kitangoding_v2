import { siteConfig } from "@/lib/site";

export function getBlogAuthorName(author?: string | null) {
  const name = author?.trim();
  return name?.replace(/^(Tim\s+)?(?:kitangoding(?:\.id)?|kita\s*ngoding)$/i, (_match, team: string | undefined) => `${team || ""}${siteConfig.name}`) || siteConfig.name;
}

export function getAuthorInitials(author: string) {
  return author.trim().split(/\s+/).slice(0, 2).map(word => Array.from(word)[0] || "").join("").toLocaleUpperCase("id-ID");
}
