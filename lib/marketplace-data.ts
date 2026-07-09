export const marketplaceNav = [
  { href: "/layanan", label: "Layanan" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/pricing", label: "Harga" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Kontak" },
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
    image: "/images/project-4.webp",
  },
  {
    name: "Kelas Online",
    category: "Landing Page",
    description: "Halaman promosi untuk kelas, workshop, atau program mentoring.",
    price: "2jt",
    image: "/images/project-5.webp",
  },
  {
    name: "Produk Rumahan",
    category: "Katalog Produk",
    description: "Katalog ringan untuk makanan, fashion, skincare, atau produk lokal.",
    price: "3jt",
    image: "/images/project-6.webp",
  },
  {
    name: "Jasa Profesional",
    category: "Website Bisnis",
    description: "Cocok untuk konsultan, fotografer, kontraktor, dan penyedia jasa.",
    price: "3.5jt",
    image: "/images/project-7.webp",
  },
  {
    name: "Event Promo",
    category: "Landing Page",
    description: "Halaman cepat untuk event, launching, dan promo terbatas.",
    price: "2.2jt",
    image: "/images/project-8.webp",
  },
  {
    name: "Brand Starter",
    category: "Branding Basic",
    description: "Arah visual awal agar website dan brand terasa lebih konsisten.",
    price: "By Brief",
    image: "/images/project-1.webp",
  },
] as const;

export const shopCreatives = [
  ...creatives,
  {
    name: "Tutor",
    category: "Mobile App",
    description: "Tampilan app belajar yang cocok untuk kursus, kelas, atau bimbingan.",
    price: "3.5jt",
    image: "/images/project-2.webp",
  },
  {
    name: "WPStar",
    category: "Branding",
    description: "Arah visual untuk brand yang ingin terlihat lebih modern dan mudah diingat.",
    price: "2jt",
    image: "/images/project-3.webp",
  },
  {
    name: "Investing App",
    category: "Dashboard",
    description: "Tampilan dashboard sederhana untuk data, laporan, dan ringkasan bisnis.",
    price: "4jt",
    image: "/images/project-4.webp",
  },
  {
    name: "Productivity Tracker",
    category: "Dashboard",
    description: "Halaman dashboard untuk memantau progres kerja, pesanan, atau aktivitas tim.",
    price: "4.5jt",
    image: "/images/project-5.webp",
  },
  {
    name: "Pet Care",
    category: "Mobile App",
    description: "Konsep tampilan app layanan yang ramah, sederhana, dan mudah digunakan.",
    price: "3jt",
    image: "/images/project-6.webp",
  },
  {
    name: "Habit",
    category: "Mobile App",
    description: "Tampilan app ringan untuk kebiasaan, komunitas, atau program pelanggan.",
    price: "3.5jt",
    image: "/images/project-7.webp",
  },
] as const;

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

export const blogPosts = [
  {
    date: "June 2, 2026",
    title: "Cara Memilih Website yang Cocok untuk Bisnis Kecil",
    excerpt: "Mulai dari tujuan, isi halaman, sampai cara membuat calon pelanggan yakin.",
    image: "/images/project-6.webp",
  },
  {
    date: "May 28, 2026",
    title: "Kenapa Website yang Rapi Bisa Membantu Bisnis Terlihat Lebih Serius",
    excerpt: "Tampilan yang jelas membantu orang lebih cepat paham dan percaya.",
    image: "/images/project-7.webp",
  },
  {
    date: "May 20, 2026",
    title: "Hal yang Perlu Disiapkan Sebelum Membuat Website",
    excerpt: "Checklist sederhana agar proses pembuatan website tidak membingungkan.",
    image: "/images/project-8.webp",
  },
] as const;

export const blogPageFilters = [
  "Semua Artikel",
  "Strategi Branding",
  "Growth Bisnis",
  "Tips UI/UX",
  "Insight Industri",
  "Template & Resource",
] as const;

export const blogPagePosts = [
  {
    date: "June 2, 2026",
    title: "Cara Memilih Template Website yang Cocok untuk UMKM",
    excerpt: "Panduan sederhana untuk memilih tampilan yang sesuai dengan jenis bisnis, tujuan, dan calon pelanggan kamu.",
    category: "Template & Resource",
    tone: "blog-thumb-a",
  },
  {
    date: "May 28, 2026",
    title: "Kenapa Website Custom Bisa Jadi Investasi yang Masuk Akal",
    excerpt: "Kapan bisnis cukup pakai template, dan kapan perlu tampilan custom yang dibuat lebih spesifik.",
    category: "Insight Industri",
    tone: "blog-thumb-b",
  },
  {
    date: "May 24, 2026",
    title: "Strategi Sederhana agar Website Lebih Banyak Menghasilkan Lead",
    excerpt: "Mulai dari pesan utama, struktur halaman, sampai tombol WhatsApp yang lebih jelas untuk calon pelanggan.",
    category: "Growth Bisnis",
    tone: "blog-thumb-c",
  },
  {
    date: "May 18, 2026",
    title: "10 Detail Kecil yang Bikin Brand Terlihat Lebih Serius",
    excerpt: "Hal-hal praktis seperti warna, spacing, bahasa, dan konsistensi visual yang sering terasa sepele tapi berdampak.",
    category: "Strategi Branding",
    tone: "blog-thumb-d",
  },
  {
    date: "May 12, 2026",
    title: "Membuat Alur Website yang Mudah Dipahami Pengunjung",
    excerpt: "Cara menyusun informasi supaya orang cepat paham layanan kamu tanpa harus membaca terlalu banyak.",
    category: "Tips UI/UX",
    tone: "blog-thumb-e",
  },
  {
    date: "May 6, 2026",
    title: "Kenapa Template Bisa Mempercepat Launching Project",
    excerpt: "Template yang tepat bisa menghemat waktu, mengurangi revisi awal, dan membuat bisnis lebih cepat tampil online.",
    category: "Template & Resource",
    tone: "blog-thumb-f",
  },
] as const;

export const footerColumns = [
  {
    title: "Halaman",
    links: [
      { label: "Home", href: "/" },
      { label: "Harga", href: "/pricing" },
      { label: "Portfolio", href: "/portfolio" },
      { label: "Blog", href: "/blog" },
      { label: "Kontak", href: "/contact" },
    ],
  },
  {
    title: "Layanan",
    links: [
      { label: "Website Company Profile", href: "/jasa-website-company-profile" },
      { label: "Landing Page", href: "/jasa-landing-page-bisnis" },
      { label: "Toko Online", href: "/jasa-toko-online-umkm" },
      { label: "Aplikasi Web Custom", href: "/project-inquiry" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "FAQ", href: "/#faq" },
      { label: "Project Inquiry", href: "/project-inquiry" },
      { label: "Konsultasi WhatsApp", href: "/contact" },
      { label: "Studi Kasus", href: "/portfolio" },
    ],
  },
] as const;
