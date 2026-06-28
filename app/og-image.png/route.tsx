import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site";

export const runtime = "edge";

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "linear-gradient(135deg, #f7f2e8 0%, #f97316 100%)",
          color: "#0f172a",
          padding: 72,
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ fontSize: 34, fontWeight: 800 }}>{siteConfig.name}</div>
        <div style={{ maxWidth: 880 }}>
          <div style={{ fontSize: 76, fontWeight: 900, lineHeight: 0.95 }}>
            Jasa Website UMKM yang Rapi dan Siap Jualan
          </div>
          <div style={{ marginTop: 28, fontSize: 30, lineHeight: 1.35 }}>
            Company profile, landing page, toko online, dan aplikasi web untuk bisnis Indonesia.
          </div>
        </div>
        <div style={{ fontSize: 28, fontWeight: 700 }}>{siteConfig.domain.replace(/^https?:\/\//, "")}</div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  );
}
