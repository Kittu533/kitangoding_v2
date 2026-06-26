import { analyticsEventTypes, type AnalyticsEventType } from "@/lib/analytics";
import { siteConfig } from "@/lib/site";

const VISITOR_ID_KEY = "kitangoding:visitor-id";
const SESSION_ID_KEY = "kitangoding:session-id";

type AnalyticsParams = Record<string, string | number | boolean | undefined>;

type TrackPayload = {
  eventType: AnalyticsEventType;
  path: string;
  source?: string;
  href?: string;
  params?: AnalyticsParams;
};

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

function createId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }

  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

function getOrCreateStorageId(storage: Storage, key: string) {
  const existingValue = storage.getItem(key);
  if (existingValue) {
    return existingValue;
  }

  const nextValue = createId();
  storage.setItem(key, nextValue);
  return nextValue;
}

function sendInternalAnalytics(payload: TrackPayload) {
  if (typeof window === "undefined" || !analyticsEventTypes.includes(payload.eventType)) {
    return;
  }

  const visitorId = getOrCreateStorageId(window.localStorage, VISITOR_ID_KEY);
  const sessionId = getOrCreateStorageId(window.sessionStorage, SESSION_ID_KEY);
  const body = JSON.stringify({
    eventType: payload.eventType,
    path: payload.path,
    source: payload.source,
    href: payload.href,
    visitorId,
    sessionId,
  });

  if (typeof navigator !== "undefined" && "sendBeacon" in navigator) {
    const blob = new Blob([body], { type: "application/json" });
    navigator.sendBeacon("/api/analytics/track", blob);
    return;
  }

  void fetch("/api/analytics/track", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body,
    keepalive: true,
  });
}

function sendGoogleAnalytics(payload: TrackPayload) {
  if (typeof window === "undefined" || !siteConfig.gaMeasurementId) {
    return;
  }

  const eventParams = {
    page_path: payload.path,
    page_location: window.location.href,
    page_title: document.title,
    event_label: payload.source,
    link_url: payload.href,
    ...payload.params,
  };

  if (typeof window.gtag !== "function") {
    window.dataLayer = window.dataLayer ?? [];
    window.gtag = function gtagFallback(...args: unknown[]) {
      window.dataLayer = window.dataLayer ?? [];
      window.dataLayer.push(args);
    };
  }

  if (typeof window.gtag === "function") {
    window.gtag("event", payload.eventType, eventParams);
    return;
  }
}

export function trackPublicAnalyticsEvent(payload: TrackPayload) {
  try {
    sendInternalAnalytics(payload);
  } catch (error) {
    console.warn("Failed to track internal analytics event.", error);
  }

  try {
    sendGoogleAnalytics(payload);
  } catch (error) {
    console.warn("Failed to track Google Analytics event.", error);
  }
}
