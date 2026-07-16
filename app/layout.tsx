import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { siteConfig } from "@/lib/site";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/sonner";
import { GoogleAnalytics } from "@/components/analytics/GoogleAnalytics";
import { TrafficTracker } from "@/components/analytics/TrafficTracker";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.domain),
  title: {
    default: `${siteConfig.name} | Jasa Pembuatan Website UMKM`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "kitangoding.id",
    "kitangoding id",
    "Kita Ngoding",
    "jasa pembuatan website",
    "website UMKM",
    "website company profile",
    "landing page UMKM",
    "jasa website Jogja",
    "jasa website Solo",
    "jasa website Wonogiri",
  ],
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  alternates: {
    canonical: siteConfig.domain,
  },
  icons: {
    icon: [
      { url: "/icon.png?v=2", type: "image/png", sizes: "32x32" },
    ],
    apple: [{ url: "/apple-icon.png?v=2", type: "image/png", sizes: "180x180" }],
  },
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: siteConfig.domain,
    siteName: siteConfig.name,
    title: `${siteConfig.name} | Jasa Pembuatan Website UMKM`,
    description: `${siteConfig.name} membuat website company profile, landing page, toko online, dan aplikasi web untuk bisnis di Jogja, Solo, Wonogiri, dan area Jawa.`,
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
    title: `${siteConfig.name} | Jasa Pembuatan Website UMKM`,
    description: `${siteConfig.name} membantu UMKM dan bisnis jasa membangun website yang jelas, cepat, dan mudah dihubungi pelanggan.`,
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
  verification: {
    google: "SNSS54Ct5gWaxbpA9yN-Qd5joLCcGhx7KXPGnVntQAg",
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
      className={cn("h-full", inter.variable, "font-sans")}
    >
      <body className="min-h-full bg-surface text-foreground antialiased">
        <a
          href="#konten"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:rounded-full focus:bg-orange focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
        >
          Langsung ke konten
        </a>
        {children}
        <GoogleAnalytics />
        <TrafficTracker />
        <Toaster position="top-center" richColors />
      </body>
    </html>
  );
}
