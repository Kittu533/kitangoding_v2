export const marketplaceNav = [
  { href: "#tentang", label: "About" },
  { href: "#kategori", label: "Category" },
  { href: "/shop", label: "Shop" },
  { href: "#harga", label: "Pricing" },
  { href: "#blog", label: "Blog" },
  { href: "#kontak", label: "Contact" },
  { href: "#project", label: "Project Inquiry" },
] as const;

export const categories = [
  {
    title: "Website Bisnis",
    description: "Untuk profil usaha, jasa, dan brand lokal.",
    accent: "bg-orange",
  },
  {
    title: "Landing Page",
    description: "Untuk promo, campaign, dan penawaran khusus.",
    accent: "bg-success",
  },
  {
    title: "Katalog Produk",
    description: "Untuk menampilkan produk dan arah order.",
    accent: "bg-navy",
  },
  {
    title: "Branding Basic",
    description: "Untuk tampilan brand yang lebih rapi.",
    accent: "bg-danger",
  },
] as const;

export const creatives = [
  {
    name: "Kedai Kopi",
    category: "Website Bisnis",
    description: "Website sederhana untuk cafe, kedai, atau tempat makan kecil.",
    price: "2.5jt",
    tone: "creative-thumb-green",
  },
  {
    name: "Kelas Online",
    category: "Landing Page",
    description: "Halaman promosi untuk kelas, workshop, atau program mentoring.",
    price: "2jt",
    tone: "creative-thumb-blue",
  },
  {
    name: "Produk Rumahan",
    category: "Katalog Produk",
    description: "Katalog ringan untuk makanan, fashion, skincare, atau produk lokal.",
    price: "3jt",
    tone: "creative-thumb-emerald",
  },
  {
    name: "Jasa Profesional",
    category: "Website Bisnis",
    description: "Cocok untuk konsultan, fotografer, kontraktor, dan penyedia jasa.",
    price: "3.5jt",
    tone: "creative-thumb-dark",
  },
  {
    name: "Event Promo",
    category: "Landing Page",
    description: "Halaman cepat untuk event, launching, dan promo terbatas.",
    price: "2.2jt",
    tone: "creative-thumb-orange",
  },
  {
    name: "Brand Starter",
    category: "Branding Basic",
    description: "Arah visual awal agar website dan brand terasa lebih konsisten.",
    price: "By Brief",
    tone: "creative-thumb-sky",
  },
] as const;

export const shopCreatives = [
  ...creatives,
  {
    name: "Tutor",
    category: "Mobile App",
    description: "Tampilan app belajar yang cocok untuk kursus, kelas, atau bimbingan.",
    price: "3.5jt",
    tone: "creative-thumb-blue",
  },
  {
    name: "WPStar",
    category: "Branding",
    description: "Arah visual untuk brand yang ingin terlihat lebih modern dan mudah diingat.",
    price: "2jt",
    tone: "creative-thumb-purple",
  },
  {
    name: "Investing App",
    category: "Dashboard",
    description: "Tampilan dashboard sederhana untuk data, laporan, dan ringkasan bisnis.",
    price: "4jt",
    tone: "creative-thumb-emerald",
  },
  {
    name: "Productivity Tracker",
    category: "Dashboard",
    description: "Halaman dashboard untuk memantau progres kerja, pesanan, atau aktivitas tim.",
    price: "4.5jt",
    tone: "creative-thumb-sky",
  },
  {
    name: "Pet Care",
    category: "Mobile App",
    description: "Konsep tampilan app layanan yang ramah, sederhana, dan mudah digunakan.",
    price: "3jt",
    tone: "creative-thumb-purple",
  },
  {
    name: "Habit",
    category: "Mobile App",
    description: "Tampilan app ringan untuk kebiasaan, komunitas, atau program pelanggan.",
    price: "3.5jt",
    tone: "creative-thumb-blue",
  },
] as const;

export const marketplacePricing = [
  {
    name: "Pilih Paket Siap Pakai",
    description: "Cocok kalau kamu ingin mulai dari struktur website yang sudah jelas.",
    price: "Mulai 2jt",
    note: "",
    features: [
      "Pilih contoh tampilan yang paling cocok",
      "Isi disesuaikan dengan bisnismu",
      "Sudah nyaman dibuka dari HP",
      "Bisa langsung diarahkan ke WhatsApp",
    ],
    cta: "Explore Templates",
  },
  {
    name: "Custom Project",
    description: "Cocok kalau kamu punya kebutuhan yang lebih spesifik.",
    price: "By Brief",
    note: "Diskusi gratis dulu",
    features: [
      "Kami bantu susun kebutuhan dari awal",
      "Tampilan dibuat mengikuti karakter brand",
      "Halaman bisa dibuat lebih lengkap",
      "Cocok untuk bisnis yang ingin naik level",
    ],
    cta: "Book Now",
  },
] as const;

export const blogPosts = [
  {
    date: "June 2, 2026",
    title: "Cara Memilih Website yang Cocok untuk Bisnis Kecil",
    excerpt: "Mulai dari tujuan, isi halaman, sampai cara membuat calon pelanggan yakin.",
    tone: "blog-thumb-a",
  },
  {
    date: "May 28, 2026",
    title: "Kenapa Website yang Rapi Bisa Membantu Bisnis Terlihat Lebih Serius",
    excerpt: "Tampilan yang jelas membantu orang lebih cepat paham dan percaya.",
    tone: "blog-thumb-b",
  },
  {
    date: "May 20, 2026",
    title: "Hal yang Perlu Disiapkan Sebelum Membuat Website",
    excerpt: "Checklist sederhana agar proses pembuatan website tidak membingungkan.",
    tone: "blog-thumb-c",
  },
] as const;

export const footerColumns = [
  {
    title: "Pages",
    links: ["Home", "Pricing", "Category", "Shop", "Blog", "Contact"],
  },
  {
    title: "Categories",
    links: ["Website Bisnis", "Landing Page", "Katalog Produk", "Branding"],
  },
  {
    title: "Resources",
    links: ["FAQ", "Privacy Policy", "Terms & Conditions", "Changelog"],
  },
] as const;
