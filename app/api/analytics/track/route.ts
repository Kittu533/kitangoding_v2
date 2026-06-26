import { z } from "zod";
import { db } from "@/lib/db";
import { analyticsEventTypes } from "@/lib/analytics";
import { websiteAnalyticsEvents } from "@/lib/db/schema";
import { consumeRateLimit } from "@/lib/rate-limit";
import { getRequestIpAddress } from "@/lib/request";

const analyticsSchema = z.object({
  eventType: z.enum(analyticsEventTypes),
  path: z.string().min(1).max(255),
  source: z.string().max(255).optional(),
  href: z.string().max(2000).optional(),
  visitorId: z.string().min(1).max(255),
  sessionId: z.string().min(1).max(255).optional(),
});

function getErrorCode(error: unknown) {
  if (typeof error !== "object" || error === null) {
    return "";
  }

  if ("code" in error) {
    const code = (error as { code?: unknown }).code;
    if (typeof code === "string") {
      return code;
    }
  }

  if ("cause" in error) {
    return getErrorCode((error as { cause?: unknown }).cause);
  }

  return "";
}

export async function POST(request: Request) {
  try {
    const payload = analyticsSchema.parse(await request.json());
    const ipAddress = getRequestIpAddress(request.headers);
    const rateLimitKey = ipAddress ?? `visitor:${payload.visitorId}`;
    const rateLimit = consumeRateLimit(rateLimitKey, { limit: 60, windowMs: 60_000 });

    if (!rateLimit.allowed) {
      return Response.json({ success: false, skipped: "rate_limited" }, { status: 429 });
    }

    await db.insert(websiteAnalyticsEvents).values({
      eventType: payload.eventType,
      path: payload.path,
      source: payload.source,
      href: payload.href,
      visitorId: payload.visitorId,
      sessionId: payload.sessionId,
      referrer: request.headers.get("referer"),
      userAgent: request.headers.get("user-agent"),
      ipAddress,
    });

    return Response.json({ success: true }, { status: 201 });
  } catch (error) {
    if (getErrorCode(error) === "42P01") {
      return Response.json({ success: true, skipped: "missing_analytics_table" }, { status: 202 });
    }

    console.error("Failed to track analytics event:", error);
    return Response.json({ success: false }, { status: 200 });
  }
}
