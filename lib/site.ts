export const siteConfig = {
  name: "Kita Ngoding",
  shortName: "Kita Ngoding",
  description:
    "Kita Ngoding membantu UMKM tampil profesional secara online lewat website company profile, landing page, dan toko online yang cepat, rapi, dan meyakinkan.",
  domain: "https://kitangoding.com",
  email: "halo@kitangoding.com",
  phoneDisplay: "+62 812-3456-7890",
  phoneHref: "6281234567890",
  addressLocality: "Solo",
  addressRegion: "Jawa Tengah",
  addressCountry: "ID",
  instagram: "https://instagram.com/kitangoding",
  tagline: "Website profesional untuk UMKM yang ingin terlihat lebih dipercaya.",
} as const;

export const navigationLinks = [
  { href: "#layanan", label: "Layanan" },
  { href: "#proses", label: "Proses" },
  { href: "#portfolio", label: "Portfolio" },
  { href: "#harga", label: "Harga" },
  { href: "#faq", label: "FAQ" },
] as const;

export const whatsappHref = `https://wa.me/${siteConfig.phoneHref}?text=${encodeURIComponent(
  "Halo Kita Ngoding, saya ingin konsultasi website untuk bisnis saya."
)}`;

export function createWhatsAppHref(message: string) {
  return `https://wa.me/${siteConfig.phoneHref}?text=${encodeURIComponent(message)}`;
}
