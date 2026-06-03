"use client";

import { useMemo, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type TrafficChartPoint = {
  label: string;
  pageViews: number;
  chatClicks: number;
};

type TrafficChartProps = {
  data: TrafficChartPoint[];
};

type ChartCoordinate = TrafficChartPoint & {
  x: number;
  pageViewsY: number;
  chatClicksY: number;
};

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function getSmoothLinePath(points: ChartCoordinate[], key: "pageViewsY" | "chatClicksY") {
  if (points.length === 0) {
    return "";
  }

  if (points.length === 1) {
    return `M ${points[0].x} ${points[0][key]}`;
  }

  return points.reduce((path, point, index) => {
    if (index === 0) {
      return `M ${point.x} ${point[key]}`;
    }

    const previousPoint = points[index - 1];
    const controlX = previousPoint.x + (point.x - previousPoint.x) / 2;

    return `${path} C ${controlX} ${previousPoint[key]}, ${controlX} ${point[key]}, ${point.x} ${point[key]}`;
  }, "");
}

function getAreaPath(points: ChartCoordinate[], key: "pageViewsY" | "chatClicksY", chartBottom: number) {
  if (points.length === 0) {
    return "";
  }

  const linePath = getSmoothLinePath(points, key);
  const firstPoint = points[0];
  const lastPoint = points[points.length - 1];

  return `${linePath} L ${lastPoint.x} ${chartBottom} L ${firstPoint.x} ${chartBottom} Z`;
}

export function TrafficChart({ data }: TrafficChartProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(data.length - 1);
  const activeIndex = hoveredIndex ?? data.length - 1;
  const activeItem = data[clamp(activeIndex, 0, Math.max(data.length - 1, 0))];

  const chart = useMemo(() => {
    const chartWidth = 720;
    const chartHeight = 320;
    const paddingTop = 18;
    const paddingBottom = 42;
    const paddingX = 18;
    const innerWidth = chartWidth - paddingX * 2;
    const innerHeight = chartHeight - paddingTop - paddingBottom;
    const maxValue = Math.max(...data.map((item) => item.pageViews), ...data.map((item) => item.chatClicks), 1);

    const coordinates: ChartCoordinate[] = data.map((item, index) => {
      const ratio = data.length === 1 ? 0.5 : index / (data.length - 1);
      const x = paddingX + ratio * innerWidth;
      const pageViewsY = paddingTop + innerHeight - (item.pageViews / maxValue) * innerHeight;
      const chatClicksY = paddingTop + innerHeight - (item.chatClicks / maxValue) * innerHeight;

      return {
        ...item,
        x,
        pageViewsY,
        chatClicksY,
      };
    });

    const gridLines = Array.from({ length: 5 }, (_, index) => {
      const value = Math.round((maxValue / 4) * (4 - index));
      const y = paddingTop + (innerHeight / 4) * index;
      return { value, y };
    });

    return {
      chartHeight,
      chartWidth,
      chartBottom: paddingTop + innerHeight,
      coordinates,
      gridLines,
      pageViewsPath: getSmoothLinePath(coordinates, "pageViewsY"),
      chatClicksPath: getSmoothLinePath(coordinates, "chatClicksY"),
      pageViewsAreaPath: getAreaPath(coordinates, "pageViewsY", paddingTop + innerHeight),
      chatClicksAreaPath: getAreaPath(coordinates, "chatClicksY", paddingTop + innerHeight),
      maxValue,
      paddingTop,
      paddingBottom,
      paddingX,
    };
  }, [data]);

  const activePoint = chart.coordinates[clamp(activeIndex, 0, Math.max(chart.coordinates.length - 1, 0))];
  const pageViewPeak = Math.max(...data.map((item) => item.pageViews), 0);
  const chatClickPeak = Math.max(...data.map((item) => item.chatClicks), 0);

  return (
    <Card className="overflow-hidden border-border/80 bg-gradient-to-br from-white via-white to-orange-light/20 shadow-card">
      <CardHeader className="pb-4">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div className="space-y-2">
            <CardTitle>Traffic 14 Hari Terakhir</CardTitle>
            <CardDescription>
              Pantau kunjungan website dan klik WhatsApp dengan tampilan harian yang lebih jelas.
            </CardDescription>
          </div>

          {activeItem ? (
            <div className="grid min-w-[220px] grid-cols-2 gap-3 rounded-2xl border border-border bg-white/80 p-3 shadow-sm backdrop-blur">
              <div>
                <p className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                  Hari Dipilih
                </p>
                <p className="mt-1 text-sm font-semibold text-foreground">{activeItem.label}</p>
              </div>
              <div>
                <p className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                  Total
                </p>
                <p className="mt-1 text-sm font-semibold text-foreground">
                  {activeItem.pageViews + activeItem.chatClicks} aksi
                </p>
              </div>
            </div>
          ) : null}
        </div>
      </CardHeader>

      <CardContent className="space-y-5">
        <div className="grid gap-3 sm:grid-cols-3">
          <div className="rounded-2xl border border-orange/15 bg-orange-light/70 px-4 py-3">
            <p className="text-xs font-semibold tracking-wide text-orange-dark uppercase">Page Views Tertinggi</p>
            <p className="mt-2 text-2xl font-bold text-navy">{pageViewPeak}</p>
          </div>
          <div className="rounded-2xl border border-navy/10 bg-navy-light/60 px-4 py-3">
            <p className="text-xs font-semibold tracking-wide text-navy uppercase">Klik Chat Tertinggi</p>
            <p className="mt-2 text-2xl font-bold text-navy">{chatClickPeak}</p>
          </div>
          <div className="rounded-2xl border border-border bg-white/80 px-4 py-3">
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <span className="size-3 rounded-full bg-orange shadow-[0_0_0_4px_rgba(245,130,31,0.12)]" />
                <span>Page Views</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="size-3 rounded-full bg-navy shadow-[0_0_0_4px_rgba(29,52,97,0.12)]" />
                <span>Klik WhatsApp</span>
              </div>
            </div>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-[28px] border border-border bg-[radial-gradient(circle_at_top_left,rgba(245,130,31,0.14),transparent_32%),linear-gradient(180deg,#ffffff,rgba(255,243,232,0.42))] p-4 shadow-sm">
          <div className="absolute inset-x-6 top-0 h-24 rounded-full bg-orange/10 blur-3xl" aria-hidden="true" />

          {activePoint ? (
            <div
              className="pointer-events-none absolute top-4 z-10 hidden min-w-[180px] rounded-2xl border border-border bg-white/95 px-4 py-3 text-sm shadow-card backdrop-blur md:block"
              style={{
                left: `clamp(1rem, calc(${(activePoint.x / chart.chartWidth) * 100}% - 5rem), calc(100% - 12rem))`,
              }}
            >
              <p className="font-semibold text-foreground">{activePoint.label}</p>
              <div className="mt-2 flex items-center justify-between gap-4">
                <span className="text-muted-foreground">Page Views</span>
                <span className="font-semibold text-orange-dark">{activePoint.pageViews}</span>
              </div>
              <div className="mt-1 flex items-center justify-between gap-4">
                <span className="text-muted-foreground">Klik Chat</span>
                <span className="font-semibold text-navy">{activePoint.chatClicks}</span>
              </div>
            </div>
          ) : null}

          <svg
            aria-label="Grafik traffic website"
            className="h-[360px] w-full"
            viewBox={`0 0 ${chart.chartWidth} ${chart.chartHeight}`}
            preserveAspectRatio="none"
            role="img"
          >
            <defs>
              <linearGradient id="traffic-page-views" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="rgba(245,130,31,0.35)" />
                <stop offset="100%" stopColor="rgba(245,130,31,0.03)" />
              </linearGradient>
              <linearGradient id="traffic-chat-clicks" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="rgba(29,52,97,0.24)" />
                <stop offset="100%" stopColor="rgba(29,52,97,0.02)" />
              </linearGradient>
            </defs>

            {chart.gridLines.map((line) => (
              <g key={line.y}>
                <line
                  x1={chart.paddingX}
                  x2={chart.chartWidth - chart.paddingX}
                  y1={line.y}
                  y2={line.y}
                  stroke="currentColor"
                  strokeDasharray="5 8"
                  className="text-border/70"
                />
                <text
                  x={chart.paddingX}
                  y={line.y - 6}
                  className="fill-muted-foreground text-[10px]"
                >
                  {line.value}
                </text>
              </g>
            ))}

            <path d={chart.chatClicksAreaPath} fill="url(#traffic-chat-clicks)" />
            <path d={chart.pageViewsAreaPath} fill="url(#traffic-page-views)" />

            <path
              d={chart.chatClicksPath}
              fill="none"
              stroke="var(--color-navy, #1d3461)"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="3.5"
            />
            <path
              d={chart.pageViewsPath}
              fill="none"
              stroke="var(--color-orange, #f5821f)"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="4"
            />

            {chart.coordinates.map((point, index) => {
              const isActive = index === activeIndex;

              return (
                <g key={point.label}>
                  <line
                    x1={point.x}
                    x2={point.x}
                    y1={chart.paddingTop}
                    y2={chart.chartBottom}
                    className={cn(
                      "transition-opacity duration-200",
                      isActive ? "opacity-100" : "opacity-0"
                    )}
                    stroke="rgba(29,52,97,0.16)"
                    strokeDasharray="4 6"
                  />

                  <circle
                    cx={point.x}
                    cy={point.pageViewsY}
                    r={isActive ? 6.5 : 4.5}
                    fill="white"
                    stroke="var(--color-orange, #f5821f)"
                    strokeWidth="3"
                    className="transition-all duration-200"
                  />
                  <circle
                    cx={point.x}
                    cy={point.chatClicksY}
                    r={isActive ? 6 : 4}
                    fill="white"
                    stroke="var(--color-navy, #1d3461)"
                    strokeWidth="3"
                    className="transition-all duration-200"
                  />

                  <text
                    x={point.x}
                    y={chart.chartHeight - 12}
                    textAnchor="middle"
                    className={cn(
                      "fill-muted-foreground text-[10px] transition-all duration-200",
                      isActive && "fill-foreground"
                    )}
                  >
                    {point.label}
                  </text>
                </g>
              );
            })}
          </svg>

          <div className="absolute inset-0 grid grid-cols-14">
            {chart.coordinates.map((point, index) => (
              <button
                key={`${point.label}-${index}`}
                aria-label={`Lihat data traffic ${point.label}`}
                className="h-full w-full cursor-pointer bg-transparent outline-none"
                onFocus={() => setHoveredIndex(index)}
                onMouseEnter={() => setHoveredIndex(index)}
                onTouchStart={() => setHoveredIndex(index)}
                type="button"
              />
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
