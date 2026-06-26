"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { analyticsEventTypes, isTrackablePublicPath, type AnalyticsEventType } from "@/lib/analytics";
import { trackPublicAnalyticsEvent } from "@/lib/analytics-client";

export function TrafficTracker() {
  const pathname = usePathname();
  const lastTrackedPath = useRef<string | null>(null);

  useEffect(() => {
    if (!pathname || !isTrackablePublicPath(pathname) || lastTrackedPath.current === pathname) {
      return;
    }

    lastTrackedPath.current = pathname;
    trackPublicAnalyticsEvent({
      eventType: "page_view",
      path: pathname,
      params: {
        page_path: pathname,
        page_location: window.location.href,
        page_title: document.title,
      },
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
      const analyticsEvent = anchor.dataset.analyticsEvent;

      if (analyticsEvent) {
        if (!analyticsEventTypes.includes(analyticsEvent as AnalyticsEventType)) {
          return;
        }

        trackPublicAnalyticsEvent({
          eventType: analyticsEvent as AnalyticsEventType,
          path: pathname,
          href,
          source: anchor.dataset.analyticsLabel || anchor.textContent?.trim().slice(0, 120) || "CTA",
          params: {
            cta_location: pathname,
            link_text: anchor.textContent?.trim().slice(0, 120),
          },
        });
        return;
      }

      if (!href.includes("wa.me/") && !href.includes("api.whatsapp.com/")) {
        return;
      }

      trackPublicAnalyticsEvent({
        eventType: "whatsapp_click",
        path: pathname,
        href,
        source: anchor.dataset.analyticsLabel || anchor.textContent?.trim().slice(0, 120) || "WhatsApp CTA",
        params: {
          cta_location: pathname,
          link_text: anchor.textContent?.trim().slice(0, 120),
        },
      });
    };

    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [pathname]);

  return null;
}
