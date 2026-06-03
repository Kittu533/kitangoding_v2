import { z } from "zod";
import { db } from "@/lib/db";
import { analyticsEventTypes } from "@/lib/analytics";
import { websiteAnalyticsEvents } from "@/lib/db/schema";

const analyticsSchema = z.object({
  eventType: z.enum(analyticsEventTypes),
  path: z.string().min(1).max(255),
  source: z.string().max(255).optional(),
  href: z.string().max(2000).optional(),
  visitorId: z.string().min(1).max(255),
  sessionId: z.string().min(1).max(255).optional(),
});

function getIpAddress(request: Request) {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) {
    return forwardedFor.split(",")[0]?.trim() || null;
  }

  return request.headers.get("x-real-ip");
}

export async function POST(request: Request) {
  try {
    const payload = analyticsSchema.parse(await request.json());

    await db.insert(websiteAnalyticsEvents).values({
      eventType: payload.eventType,
      path: payload.path,
      source: payload.source,
      href: payload.href,
      visitorId: payload.visitorId,
      sessionId: payload.sessionId,
      referrer: request.headers.get("referer"),
      userAgent: request.headers.get("user-agent"),
      ipAddress: getIpAddress(request),
    });

    return Response.json({ success: true }, { status: 201 });
  } catch (error) {
    console.error("Failed to track analytics event:", error);
    return Response.json({ success: false }, { status: 200 });
  }
}
