import { expect, test } from "@playwright/test";

function attribute(html: string, tag: string, key: string, value: string, target: string) {
  const element = html.match(new RegExp(`<${tag}\\b(?=[^>]*\\b${key}="${value}")[^>]*>`))?.[0];
  return element?.match(new RegExp(`\\b${target}="([^"]*)"`))?.[1];
}

function schemas(html: string): Array<Record<string, unknown>> {
  return Array.from(html.matchAll(/<script\b(?=[^>]*type="application\/ld\+json")[^>]*>([\s\S]*?)<\/script>/g))
    .flatMap(match => JSON.parse(match[1]));
}

test("public SEO is present in server-rendered HTML", async ({ request }) => {
  const home = await request.get("/");
  expect(home.ok()).toBeTruthy();
  const origin = new URL(attribute(await home.text(), "link", "rel", "canonical", "href")!).origin;
  for (const path of ["/", "/layanan", "/blog", "/portfolio", "/jasa-landing-page-bisnis", "/jasa-redesign-website", "/jasa-toko-online-umkm", "/jasa-website-company-profile"]) {
    const response = await request.get(path);
    expect(response.ok(), path).toBeTruthy();
    const html = await response.text();
    expect(Array.from(html.matchAll(/<h1(?:\s|>)/g)), path).toHaveLength(1);
    expect(attribute(html, "link", "rel", "canonical", "href"), path).toBe(origin + (path === "/" ? "" : path));
    expect(html, path).toMatch(/<title>[^<]*Kitangoding[^<]*<\/title>/);
    expect(attribute(html, "meta", "name", "description", "content")?.length, path).toBeGreaterThan(50);
    expect(attribute(html, "meta", "name", "robots", "content"), path).not.toContain("noindex");
    expect(schemas(html).length, path).toBeGreaterThan(0);
  }
  const listing = await request.get("/portfolio");
  const project = (await listing.text()).match(/href="(\/portfolio\/[^"#?]+)"/)?.[1];
  expect(project).toBeTruthy();
  const projectPage = await request.get(project!);
  const projectHtml = await projectPage.text();
  expect(attribute(projectHtml, "meta", "property", "og:image", "content")).toMatch(/^https?:\/\//);
  expect(schemas(projectHtml).map(schema => schema["@type"])).toEqual(expect.arrayContaining(["BreadcrumbList", "CreativeWork"]));
  const sitemap = await request.get("/sitemap.xml");
  expect(sitemap.ok()).toBeTruthy();
  expect(await sitemap.text()).toContain(origin + project);

  const blog = await request.get("/blog");
  const article = (await blog.text()).match(/href="(\/blog\/[^"#?]+)"/)?.[1];
  expect(article).toBeTruthy();
  const articlePage = await request.get(article!);
  const articleHtml = await articlePage.text();
  expect(attribute(articleHtml, "meta", "property", "article:published_time", "content")).toMatch(/\d{4}-\d{2}-\d{2}T/);
  expect(schemas(articleHtml).find(schema => schema["@type"] === "Article")?.datePublished).toBeTruthy();
});
