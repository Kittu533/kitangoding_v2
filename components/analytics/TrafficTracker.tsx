"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { analyticsEventTypes, isTrackablePublicPath, type AnalyticsEventType } from "@/lib/analytics";

const VISITOR_ID_KEY = "kitangoding:visitor-id";
const SESSION_ID_KEY = "kitangoding:session-id";

type TrackPayload = {
  eventType: AnalyticsEventType;
  path: string;
  source?: string;
  href?: string;
};

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

function sendAnalytics(payload: TrackPayload) {
  if (typeof window === "undefined" || !analyticsEventTypes.includes(payload.eventType)) {
    return;
  }

  const visitorId = getOrCreateStorageId(window.localStorage, VISITOR_ID_KEY);
  const sessionId = getOrCreateStorageId(window.sessionStorage, SESSION_ID_KEY);
  const body = JSON.stringify({
    ...payload,
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

export function TrafficTracker() {
  const pathname = usePathname();
  const lastTrackedPath = useRef<string | null>(null);

  useEffect(() => {
    if (!pathname || !isTrackablePublicPath(pathname) || lastTrackedPath.current === pathname) {
      return;
    }

    lastTrackedPath.current = pathname;
    sendAnalytics({
      eventType: "page_view",
      path: pathname,
    });
  }, [pathname]);

  useEffect(() => {
    if (!pathname || !isTrackablePublicPath(pathname)) {
      return;
    }

    const handleClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) {
        return;
      }

      const anchor = target.closest("a[href]");
      if (!(anchor instanceof HTMLAnchorElement)) {
        return;
      }

      const href = anchor.href;
      if (!href.includes("wa.me/") && !href.includes("api.whatsapp.com/")) {
        return;
      }

      sendAnalytics({
        eventType: "whatsapp_click",
        path: pathname,
        href,
        source: anchor.dataset.analyticsLabel || anchor.textContent?.trim().slice(0, 120) || "WhatsApp CTA",
      });
    };

    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [pathname]);

  return null;
}
