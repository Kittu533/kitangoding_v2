export const analyticsEventTypes = ["page_view", "whatsapp_click"] as const;

export type AnalyticsEventType = (typeof analyticsEventTypes)[number];

export function isTrackablePublicPath(pathname: string) {
  return (
    pathname.length > 0 &&
    !pathname.startsWith("/admin") &&
    !pathname.startsWith("/api") &&
    !pathname.startsWith("/_next")
  );
}
