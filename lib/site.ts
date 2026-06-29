export const siteConfig = {
  name: process.env.NEXT_PUBLIC_SITE_NAME || "Kita Ngoding",
  shortName: process.env.NEXT_PUBLIC_SITE_SHORT_NAME || "Kita Ngoding",
  description:
    process.env.NEXT_PUBLIC_SITE_DESCRIPTION ||
    "Kita Ngoding membantu bisnis di Jogja, Solo, Wonogiri, dan area Jawa membuat website company profile, landing page, toko online, dan aplikasi web yang rapi, cepat, dan siap dipakai jualan.",
  domain: process.env.NEXT_PUBLIC_APP_URL || "https://kitangoding.com",
  gaMeasurementId: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "G-RY3471CB04",
  email: process.env.NEXT_PUBLIC_SITE_EMAIL || "halo@kitangoding.com",
  phoneDisplay: process.env.NEXT_PUBLIC_SITE_PHONE_DISPLAY || "+62 812-3456-7890",
  phoneHref: process.env.NEXT_PUBLIC_SITE_PHONE_HREF || "6281234567890",
  addressLocality: process.env.NEXT_PUBLIC_SITE_ADDRESS_LOCALITY || "Sendangadi, Mlati",
  addressRegion: process.env.NEXT_PUBLIC_SITE_ADDRESS_REGION || "Sleman, DI Yogyakarta",
  addressCountry: process.env.NEXT_PUBLIC_SITE_ADDRESS_COUNTRY || "ID",
  instagram: process.env.NEXT_PUBLIC_SITE_INSTAGRAM || "https://instagram.com/kitangoding.id",
  tiktok: process.env.NEXT_PUBLIC_SITE_TIKTOK || "https://tiktok.com/@ryobisuryaatmaja",
  tagline:
    process.env.NEXT_PUBLIC_SITE_TAGLINE || "Jasa pembuatan website untuk bisnis di area Jawa yang ingin lebih dipercaya dan mudah dihubungi.",
} as const;

export const serviceAreas = [
  "DI Yogyakarta",
  "Surakarta (Solo)",
  "Wonogiri",
  "Jawa Tengah",
  "Jawa Timur",
  "Jawa Barat",
] as const;

export const navigationLinks = [
  { href: "#layanan", label: "Layanan" },
  { href: "#proses", label: "Proses" },
  { href: "#portfolio", label: "Portfolio" },
  { href: "/pricing", label: "Harga" },
  { href: "#faq", label: "FAQ" },
] as const;

export const whatsappHref = `https://wa.me/${siteConfig.phoneHref}?text=${encodeURIComponent(
  "Halo Kita Ngoding, saya ingin konsultasi website untuk bisnis saya."
)}`;

export function createWhatsAppHref(message: string) {
  return `https://wa.me/${siteConfig.phoneHref}?text=${encodeURIComponent(message)}`;
}
