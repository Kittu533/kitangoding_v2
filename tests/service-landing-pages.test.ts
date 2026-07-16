import assert from "node:assert/strict";
import test from "node:test";

import { serviceAreas, siteConfig } from "../lib/site";
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
  const structuredData = createServiceLandingPageStructuredData(page);

  assert.deepEqual(
    structuredData.map((schema) => schema["@type"]),
    ["BreadcrumbList", "Service", "Organization", "FAQPage", "ItemList"]
  );
  assert.deepEqual(structuredData[1], {
    "@context": "https://schema.org",
    "@type": "Service",
    name: page.title,
    description: page.description,
    url: pageUrl,
    mainEntityOfPage: pageUrl,
    areaServed: serviceAreas.map((name) => ({
      "@type": "AdministrativeArea",
      name,
    })),
    availableChannel: {
      "@type": "ServiceChannel",
      serviceUrl: pageUrl,
    },
    provider: {
      "@id": `${siteConfig.domain}#organization`,
    },
  });
  assert.deepEqual(structuredData[3], {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: page.faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  });
});
