import type { Metadata } from "next";
import { Inter, Geist } from "next/font/google";
import { siteConfig } from "@/lib/site";
import "./globals.css";
import { cn } from "@/lib/utils";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner";
import { TrafficTracker } from "@/components/analytics/TrafficTracker";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.domain),
  title: {
    default: `${siteConfig.name} - Jasa Pembuatan Website Profesional untuk UMKM`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "jasa pembuatan website",
    "website UMKM",
    "web developer Indonesia",
    "website company profile",
    "landing page UMKM",
    "jasa web developer Solo",
  ],
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  alternates: {
    canonical: siteConfig.domain,
  },
  icons: {
    icon: [
      { url: "/favicon.ico?v=2", sizes: "32x32" },
      { url: "/icon.png?v=2", type: "image/png", sizes: "32x32" },
    ],
    apple: [{ url: "/apple-icon.png?v=2", type: "image/png", sizes: "180x180" }],
  },
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: siteConfig.domain,
    siteName: siteConfig.name,
    title: `${siteConfig.name} - Website Profesional untuk UMKM Indonesia`,
    description:
      "UMKM-mu sudah online. Sekarang saatnya punya website yang bikin calon pelanggan makin percaya.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} - Jasa Pembuatan Website UMKM`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} - Website Profesional untuk UMKM`,
    description:
      "Jasa website company profile, toko online, dan landing page untuk UMKM Indonesia.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={cn("h-full", inter.variable, "font-sans", geist.variable)}
    >
      <body className="min-h-full bg-surface text-foreground antialiased">
        <a
          href="#konten"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:rounded-full focus:bg-orange focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
        >
          Langsung ke konten
        </a>
        <TooltipProvider>
          {children}
        </TooltipProvider>
        <TrafficTracker />
        <Toaster position="top-center" richColors />
      </body>
    </html>
  );
}
