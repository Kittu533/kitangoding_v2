import assert from "node:assert/strict";
import test from "node:test";

import { siteConfig } from "../lib/site";
import {
  createServiceLandingMetadata,
  createServiceLandingPageStructuredData,
  createServiceLandingPageUrl,
  serviceLandingPages,
} from "../lib/service-landing-pages";

test("service landing pages cover the planned keyword routes", () => {
  assert.deepEqual(
    serviceLandingPages.map((page) => page.pathname),
    [
      "/jasa-website-company-profile",
      "/jasa-landing-page-bisnis",
      "/jasa-toko-online-umkm",
    ]
  );

  assert.deepEqual(
    serviceLandingPages.map((page) => page.keyword),
    [
      "jasa website company profile",
      "jasa landing page bisnis",
      "jasa toko online umkm",
    ]
  );
});

test("service landing page helpers build canonical url and JSON-LD schemas", () => {
  const page = serviceLandingPages[0];
  const pageUrl = createServiceLandingPageUrl(page);

  assert.equal(pageUrl, `${siteConfig.domain}/jasa-website-company-profile`);
  assert.equal(createServiceLandingMetadata(page).alternates?.canonical, pageUrl);
  assert.deepEqual(createServiceLandingPageStructuredData(page), [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: siteConfig.domain,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: page.title,
          item: pageUrl,
        },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: page.title,
      description: page.description,
      url: pageUrl,
      provider: {
        "@type": "Organization",
        name: siteConfig.name,
        url: siteConfig.domain,
      },
    },
  ]);
});
