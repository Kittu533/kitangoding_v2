import Script from "next/script";
import { siteConfig } from "@/lib/site";

export function GoogleAnalytics() {
  if (!siteConfig.gaMeasurementId) {
    return null;
  }

  return (
    <>
      <Script
        id="ga4-init"
        strategy="afterInteractive"
      >
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${siteConfig.gaMeasurementId}', { send_page_view: false });
        `}
      </Script>
      <Script
        id="ga4-loader"
        src={`https://www.googletagmanager.com/gtag/js?id=${siteConfig.gaMeasurementId}`}
        strategy="afterInteractive"
      />
    </>
  );
}
