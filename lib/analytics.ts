export const analyticsEventTypes = [
  "page_view",
  "whatsapp_click",
  "pricing_cta_click",
  "blog_cta_click",
  "lead_submitted",
  "project_inquiry_submitted",
  "form_submit_error",
] as const;

export type AnalyticsEventType = (typeof analyticsEventTypes)[number];

export function isTrackablePublicPath(pathname: string) {
  const internalPrefixes = ["/admin", "/api", "/_next", "/login"] as const;

  return (
    pathname.length > 0 &&
    !internalPrefixes.some((prefix) => pathname.startsWith(prefix))
  );
}
