import { desc, eq, gte } from "drizzle-orm";
import { db } from "@/lib/db";
import { blogPosts, leads, portfolios, websiteAnalyticsEvents } from "@/lib/db/schema";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrafficChart } from "@/components/admin/TrafficChart";

type AnalyticsRecord = {
  eventType: string;
  path: string;
  source: string | null;
  visitorId: string;
  createdAt: Date;
};

function formatTrend(current: number, previous: number) {
  const delta = current - previous;
  if (delta > 0) {
    return `+${delta} dibanding bulan lalu`;
  }

  if (delta < 0) {
    return `${delta} dibanding bulan lalu`;
  }

  return "Sama seperti bulan lalu";
}

function startOfMonth(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

function startOfPreviousMonth(date: Date) {
  return new Date(date.getFullYear(), date.getMonth() - 1, 1);
}

function startOfDay(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function isMissingTableError(error: unknown) {
  if (typeof error !== "object" || !error || !("cause" in error)) {
    return false;
  }

  const cause = (error as { cause?: unknown }).cause;
  return typeof cause === "object" && cause !== null && "code" in cause && (cause as { code?: string }).code === "42P01";
}

export default async function AdminDashboardPage() {
  const now = new Date();
  const monthStart = startOfMonth(now);
  const previousMonthStart = startOfPreviousMonth(now);
  const chartStart = new Date(startOfDay(now).getTime() - 13 * 24 * 60 * 60 * 1000);

  let analyticsRecords: AnalyticsRecord[] = [];
  let latestLeads: Array<typeof leads.$inferSelect> = [];
  let currentMonthLeads = 0;
  let totalPortfolio = 0;
  let publishedBlogCount = 0;

  try {
    analyticsRecords = await db
      .select({
        eventType: websiteAnalyticsEvents.eventType,
        path: websiteAnalyticsEvents.path,
        source: websiteAnalyticsEvents.source,
        visitorId: websiteAnalyticsEvents.visitorId,
        createdAt: websiteAnalyticsEvents.createdAt,
      })
      .from(websiteAnalyticsEvents)
      .where(gte(websiteAnalyticsEvents.createdAt, previousMonthStart))
      .orderBy(desc(websiteAnalyticsEvents.createdAt));
  } catch (error) {
    if (!isMissingTableError(error)) {
      console.warn("Analytics table is not ready yet.", error);
    }
  }

  try {
    const [latestLeadsResult, currentMonthLeadsResult, totalPortfolioResult, publishedBlogResult] = await Promise.all([
      db.select().from(leads).orderBy(desc(leads.createdAt)).limit(5),
      db.select().from(leads).where(gte(leads.createdAt, monthStart)),
      db.select().from(portfolios),
      db.select().from(blogPosts).where(eq(blogPosts.status, "published")),
    ]);

    latestLeads = latestLeadsResult;
    currentMonthLeads = currentMonthLeadsResult.length;
    totalPortfolio = totalPortfolioResult.length;
    publishedBlogCount = publishedBlogResult.length;
  } catch (error) {
    console.warn("Dashboard support data is not ready yet.", error);
  }

  const currentMonthEvents = analyticsRecords.filter((item) => item.createdAt >= monthStart);
  const previousMonthEvents = analyticsRecords.filter(
    (item) => item.createdAt >= previousMonthStart && item.createdAt < monthStart
  );

  const pageViewsThisMonth = currentMonthEvents.filter((item) => item.eventType === "page_view");
  const pageViewsLastMonth = previousMonthEvents.filter((item) => item.eventType === "page_view");
  const chatClicksThisMonth = currentMonthEvents.filter((item) => item.eventType === "whatsapp_click");
  const chatClicksLastMonth = previousMonthEvents.filter((item) => item.eventType === "whatsapp_click");

  const uniqueVisitorsThisMonth = new Set(pageViewsThisMonth.map((item) => item.visitorId)).size;
  const uniqueVisitorsLastMonth = new Set(pageViewsLastMonth.map((item) => item.visitorId)).size;

  const stats = [
    {
      name: "Page Views Bulan Ini",
      stat: pageViewsThisMonth.length.toLocaleString("id-ID"),
      trend: formatTrend(pageViewsThisMonth.length, pageViewsLastMonth.length),
    },
    {
      name: "Pengunjung Unik",
      stat: uniqueVisitorsThisMonth.toLocaleString("id-ID"),
      trend: formatTrend(uniqueVisitorsThisMonth, uniqueVisitorsLastMonth),
    },
    {
      name: "Klik WhatsApp",
      stat: chatClicksThisMonth.length.toLocaleString("id-ID"),
      trend: formatTrend(chatClicksThisMonth.length, chatClicksLastMonth.length),
    },
    {
      name: "Lead Form Masuk",
      stat: currentMonthLeads.toLocaleString("id-ID"),
      trend: `${totalPortfolio} portfolio aktif, ${publishedBlogCount} blog published`,
    },
  ];

  const chartDays = Array.from({ length: 14 }, (_, index) => {
    const day = new Date(chartStart.getTime() + index * 24 * 60 * 60 * 1000);
    const key = day.toISOString().slice(0, 10);
    return {
      key,
      label: new Intl.DateTimeFormat("id-ID", { day: "numeric", month: "short" }).format(day),
      pageViews: 0,
      chatClicks: 0,
    };
  });

  const chartMap = new Map(chartDays.map((item) => [item.key, item]));

  for (const item of analyticsRecords) {
    if (item.createdAt < chartStart) {
      continue;
    }

    const key = item.createdAt.toISOString().slice(0, 10);
    const chartEntry = chartMap.get(key);
    if (!chartEntry) {
      continue;
    }

    if (item.eventType === "page_view") {
      chartEntry.pageViews += 1;
    }

    if (item.eventType === "whatsapp_click") {
      chartEntry.chatClicks += 1;
    }
  }

  const topPages = Object.entries(
    pageViewsThisMonth.reduce<Record<string, number>>((accumulator, item) => {
      accumulator[item.path] = (accumulator[item.path] || 0) + 1;
      return accumulator;
    }, {})
  )
    .sort((left, right) => right[1] - left[1])
    .slice(0, 5);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard Overview</h1>
        <p className="text-muted-foreground mt-2">
          Ringkasan traffic website, klik WhatsApp, dan inquiry yang masuk.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((item) => (
          <Card key={item.name}>
            <CardHeader className="space-y-1 pb-2">
              <CardTitle className="text-sm font-medium">{item.name}</CardTitle>
              <CardDescription>{item.trend}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold tracking-tight">{item.stat}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,2fr)_minmax(320px,1fr)]">
        <TrafficChart data={chartDays} />

        <Card>
          <CardHeader>
            <CardTitle>Halaman Teratas</CardTitle>
            <CardDescription>Halaman yang paling sering dikunjungi bulan ini.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {topPages.length === 0 ? (
              <p className="text-sm text-muted-foreground">Belum ada data traffic yang terekam.</p>
            ) : (
              topPages.map(([path, total]) => (
                <div key={path} className="flex items-center justify-between rounded-xl border border-border px-4 py-3">
                  <div>
                    <p className="font-medium text-foreground">{path}</p>
                    <p className="text-sm text-muted-foreground">Total kunjungan</p>
                  </div>
                  <Badge variant="secondary">{total}</Badge>
                </div>
              ))
            )}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Inquiry Terbaru</CardTitle>
          <CardDescription>Lead terbaru dari form website yang masuk ke dashboard.</CardDescription>
        </CardHeader>
        <CardContent>
          {latestLeads.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-10 text-center">
              <p className="text-sm font-medium">Belum ada inquiry</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Begitu form website dipakai pengunjung, data akan muncul di sini.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {latestLeads.map((lead) => (
                <div key={lead.id} className="flex flex-col gap-3 rounded-2xl border border-border px-4 py-4 md:flex-row md:items-start md:justify-between">
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="font-semibold">{lead.name}</p>
                      <Badge variant="outline">{lead.status}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{lead.email}</p>
                    <p className="text-sm text-muted-foreground">{lead.service || "Layanan belum dipilih"}</p>
                    {lead.message ? <p className="text-sm text-foreground">{lead.message}</p> : null}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {new Intl.DateTimeFormat("id-ID", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    }).format(lead.createdAt)}
                  </p>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
