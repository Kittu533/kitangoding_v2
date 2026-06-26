export const trustItems = [
  "Copy lebih jelas untuk calon pelanggan",
  "Tampilan profesional di semua device",
  "CTA WhatsApp yang langsung bisa dipakai",
] as const;

export const services = [
  {
    title: "Website Company Profile",
    description:
      "Bangun citra profesional dengan website yang rapi, cepat, dan jelas menjelaskan value bisnis kamu.",
  },
  {
    title: "Landing Page Campaign",
    description:
      "Halaman fokus konversi untuk promo, launching produk, atau lead generation yang lebih terukur.",
  },
  {
    title: "Toko Online UMKM",
    description:
      "Katalog produk yang mudah dipahami calon pembeli, lengkap dengan CTA WhatsApp dan alur order sederhana.",
  },
  {
    title: "Redesign Website Lama",
    description:
      "Perbaiki tampilan lama yang sudah tidak relevan agar terlihat lebih modern dan lebih dipercaya.",
  },
] as const;

export const painPoints = [
  "Website lama terasa seperti brosur digital yang tidak menjawab pertanyaan calon pelanggan.",
  "Tampilan kurang meyakinkan sehingga bisnis terlihat kecil walaupun produknya sudah bagus.",
  "Tidak ada alur CTA yang jelas untuk konsultasi, order, atau follow-up via WhatsApp.",
] as const;

export const solutions = [
  "Headline yang menjelaskan value bisnis dalam bahasa yang lebih mudah dicerna.",
  "Susunan section yang runtut dari masalah, solusi, bukti sosial, hingga CTA.",
  "Visual brand yang lebih solid supaya bisnis terasa profesional bahkan untuk pelanggan baru.",
] as const;

export const advantages = [
  {
    title: "Copy yang mudah dipahami",
    description:
      "Kami bantu susun struktur konten agar pengunjung cepat paham, bukan cuma melihat desain bagus.",
  },
  {
    title: "Visual yang relevan dengan UMKM",
    description:
      "Desain diarahkan untuk trust, clarity, dan kemudahan akses, bukan sekadar ikut tren yang ramai.",
  },
  {
    title: "Proses cepat dan transparan",
    description:
      "Timeline, revisi, dan deliverable dijelaskan dari awal supaya kamu tahu progresnya setiap minggu.",
  },
  {
    title: "Siap dikembangkan",
    description:
      "Fondasi Next.js ini bisa tumbuh ke form lead, katalog, admin sederhana, atau dashboard internal.",
  },
] as const;

export const processSteps = [
  {
    number: "01",
    title: "Kenalan dengan bisnismu",
    description:
      "Kami cari tahu bisnis kamu bergerak di bidang apa, siapa calon pelangganmu, dan hal apa yang paling ingin kamu tonjolkan.",
  },
  {
    number: "02",
    title: "Susun isi halaman",
    description:
      "Kami bantu urutkan informasi penting agar pengunjung mudah paham layananmu, keunggulanmu, dan cara menghubungimu.",
  },
  {
    number: "03",
    title: "Buat tampilan website",
    description:
      "Kami ubah isi halaman tadi menjadi tampilan website yang rapi, nyaman dibuka di HP, dan terlihat profesional.",
  },
  {
    number: "04",
    title: "Website siap dipakai",
    description:
      "Setelah website online, kami bantu cek lagi tampilannya dan dampingi penyesuaian kecil supaya siap dibagikan ke pelanggan.",
  },
] as const;

export const portfolioItems = [
  {
    category: "Company Profile",
    name: "Sahabat Kopi Nusantara",
    result: "Naikkan kredibilitas mitra B2B lewat website yang lebih rapi dan jelas.",
  },
  {
    category: "Landing Page",
    name: "Kelas Menjahit Ibu Hebat",
    result: "Landing page promo dengan CTA WhatsApp yang langsung mengarahkan konsultasi.",
  },
  {
    category: "E-Commerce",
    name: "Roti Oven Mbak Sari",
    result: "Showcase produk populer, FAQ pengiriman, dan alur order yang lebih sederhana.",
  },
] as const;

export const pricingPlans = [
  {
    name: "Landing Page UMKM Executive",
    price: "Rp 1.800.000",
    description: "Halaman penjualan fokus ROI untuk iklan FB Ads & Google Ads (Serupa: Gaya Sales Page Pro).",
    features: [
      "Domain .com/.id + SSL aktif dan managed cloud hosting",
      "1 halaman campaign mobile-first dengan CTA WhatsApp / form lead",
      "Struktur copy penawaran, FAQ, testimoni, dan Google Maps",
      "Basic SEO setup untuk title, meta, dan indexing awal",
      "Integrasi GA4 dan Meta Pixel untuk tracking kampanye",
      "Form inquiry masuk ke email bisnis atau WhatsApp admin",
    ],
    featured: true,
  },
  {
    name: "Corporate Identity Basic",
    price: "Rp 3.500.000",
    description: "Profil digital resmi untuk kredibilitas Firma Hukum, CV, atau Agensi (Serupa: Gaya Business Profile).",
    features: [
      "Free custom domain 1 tahun + fully managed hosting",
      "Maksimal 6 halaman untuk profil, layanan, tim, dan kontak",
      "Email bisnis profesional dengan setup DNS dasar",
      "Desain responsif, SSL security, dan mobile information bar",
      "SEO visibility dasar + basic website metrics",
      "Form kontak, Google Maps, dan integrasi tombol konsultasi",
    ],
    featured: false,
  },
  {
    name: "Enterprise Business Site",
    price: "Rp 5.500.000",
    description: "Website prestisius untuk PT/Pabrik dengan fitur portofolio proyek lengkap (Serupa: Gaya Corporate Portal).",
    features: [
      "Domain .co.id + managed VPS hosting untuk trafik lebih stabil",
      "CMS dashboard untuk kelola halaman, berita, dan portofolio",
      "Multi-user admin untuk tim marketing atau operasional",
      "Lead capture form, routing email, dan CTA per divisi",
      "Advanced analytics, backup rutin, dan proteksi spam dasar",
      "Training handoff untuk tim internal setelah website live",
    ],
    featured: true,
  },
  {
    name: "E-Commerce Retail Starter",
    price: "Rp 7.500.000",
    description: "Pasar digital mandiri untuk brand yang ingin lepas dari marketplace (Serupa: Gaya Shopify / Evermos).",
    features: [
      "Hosting e-commerce + domain + SSL siap transaksi online",
      "Manajemen katalog, kategori produk, dan stok inventori",
      "100+ metode pembayaran dan ongkir kurir terintegrasi",
      "Diskon, voucher, dan abandoned checkout recovery",
      "Dashboard order, laporan penjualan, dan live analytics",
      "Integrasi chat customer service dan notifikasi pesanan",
    ],
    featured: true,
  },
  {
    name: "Sistem Kustom Operasional",
    price: "Rp 15.000.000",
    description: "Solusi software untuk laundry, klinik, atau HRIS internal (Serupa: Gaya ERP Mini / SaaS Kustom).",
    features: [
      "Workshop requirement, mapping SOP, dan perencanaan modul",
      "Role-based access, audit log, dan histori aktivitas pengguna",
      "Dashboard operasional real-time sesuai alur kerja bisnis",
      "Laporan, reminder, dan notifikasi email / WhatsApp",
      "Integrasi API ke tool internal atau vendor pihak ketiga",
      "Source code handover dan dokumentasi teknis proyek",
    ],
    featured: true,
  },
] as const;

export const testimonials = [
  {
    quote:
      "Sebelumnya orang sering tanya bisnis kami sebenarnya jual apa. Setelah website baru jadi, penjelasannya jauh lebih rapi dan closing lewat WhatsApp lebih enak.",
    name: "Dina Pramesti",
    role: "Owner, Sahabat Kopi Nusantara",
  },
  {
    quote:
      "Tim Kita Ngoding enak diajak mikir bareng. Mereka bukan cuma bikin cantik, tapi benar-benar bantu ngerapihin cara kami menawarkan jasa.",
    name: "Rizal Aditya",
    role: "Founder, Studio Interior Saka",
  },
  {
    quote:
      "Yang paling terasa itu prosesnya jelas. Saya tahu kapan revisi, kapan launch, dan apa saja yang memang jadi prioritas.",
    name: "Meyla Putri",
    role: "Owner, Kelas Menjahit Ibu Hebat",
  },
] as const;

export const faqs = [
  {
    question: "Apakah saya harus sudah punya semua isi kontennya?",
    answer:
      "Tidak harus. Kami bisa bantu menyusun struktur copy dasar dari hasil diskusi singkat tentang bisnis, layanan, dan target pelanggan kamu.",
  },
  {
    question: "Kalau saya sudah punya website lama, bisa dirombak?",
    answer:
      "Bisa. Biasanya kami audit dulu apa yang masih layak dipakai, lalu tentukan apakah lebih efisien redesign total atau bertahap.",
  },
  {
    question: "Apakah website ini bisa dikembangkan nanti?",
    answer:
      "Bisa. Fondasi project ini sudah cocok untuk berkembang ke form lead, katalog lebih lengkap, blog, sampai dashboard sederhana.",
  },
  {
    question: "Berapa lama proses pengerjaannya?",
    answer:
      "Tergantung scope, tapi landing page sederhana biasanya 1-2 minggu. Untuk website yang lebih lengkap, estimasinya kami jelaskan di awal.",
  },
] as const;
