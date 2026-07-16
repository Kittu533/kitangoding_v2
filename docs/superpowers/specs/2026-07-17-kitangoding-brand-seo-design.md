# kitangoding.id Brand and SEO Design

## Goal

Make `kitangoding.id` the exact, consistent public brand across the website, remove confirmed technical SEO blockers, and strengthen the copy and content signals that help visitors and search engines understand and trust the business.

## Success Criteria

- Every indexable page emits a title, description, and keywords metadata value containing the exact string `kitangoding.id`.
- Public-facing brand references use `kitangoding.id`; `Kita Ngoding` remains only as an alternate historical name in structured data.
- Open Graph, Twitter metadata, the web manifest, the generated social image, and structured data identify the brand as `kitangoding.id`.
- Googlebot can fetch required Next.js assets because `/_next` is not blocked by robots rules.
- Sitemap timestamps reflect real content dates or are omitted when no reliable date exists.
- Homepage service descriptions cannot be paired with the wrong service when database ordering changes.
- Portfolio copy does not claim that projects are publicly checkable until public project URLs exist.
- Five priority articles provide practical, first-hand guidance with clear sections and relevant internal calls to action.
- Automated checks fail when a future edit removes the required brand string or restores a confirmed SEO defect.

## Scope

### Brand identity

- Use `kitangoding.id` as the canonical public brand name in `siteConfig`, navigation, footer, contact copy, calls to action, and page copy where the company is named.
- Preserve `Kita Ngoding` as `alternateName` in Organization and related structured data so existing references remain understandable to search engines.
- Keep the existing logo asset and visual system. This work changes naming and copy, not the logo design.

### Metadata and structured data

- Set the global title template to append `| kitangoding.id` once.
- Ensure every indexable route has a natural description containing `kitangoding.id` and a keywords array containing the exact brand string.
- Apply the same brand naming to Open Graph and Twitter metadata.
- Update dynamic service and blog metadata through their shared metadata generators rather than editing generated routes individually.
- Identify Organization, WebSite, LocalBusiness, Service, ContactPage, CollectionPage, and Article data with `kitangoding.id` as the name where appropriate.
- Add `alternateName: "Kita Ngoding"` to the primary organization entity.
- Add article publication/modification dates when the underlying content supplies a valid date, and link the author/publisher identity to `/tentang`.
- Keep FAQ content for users, without treating FAQ structured data as a ranking strategy.

### Technical SEO

- Remove `/_next` from `robots.ts`; retain blocks for admin, API, and login routes.
- Remove synthetic `new Date()` timestamps from static sitemap entries.
- Keep real database publication/update timestamps for blog entries and omit unreliable timestamps from static routes and fallback articles.
- Remove sitemap `priority` and `changeFrequency` fields because they do not represent actionable freshness signals.
- Keep the existing canonical URLs, redirect from `/project-inqury`, generated Open Graph image route, Google verification, and index protections for admin/login pages.

### Public copy and conversion

- Keep the main audience focused on UMKM, local brands, and service businesses in Jogja, Solo, Wonogiri, and surrounding Java regions.
- Mention `kitangoding.id` naturally in the hero, trust copy, contact language, and final call to action.
- Replace repetitive phrases such as “rapi, jelas, percaya” where a concrete deliverable or result can be named.
- Replace unexplained English sales jargon in package names and feature lists with plain Indonesian.
- Clarify package boundaries: revision count, renewal costs, launch support, ownership, and what clients must prepare.
- Match database service descriptions by service identity, never array position. A shuffled database response must not attach redesign copy to “Aplikasi Web Custom”.
- Change portfolio messaging to “contoh proyek” and “pelajari jenis proyek” until verified public URLs or case studies are available.
- Do not invent client metrics, testimonials, project URLs, team biographies, or guarantees.

### Brand entity page

- Add `/tentang` using the existing public page shell and visual components.
- Explain what `kitangoding.id` does, who it serves, service area, working process, ownership promise, and contact path.
- Add AboutPage and Organization JSON-LD using existing `siteConfig` values.
- Link `/tentang` from public navigation/footer and include it in the sitemap.

### Content SEO

- Deepen these five existing articles because they align with the main commercial intent:
  - `biaya-pembuatan-website-umkm`
  - `perbedaan-website-company-profile-dan-landing-page`
  - `jasa-landing-page-untuk-iklan`
  - `jasa-toko-online-untuk-umkm`
  - `cara-membuat-website-bisnis-lebih-meyakinkan`
- Each article must answer the query, include concrete decision criteria or examples, name `kitangoding.id` naturally, and direct readers to one relevant service or consultation path.
- Support lightweight `##` section headings in existing plain-text article content without adding a Markdown dependency.
- Format visible article dates in Indonesian.

## Architecture

`lib/site.ts` remains the single source of truth for the canonical public brand and contact identity. Root metadata supplies the title template and shared defaults. Page-specific metadata retains the page topic while shared generators handle dynamic service and article routes.

Existing page shells, components, and content types will be reused. The only new route is `/tentang`. No dependency, CMS schema, database migration, or new design system component is required.

## Data Flow

1. `siteConfig` supplies `kitangoding.id`, domain, contact data, location, and social profiles.
2. Root and page metadata combine the page topic with the canonical brand.
3. Shared service/blog metadata generators apply the same rule to dynamic content.
4. Structured data reuses the same identity and canonical URLs.
5. Public service records are matched to their intended static service card by title identity rather than result order.
6. Fallback article content is rendered as paragraphs, with lines prefixed by `## ` rendered as section headings.

## Failure Handling

- Invalid or missing article dates are omitted from structured data rather than emitting invalid ISO dates.
- Missing database service descriptions fall back to the reviewed static service description.
- Database and sitemap fallbacks continue to work when the database is unavailable.
- No page depends on a public portfolio URL in this batch.

## Testing

- Extend `scripts/seo-smoke-test.mjs` to verify the exact brand string in shared metadata sources, public route metadata, structured data, manifest, and social image code.
- Assert that robots rules do not block `/_next`.
- Assert that static sitemap entries do not use the current request time and that `/tentang` is included.
- Assert that service descriptions are not selected with `services[index]`.
- Add a focused rendering/content check for article `##` headings if the renderer logic becomes non-trivial.
- Run the existing Node tests, SEO smoke test, lint, and production build.
- Inspect the generated homepage, `/tentang`, one service page, one article, robots, and sitemap output after the build.

## Non-Goals

- Creating or verifying public portfolio URLs.
- Inventing case-study results or client evidence.
- Backlink outreach, Google Business Profile management, social media publishing, paid ads, or Search Console actions.
- Guaranteeing a ranking position or brand-awareness outcome; this batch makes the site technically and editorially ready for those growth activities.

