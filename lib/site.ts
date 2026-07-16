export const siteConfig = {
  name: "kitangoding.id",
  shortName: "kitangoding.id",
  alternateName: "Kita Ngoding",
  description:
    process.env.NEXT_PUBLIC_SITE_DESCRIPTION ||
    "kitangoding.id adalah jasa pembuatan website untuk UMKM, brand lokal, dan bisnis jasa di Jogja, Solo, Wonogiri, dan area Jawa.",
  domain: process.env.NEXT_PUBLIC_APP_URL || "https://www.kitangoding.my.id",
  gaMeasurementId: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "G-RY3471CB04",
  email: process.env.NEXT_PUBLIC_SITE_EMAIL || "halo@kitangoding.com",
  phoneDisplay: process.env.NEXT_PUBLIC_SITE_PHONE_DISPLAY || "+62 812-3456-7890",
  phoneHref: normalizePhoneHref(process.env.NEXT_PUBLIC_SITE_PHONE_HREF || "6281234567890"),
  addressLocality: process.env.NEXT_PUBLIC_SITE_ADDRESS_LOCALITY || "Sendangadi, Mlati",
  addressRegion: process.env.NEXT_PUBLIC_SITE_ADDRESS_REGION || "Sleman, DI Yogyakarta",
  addressCountry: process.env.NEXT_PUBLIC_SITE_ADDRESS_COUNTRY || "ID",
  instagram: process.env.NEXT_PUBLIC_SITE_INSTAGRAM || "https://instagram.com/kitangoding.id",
  tiktok: process.env.NEXT_PUBLIC_SITE_TIKTOK || "https://tiktok.com/@ryobisuryaatmaja",
  tagline:
    "Jasa pembuatan website untuk UMKM, brand lokal, dan bisnis jasa yang ingin lebih mudah dipahami dan dihubungi.",
} as const;

export function normalizePhoneHref(value: string) {
  const digits = value.replace(/\D/g, "");

  return digits.length > 0 ? digits : "6281234567890";
}

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
  "Halo kitangoding.id, saya ingin konsultasi website untuk bisnis saya."
)}`;

export function createWhatsAppHref(message: string) {
  return `https://wa.me/${siteConfig.phoneHref}?text=${encodeURIComponent(message)}`;
}
