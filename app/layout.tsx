import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { siteConfig } from "@/lib/site";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
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
      className={`${jakarta.variable} h-full scroll-smooth`}
    >
      <body className="min-h-full bg-surface text-foreground antialiased">
        <a
          href="#konten"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:rounded-full focus:bg-orange focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
        >
          Langsung ke konten
        </a>
        {children}
      </body>
    </html>
  );
}
