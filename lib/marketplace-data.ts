import { serviceLandingPages } from "@/lib/service-landing-pages";

export const categories = serviceLandingPages.map(page => ({
  title: page.name,
  description: page.description,
}));

export const shopCreatives = serviceLandingPages.map(page => ({
  name: page.name,
  category: page.name,
  description: `Ilustrasi konsep. ${page.description}`,
  price: "By Brief",
  image: page.image,
}));

export const marketplacePricing = [
  {
    name: "Website Starter",
    description: "Cocok untuk bisnis yang butuh website profil rapi dan bisa langsung diarahkan ke WhatsApp.",
    price: "Mulai 2jt",
    note: "",
    features: [
      "Struktur halaman jelas",
      "Copy dasar disesuaikan dengan bisnis",
      "Responsif untuk HP dan desktop",
      "CTA WhatsApp siap dipakai",
    ],
    cta: "Konsultasi Paket Starter",
  },
  {
    name: "Project Custom",
    description: "Cocok kalau kamu butuh landing page campaign, toko online, dashboard, atau fitur khusus.",
    price: "By Brief",
    note: "Diskusi gratis dulu",
    features: [
      "Scope disusun dari kebutuhan bisnis",
      "Desain mengikuti karakter brand",
      "Bisa tambah fitur sesuai alur kerja",
      "Estimasi dibuat setelah brief jelas",
    ],
    cta: "Bahas Project Custom",
  },
] as const;
