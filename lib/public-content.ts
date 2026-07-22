import { asc, desc, eq, sql } from "drizzle-orm";
import { sanitizeRichTextHtml } from "@/lib/blog-content";
import { db } from "@/lib/db";
import {
  blogCategories as blogCategoriesTable,
  blogPosts as blogPostsTable,
  portfolioCategories,
  portfolios,
  pricings,
  services as servicesTable,
} from "@/lib/db/schema";
import {
  blogPagePosts,
  categories as marketplaceCategories,
  marketplacePricing,
  shopCreatives,
} from "@/lib/marketplace-data";
import { pricingPlans, portfolioItems, services as fallbackServices } from "@/lib/landing-data";
import { slugify } from "@/lib/slug";

const fallbackImages = [
  "/images/project-1.webp",
  "/images/project-2.webp",
  "/images/project-3.webp",
  "/images/project-4.webp",
  "/images/project-5.webp",
  "/images/project-6.webp",
  "/images/project-7.webp",
  "/images/project-8.webp",
] as const;

export type PublicCategoryCard = {
  title: string;
  description: string;
  countLabel?: string;
};

export type PublicCreativeCard = {
  name: string;
  category: string;
  description: string;
  price: string;
  image: string;
};

export type PortfolioCard = {
  id: string;
  slug: string;
  category: string;
  name: string;
  result: string;
  thumbnail?: string | null;
};

export type PortfolioDetail = PortfolioCard & {
  role: string | null;
  features: string[];
  gallery: string[];
};

export type PublicPricingPlan = {
  name: string;
  price: string;
  description: string;
  features: string[];
  featured: boolean;
};

export type PublicServiceCard = {
  title: string;
  description: string;
  price: string | null;
  icon: string | null;
};

export type PublicBlogCard = {
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  category: string;
  date: string;
};

export type PublicBlogCategory = {
  label: string;
  active?: boolean;
};

export type PublicBlogDetail = PublicBlogCard & {
  content: string;
  contentFormat?: "html";
  author?: string;
  tags?: string[];
};

function isMissingTableError(error: unknown) {
  if (typeof error !== "object" || !error || !("cause" in error)) {
    return false;
  }

  const cause = (error as { cause?: unknown }).cause;
  return typeof cause === "object" && cause !== null && "code" in cause && (cause as { code?: string }).code === "42P01";
}

function formatDate(date: Date | null) {
  if (!date) {
    return "";
  }

  return new Intl.DateTimeFormat("id-ID", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

function getFallbackImage(index: number) {
  return fallbackImages[index % fallbackImages.length];
}

export const fallbackBlogDetails: PublicBlogDetail[] = [
  {
    slug: "biaya-website-umkm-jogja",
    title: "Biaya Website UMKM Jogja: Kisaran Budget dan Prioritas Fitur Awal",
    excerpt: "Kalau kamu sedang hitung budget website UMKM di Jogja, fokus dulu ke tujuan bisnis dan fitur minimum yang benar-benar dipakai.",
    image: "/images/article-biaya-website.svg",
    category: "SEO Lokal",
    date: "July 10, 2026",
    content:
      "**Kenapa budget website UMKM bisa beda jauh**\n\nHarga website UMKM di Jogja biasanya tidak beda karena jumlah halaman saja. Perbedaan paling besar justru datang dari kejelasan tujuan bisnis, kualitas copy, kebutuhan desain, dan fitur yang diminta sejak awal.\n\nKalau tujuanmu hanya membuat bisnis terlihat lebih kredibel di Google dan WhatsApp, paket yang dibutuhkan jelas berbeda dibanding website yang harus punya katalog produk, form lead, blog, atau dashboard admin.\n\n**Prioritas fitur yang paling masuk akal untuk tahap awal**\n\n- Hero yang langsung menjelaskan layanan dan area kerja\n- Section layanan atau produk utama\n- CTA WhatsApp atau form inquiry yang jelas\n- Bukti kepercayaan seperti testimoni, portfolio, atau FAQ\n- Metadata, sitemap, canonical, dan struktur dasar SEO yang rapi\n\nUntuk banyak UMKM, kombinasi ini sudah cukup untuk mulai terlihat profesional dan menangkap lead tanpa harus langsung masuk fitur berat.\n\n**Kapan biaya mulai naik**\n\nBiaya biasanya naik saat project butuh desain lebih custom, penulisan konten lebih dalam, integrasi pihak ketiga, banyak halaman layanan, atau alur admin yang tidak standar. Jadi cara paling aman menghitung budget bukan mulai dari tampilan, tapi dari alur bisnis yang memang ingin dibantu website.\n\nKalau targetmu masih tahap validasi, lebih baik mulai dari scope ramping yang bisa launch cepat. Setelah traffic dan kebutuhan kebaca, baru tambahkan fitur berikutnya.",
  },
  {
    slug: "jasa-pembuatan-website-sleman",
    title: "Jasa Pembuatan Website Sleman: Checklist Sebelum Pilih Vendor",
    excerpt: "Sebelum pilih jasa pembuatan website di Sleman, cek dulu cara vendor memahami brief, struktur halaman, dan target bisnis kamu.",
    image: "/images/article-website-jawa.svg",
    category: "SEO Lokal",
    date: "July 9, 2026",
    content:
      "**Jangan pilih vendor dari visual saja**\n\nBanyak bisnis di Sleman, Jogja, dan sekitarnya memilih vendor website dari tampilan mockup pertama. Padahal hasil akhir website lebih banyak ditentukan oleh kualitas diskusi awal: siapa target pelanggan, layanan utama apa, dan CTA apa yang paling realistis untuk bisnis itu.\n\nVendor yang baik biasanya tidak langsung bicara warna dan animasi. Mereka akan mulai dari brief, struktur informasi, alur pengunjung, dan bukti apa yang perlu ditampilkan supaya calon pelanggan cepat percaya.\n\n**Checklist yang layak dicek sebelum deal**\n\n- Apakah vendor bertanya soal target pelanggan dan tujuan website\n- Apakah mereka bisa menjelaskan struktur halaman, bukan cuma desain\n- Apakah ada contoh project yang mirip dengan kebutuhanmu\n- Apakah revisi, timeline, dan deliverables dijelaskan sejak awal\n- Apakah mereka paham SEO dasar, mobile layout, dan CTA yang bisa dipakai jualan\n\nChecklist ini sederhana, tapi cukup untuk memisahkan vendor yang hanya pasang template dari partner yang benar-benar membantu bisnis.\n\n**Kalau bisnismu melayani area lokal**\n\nUntuk bisnis jasa di Sleman, website sebaiknya juga menyebut area kerja, jenis layanan, dan contoh kebutuhan lokal secara alami. Ini membantu dua hal sekaligus: pengunjung lebih merasa relevan, dan Google lebih gampang memahami konteks bisnis kamu.\n\nSemakin jelas konteks lokalnya, semakin mudah website dipakai untuk pencarian seperti jasa website Sleman, jasa website Jogja, atau website company profile untuk bisnis jasa lokal.",
  },
  {
    slug: "landing-page-iklan-umkm-jogja",
    title: "Landing Page Iklan untuk UMKM Jogja: Kapan Perlu Halaman Khusus?",
    excerpt: "Kalau UMKM Jogja mulai jalan iklan Meta Ads atau Google Ads, landing page khusus biasanya lebih efektif daripada mengirim traffic ke homepage.",
    image: "/images/article-landing-page-ads.svg",
    category: "SEO Lokal",
    date: "July 8, 2026",
    content:
      "**Kenapa homepage sering kurang cocok untuk traffic iklan**\n\nHomepage biasanya memuat terlalu banyak jalur: profil bisnis, layanan, portfolio, artikel, dan kontak. Untuk traffic iklan, ini sering terlalu lebar. Pengunjung datang dari satu janji iklan, tapi masuk ke halaman yang membahas terlalu banyak hal sekaligus.\n\nLanding page membantu menyempitkan fokus. Satu halaman cukup bicara satu penawaran, satu target pelanggan, dan satu CTA utama.\n\n**Tanda kamu sudah perlu landing page khusus**\n\n- Sudah mulai menjalankan Meta Ads atau Google Ads\n- Punya satu layanan yang ingin didorong lebih agresif\n- Ingin mengukur performa CTA, form, atau klik WhatsApp lebih jelas\n- Merasa homepage terlalu umum untuk campaign tertentu\n\nKalau salah satu dari empat poin ini sudah kejadian, landing page biasanya lebih masuk akal daripada terus memaksa homepage kerja sendirian.\n\n**Struktur minimum yang efektif untuk UMKM Jogja**\n\nLanding page iklan tidak harus panjang. Yang penting ada headline yang nyambung dengan isi iklan, penjelasan masalah pelanggan, manfaat utama, bukti sederhana, FAQ singkat, dan CTA yang jelas.\n\nUntuk bisnis lokal Jogja, kamu juga bisa menyebut konteks area layanan, jenis usaha yang dilayani, dan alur konsultasi singkat. Ini membantu pengunjung merasa halaman tersebut memang dibuat untuk kebutuhan mereka, bukan halaman generik yang dipakai ke semua campaign.",
  },
  {
    slug: "cara-memilih-template-website-yang-cocok-untuk-umkm",
    title: "Cara Memilih Template Website yang Cocok untuk UMKM",
    excerpt: "Panduan sederhana untuk memilih tampilan yang sesuai dengan jenis bisnis, tujuan, dan calon pelanggan kamu.",
    image: "/images/article-template-umkm.svg",
    category: "Tips Bisnis",
    date: "June 2, 2026",
    content:
      "Mulailah dari tujuan utama websitemu. Kalau fokusnya mengenalkan bisnis, kamu butuh struktur company profile yang rapi. Kalau fokusnya promosi, landing page dengan CTA yang jelas biasanya lebih efektif.\n\nSetelah itu, cek apakah template punya ruang yang cukup untuk menjelaskan layanan, hasil kerja, dan cara menghubungi kamu. Template yang bagus bukan cuma terlihat menarik, tapi juga membantu calon pelanggan cepat paham.\n\nPastikan juga tampilannya nyaman di mobile. Mayoritas pengunjung pertama datang dari handphone, jadi layout, ukuran teks, dan tombol WhatsApp perlu tetap enak dipakai di layar kecil.",
  },
  {
    slug: "kenapa-website-custom-bisa-jadi-investasi-yang-masuk-akal",
    title: "Kenapa Website Custom Bisa Jadi Investasi yang Masuk Akal",
    excerpt: "Kapan bisnis cukup pakai template, dan kapan perlu tampilan custom yang dibuat lebih spesifik.",
    image: "/images/article-custom-website.svg",
    category: "Studi Kasus",
    date: "May 28, 2026",
    content:
      "Template siap pakai cocok untuk bisnis yang ingin segera launch dengan struktur yang sudah jelas. Tapi saat kebutuhan mulai lebih spesifik, website custom sering jadi pilihan yang lebih masuk akal.\n\nCustom berarti isi, alur, dan tampilan bisa lebih dekat dengan cara bisnismu bekerja. Ini penting kalau kamu punya layanan yang perlu dijelaskan bertahap, katalog yang butuh filter tertentu, atau CTA yang harus disusun lebih strategis.\n\nInvestasi custom biasanya lebih terasa nilainya ketika website dipakai sebagai alat jualan, bukan sekadar pelengkap identitas bisnis.",
  },
  {
    slug: "strategi-sederhana-agar-website-lebih-banyak-menghasilkan-lead",
    title: "Strategi Sederhana agar Website Lebih Banyak Menghasilkan Lead",
    excerpt: "Mulai dari pesan utama, struktur halaman, sampai tombol WhatsApp yang lebih jelas untuk calon pelanggan.",
    image: "/images/article-lead-strategy.svg",
    category: "Digital Marketing",
    date: "May 24, 2026",
    content:
      "Kalau pengunjung datang tapi tidak menghubungi, biasanya ada yang kurang jelas di halaman utama. Bisa jadi headline terlalu umum, manfaat belum terasa, atau CTA kurang terlihat.\n\nCoba mulai dari tiga hal: headline yang spesifik, section layanan yang ringkas, dan tombol aksi yang konsisten. Jangan biarkan pengunjung menebak apa langkah berikutnya.\n\nTambahkan juga bukti pendukung seperti portfolio, testimoni, atau studi kasus singkat. Elemen-elemen ini membantu rasa percaya muncul lebih cepat sebelum orang memutuskan chat.",
  },
  {
    slug: "jasa-website-company-profile-umkm",
    title: "Jasa Website Company Profile UMKM: Apa Saja yang Perlu Ada?",
    excerpt: "Panduan isi website company profile UMKM agar bisnis terlihat jelas, dipercaya, dan mudah dihubungi calon pelanggan.",
    image: "/images/article-company-profile.svg",
    category: "Tips Bisnis",
    date: "June 12, 2026",
    content:
      "Website company profile untuk UMKM tidak perlu rumit. Yang penting, pengunjung bisa cepat paham siapa bisnisnya, apa layanannya, area kerja atau target pasarnya, dan bagaimana cara menghubungi tim penjualan.\n\nStruktur minimal yang efektif biasanya berisi hero yang spesifik, ringkasan layanan, keunggulan yang bisa dibuktikan, portfolio atau contoh kerja, testimoni, FAQ, dan tombol WhatsApp yang mudah ditemukan. Setiap bagian sebaiknya menjawab pertanyaan calon pelanggan, bukan hanya terlihat ramai.\n\nKalau tujuan utamanya mendapatkan lead, jangan sembunyikan CTA di bagian bawah saja. Ulangi ajakan konsultasi di beberapa titik penting supaya pengunjung yang sudah yakin bisa langsung bertindak.",
  },
  {
    slug: "jasa-landing-page-untuk-iklan",
    title: "Jasa Landing Page untuk Iklan: Kenapa Tidak Cukup Pakai Homepage?",
    excerpt: "Landing page membantu traffic iklan membaca satu penawaran dengan alur yang lebih fokus dan CTA yang lebih jelas.",
    image: "/images/article-landing-page-ads.svg",
    category: "Digital Marketing",
    date: "June 10, 2026",
    content: `## Klik iklan membutuhkan kelanjutan pesan

Iklan membentuk harapan sebelum pengunjung membuka halaman. Jika iklan menawarkan landing page untuk UMKM, halaman tujuan harus melanjutkan penawaran tersebut. Homepage yang menampilkan banyak layanan memaksa pengunjung mencari hubungan antara iklan dan kebutuhannya. Sebagian pengunjung akan menutup halaman sebelum menemukan jawabannya.

Gunakan headline yang menyebut penawaran, target pengguna, dan hasil yang dapat dipahami. Hindari klaim besar yang tidak memiliki bukti. Tampilkan informasi yang membantu pengunjung memutuskan apakah penawaran cocok sebelum meminta mereka menghubungi tim penjualan.

## Bagian yang wajib ada

Landing page perlu menjelaskan masalah pelanggan, cara penawaran menyelesaikannya, isi paket, bukti yang dapat diperiksa, proses, serta pertanyaan umum. CTA harus menyebut tindakan yang terjadi, misalnya “Minta estimasi via WhatsApp” atau “Kirim brief campaign”. Kata “klik di sini” tidak memberi konteks.

Bukti dapat berupa screenshot proyek, penjelasan scope, testimoni dengan izin, demo, atau informasi kepemilikan source code. Jika bisnis belum memiliki studi kasus publik, gunakan penjelasan proses dan contoh deliverable. Jangan membuat angka penjualan atau nama klien untuk mengisi ruang kosong.

## Data yang perlu dipantau

Pasang analytics sebelum campaign dimulai. Catat kunjungan halaman, klik CTA, form terkirim, dan percakapan WhatsApp yang dimulai. Conversion rate dihitung dari jumlah tindakan utama dibandingkan jumlah kunjungan. Angka ini perlu dibaca bersama kualitas lead dan biaya iklan.

Periksa juga kesesuaian perangkat. Campaign media sosial sering mendapat traffic ponsel, sehingga headline, form, dan CTA harus mudah digunakan pada layar kecil. Kecepatan halaman dan resource yang dapat dimuat crawler ikut memengaruhi pengalaman pengguna.

## Brief sebelum desain

- Penawaran dan harga atau cara mendapatkan estimasi.
- Sumber traffic yang akan digunakan.
- Target pelanggan dan area layanan.
- Bukti, foto, atau testimoni yang boleh dipublikasikan.
- Target tindakan dan cara tim menindaklanjuti lead.

kitangoding.id memakai brief tersebut untuk menyusun scope landing page, copy, CTA, dan kebutuhan tracking.`,
  },
  {
    slug: "biaya-pembuatan-website-umkm",
    title: "Biaya Pembuatan Website UMKM: Faktor yang Mempengaruhi Harga",
    excerpt: "Harga website UMKM dipengaruhi jumlah halaman, kebutuhan desain, fitur, konten, integrasi, dan dukungan setelah launch.",
    image: "/images/article-biaya-website.svg",
    category: "Tips Bisnis",
    date: "June 8, 2026",
    content: `## Mulai dari tujuan bisnis

Biaya website mengikuti pekerjaan yang harus diselesaikan. Website company profile membantu calon pelanggan memahami profil, layanan, lokasi, dan cara menghubungi bisnis. Landing page iklan membawa pengunjung menuju satu tindakan, seperti mengisi form atau membuka WhatsApp. Katalog online menampilkan produk dan membantu admin menerima order. Aplikasi web custom menangani alur kerja yang tidak dapat diselesaikan oleh halaman informasi biasa.

Tentukan hasil yang ingin dicapai sebelum menghitung halaman. Lima halaman dengan materi siap pakai dapat membutuhkan pekerjaan lebih sedikit daripada satu landing page yang memerlukan riset penawaran, penulisan copy, integrasi tracking, dan beberapa variasi CTA.

## Komponen yang membentuk biaya

Desain dan development hanya dua bagian dari pekerjaan. Vendor juga perlu menyusun struktur informasi, menyesuaikan copy, mengolah gambar, memasang form, menghubungkan WhatsApp, menyiapkan analytics, dan menguji tampilan di ponsel. Integrasi pembayaran, ongkir, akun pengguna, dashboard, atau API menambah waktu pengerjaan karena setiap alur perlu diuji.

Kesiapan konten ikut memengaruhi estimasi. Profil bisnis, daftar layanan, foto, logo, harga, dan bukti kerja yang sudah tersedia mengurangi putaran revisi. Proposal perlu menjelaskan jumlah revisi, domain, hosting, biaya perpanjangan, dukungan saat peluncuran, serta fitur yang tidak termasuk.

## Contoh pilihan berdasarkan kebutuhan

Harga yang tampil di kitangoding.id saat artikel ini diterbitkan dimulai dari Rp1.800.000 untuk landing page iklan dan Rp3.500.000 untuk website company profile. Website bisnis custom dan toko online memiliki biaya lebih tinggi karena halaman, pengelolaan data, serta integrasinya bertambah. Angka di halaman harga berfungsi sebagai titik awal. Tim tetap menulis scope dan estimasi final di proposal setelah brief dibahas.

Bisnis yang baru membangun kehadiran digital dapat memulai dari company profile dan tombol WhatsApp. Campaign berbayar membutuhkan landing page terpisah agar pesan iklan tetap konsisten. Toko dengan produk yang sering berubah perlu mempertimbangkan siapa yang memperbarui katalog setelah website diluncurkan.

## Checklist sebelum meminta estimasi

- Tujuan utama website dan tindakan yang diharapkan dari pengunjung.
- Jenis pelanggan yang ingin dijangkau.
- Daftar halaman, produk, atau fitur yang dibutuhkan.
- Materi yang sudah tersedia: logo, foto, profil, dan harga.
- Target waktu peluncuran dan kisaran anggaran.

Kirim lima informasi tersebut saat menghubungi kitangoding.id. Brief yang jelas membantu tim memberi pilihan scope yang masuk akal tanpa menambahkan fitur yang belum dibutuhkan.`,
  },
  {
    slug: "jasa-toko-online-untuk-umkm",
    title: "Jasa Toko Online untuk UMKM: Mulai dari Katalog atau Checkout?",
    excerpt: "Tidak semua UMKM perlu checkout penuh sejak awal. Kadang katalog produk dengan alur WhatsApp lebih cepat menghasilkan order.",
    image: "/images/article-toko-online-umkm.svg",
    category: "Web Development",
    date: "June 6, 2026",
    content: `## Katalog dan checkout menyelesaikan masalah berbeda

Katalog online membantu pelanggan melihat produk, variasi, harga, dan cara memesan. Order dapat diteruskan ke WhatsApp sehingga admin masih mengonfirmasi stok, ongkir, dan pembayaran. Model ini cocok untuk UMKM dengan jumlah produk terbatas atau proses order yang membutuhkan percakapan.

Checkout otomatis menangani keranjang, alamat, pembayaran, ongkir, status pesanan, dan notifikasi. Sistem ini mengurangi pekerjaan manual ketika volume order naik, tetapi membutuhkan pengaturan produk dan operasional yang lebih disiplin. Pemilik bisnis perlu menentukan siapa yang memperbarui stok, memproses pesanan, dan menangani kegagalan pembayaran.

## Mulai dari alur order yang terjadi sekarang

Catat perjalanan pelanggan dari menemukan produk sampai menerima pesanan. Periksa dari mana pelanggan datang, informasi apa yang mereka tanyakan, cara admin mengecek stok, metode pembayaran, pilihan pengiriman, dan layanan setelah pembelian. Website perlu mengikuti alur yang dapat dijalankan tim, bukan menyalin fitur marketplace tanpa kebutuhan.

Jika mayoritas pelanggan masih bertanya tentang ukuran atau custom order, katalog dengan WhatsApp dapat menjadi tahap awal. Jika produk memiliki harga dan stok yang pasti serta order datang setiap hari, checkout otomatis dapat mengurangi langkah admin.

## Hitung biaya operasional setelah peluncuran

Biaya toko online mencakup lebih dari pembuatan halaman. Payment gateway dapat mengenakan biaya transaksi. Integrasi kurir memerlukan konfigurasi asal pengiriman. Hosting perlu menangani traffic dan proses checkout. Tim juga harus memperbarui foto, harga, stok, voucher, dan laporan order.

Proposal perlu menyebut fitur, biaya tahunan, tanggung jawab pengelolaan, serta dukungan saat launch. Informasi ini membantu pemilik bisnis membandingkan biaya website dengan waktu admin yang dapat dihemat.

## Pilihan tahap awal

Tahap pertama dapat berupa katalog dan CTA WhatsApp. Tahap kedua menambahkan kategori, pencarian, serta pengelolaan produk. Checkout, pembayaran, ongkir, akun pelanggan, dan laporan dapat ditambahkan ketika volume transaksi membutuhkannya.

Diskusikan jumlah produk, variasi, alur stok, pembayaran, dan pengiriman dengan kitangoding.id. Tim dapat menyusun scope awal tanpa memaksa bisnis membeli sistem yang belum akan dipakai.`,
  },
  {
    slug: "website-bisnis-agar-mudah-ditemukan-google",
    title: "Agar Website Bisnis Mudah Ditemukan Google, Mulai dari Hal Ini",
    excerpt: "SEO teknis penting, tapi Google juga butuh halaman yang jelas membahas layanan, lokasi, masalah pelanggan, dan bukti bisnis.",
    image: "/images/article-google-discovery.svg",
    category: "Digital Marketing",
    date: "June 4, 2026",
    content:
      "Agar website bisnis mudah ditemukan Google, fondasi teknis seperti title, description, sitemap, robots, canonical, dan structured data memang perlu benar. Tapi setelah itu, yang menentukan adalah kualitas halaman dan relevansi konten.\n\nSetiap layanan penting sebaiknya punya halaman atau section yang menjelaskan masalah pelanggan, solusi yang ditawarkan, proses kerja, estimasi hasil, FAQ, dan cara menghubungi. Google lebih mudah memahami bisnis jika topiknya konsisten dan tidak terlalu umum.\n\nUntuk UMKM, konten lokal juga bisa membantu. Sebutkan area layanan, jenis bisnis yang dilayani, contoh kebutuhan, dan studi kasus sederhana. Artikel blog dapat dipakai untuk menjawab pertanyaan yang sering ditanyakan calon pelanggan sebelum membeli.",
  },
  {
    slug: "cara-membuat-website-bisnis-lebih-meyakinkan",
    title: "Cara Membuat Website Bisnis Lebih Meyakinkan untuk Calon Pelanggan",
    excerpt: "Kepercayaan muncul dari pesan yang jelas, bukti kerja, tampilan rapi, kecepatan halaman, dan jalur kontak yang tidak membingungkan.",
    image: "/images/article-website-trust.svg",
    category: "Strategi Branding",
    date: "June 1, 2026",
    content: `## Jelaskan bisnis dalam satu layar

Bagian pertama website harus membantu pengunjung menjawab empat pertanyaan: bisnis ini melayani siapa, menawarkan apa, beroperasi di mana, dan tindakan apa yang perlu dilakukan. Nama brand tanpa penjelasan layanan membuat pengunjung menebak. Headline perlu menyebut manfaat atau fungsi layanan dengan bahasa pelanggan.

Gunakan satu CTA utama. Bisnis jasa dapat memakai konsultasi WhatsApp atau form brief. Toko dapat memakai lihat katalog atau mulai order. Tampilkan CTA kedua hanya jika membantu orang yang belum siap menghubungi, seperti melihat portfolio atau daftar layanan.

## Tunjukkan bukti yang dapat diperiksa

Foto dan screenshot proyek membantu pengunjung menilai kualitas kerja. Sertakan jenis proyek, scope, peran tim, dan izin publikasi. Jika URL tidak dapat dibagikan, jelaskan batasannya. Testimoni perlu memakai nama dan konteks yang telah disetujui klien. Hindari angka peningkatan, logo, atau nama perusahaan yang tidak dapat diverifikasi.

Bukti proses juga berguna. Tampilkan tahapan brief, penyusunan konten, desain, development, revisi, dan launch. Calon klien dapat menilai cara kerja meski bisnis belum memiliki banyak studi kasus publik.

## Kurangi hambatan sebelum menghubungi

Pengunjung sering menunda karena tidak tahu kisaran biaya, waktu pengerjaan, jumlah revisi, atau kepemilikan hasil. Tampilkan harga awal atau cara menghitung estimasi. Jelaskan bahwa scope dan revisi ditulis di proposal. Sebutkan biaya perpanjangan domain dan hosting serta bantuan setelah peluncuran.

Gunakan kanal kontak yang aktif. Form perlu memberi tahu data yang dibutuhkan dan apa yang terjadi setelah dikirim. Tombol WhatsApp perlu membawa pesan awal yang relevan agar calon pelanggan tidak memulai dari halaman kosong.

## Jaga konsistensi identitas

Gunakan nama kitangoding.id secara konsisten pada title, description, structured data, website, profil sosial, dan komunikasi pelanggan. Samakan nomor telepon, email, area layanan, serta alamat publik yang memang boleh ditampilkan. Konsistensi membantu orang mengenali brand saat berpindah dari Google ke media sosial atau WhatsApp.

Perbarui Google Business Profile jika bisnis melayani pencarian lokal. Gunakan kategori, jam layanan, foto, dan tautan website yang sama dengan informasi di situs. kitangoding.id menerapkan prinsip ini pada halaman brand dan metadata agar pengunjung tidak menemukan identitas yang berbeda.`,
  },
  {
    slug: "perbedaan-website-company-profile-dan-landing-page",
    title: "Perbedaan Website Company Profile dan Landing Page untuk Bisnis",
    excerpt: "Dua jenis halaman ini sering dianggap sama, padahal tujuan, struktur, dan cara pakainya berbeda.",
    image: "/images/article-company-vs-landing.svg",
    category: "Tips Bisnis",
    date: "May 30, 2026",
    content: `## Company profile menjawab siapa bisnismu

Website company profile menjadi rujukan utama untuk orang yang mencari nama bisnis, menerima proposal, atau memperoleh rekomendasi dari pelanggan lain. Halamannya biasanya mencakup profil, layanan, proses kerja, portfolio, dan kontak. Pengunjung boleh berpindah halaman karena mereka sedang menilai kredibilitas dan kecocokan bisnis.

Konten company profile bersifat tahan lama. Tim dapat memperbarui layanan, anggota, atau proyek tanpa mengubah tujuan utamanya. Struktur ini cocok untuk UMKM, firma, agensi, produsen, dan bisnis jasa yang perlu terlihat jelas saat dicari di Google atau dibagikan melalui WhatsApp.

## Landing page mengarahkan satu tindakan

Landing page dibuat untuk satu penawaran dan satu sumber traffic. Pengunjung yang mengklik iklan paket tertentu harus menemukan headline, manfaat, bukti, harga atau cara mendapatkan estimasi, serta CTA yang sesuai dengan iklan tersebut. Navigasi dibuat lebih singkat agar perhatian tidak tersebar ke banyak layanan.

Halaman ini juga memerlukan tracking yang terukur. Tim dapat mencatat klik CTA, form yang terkirim, atau percakapan WhatsApp yang dimulai. Data tersebut membantu pemilik campaign membandingkan pesan dan penawaran. Tracking tidak menjamin penjualan, tetapi memberi dasar untuk menilai bagian yang perlu diperbaiki.

## Pilih berdasarkan sumber pengunjung

Pilih company profile jika pengunjung datang dari pencarian nama brand, referral, proposal, kartu nama, atau media sosial dan masih membutuhkan gambaran lengkap. Pilih landing page jika pengunjung datang dari Meta Ads, Google Ads, peluncuran produk, webinar, atau promo dengan tenggat waktu.

Contohnya, studio interior dapat memakai company profile untuk menjelaskan layanan dan portfolio. Saat menawarkan paket renovasi dapur melalui iklan, studio tersebut dapat membuat landing page khusus yang membahas paket, area layanan, contoh hasil, dan tombol konsultasi.

## Kapan keduanya dibutuhkan

Banyak bisnis memakai keduanya. Company profile membangun identitas utama, sedangkan landing page menangani campaign tertentu. Setiap landing page tetap dapat menautkan identitas brand dan kebijakan yang relevan agar pengunjung tahu siapa penyedia layanannya.

kitangoding.id menyediakan halaman layanan terpisah untuk website company profile dan landing page bisnis. Bandingkan tujuan, sumber pengunjung, dan tindakan yang ingin diukur sebelum memilih scope.`,
  },
  {
    slug: "berapa-lama-pembuatan-website-bisnis",
    title: "Berapa Lama Pembuatan Website Bisnis Biasanya Selesai?",
    excerpt: "Durasi pembuatan website dipengaruhi kejelasan brief, jumlah revisi, isi konten, dan fitur yang diminta.",
    image: "/images/article-project-timeline.svg",
    category: "Web Development",
    date: "May 27, 2026",
    content:
      "Website bisnis yang sederhana bisa selesai lebih cepat kalau arah desain, isi halaman, dan CTA sudah jelas sejak awal. Yang sering memperlambat justru bukan coding, tetapi revisi tanpa brief yang rapi, konten yang belum siap, atau perubahan scope di tengah jalan.\n\nProject company profile ringan biasanya lebih cepat daripada website custom dengan banyak alur, form, katalog, atau integrasi tambahan. Landing page campaign juga bisa relatif cepat kalau penawaran dan copy utamanya sudah matang.\n\nCara paling realistis untuk mempercepat proses adalah menyiapkan bahan dari awal: profil bisnis, layanan utama, foto, contoh referensi, dan tujuan halaman. Semakin jelas inputnya, semakin kecil risiko bolak-balik revisi.",
  },
  {
    slug: "konten-wajib-sebelum-bikin-website-umkm",
    title: "Konten Wajib yang Sebaiknya Disiapkan Sebelum Bikin Website UMKM",
    excerpt: "Website lebih cepat jadi kalau pemilik bisnis sudah menyiapkan isi inti sebelum masuk tahap desain.",
    image: "/images/article-konten-website.svg",
    category: "Tips Bisnis",
    date: "May 25, 2026",
    content:
      "Banyak project website tertahan karena desain mulai duluan, tapi isi utamanya belum siap. Padahal pengunjung datang untuk membaca informasi penting: bisnis ini jual apa, untuk siapa, apa keunggulannya, dan bagaimana cara menghubungi.\n\nKonten minimum yang sebaiknya disiapkan adalah ringkasan bisnis, daftar layanan atau produk, area layanan, testimoni atau bukti kerja, FAQ yang paling sering ditanya, dan CTA yang ingin dituju. Bahkan poin-poin sederhana sudah cukup untuk membantu struktur halaman.\n\nKalau konten dasarnya siap lebih awal, proses desain jadi lebih akurat. Tim tidak menebak-nebak isi halaman, dan revisi biasanya jauh lebih sedikit.",
  },
  {
    slug: "website-umkm-untuk-order-whatsapp",
    title: "Website UMKM untuk Order WhatsApp: Kapan Ini Sudah Cukup?",
    excerpt: "Tidak semua bisnis perlu checkout penuh. Untuk banyak UMKM, alur order lewat WhatsApp masih jadi langkah paling masuk akal.",
    image: "/images/article-whatsapp-order.svg",
    category: "Digital Marketing",
    date: "May 22, 2026",
    content:
      "Website dengan tombol order WhatsApp sering dianggap terlalu sederhana, padahal untuk banyak UMKM justru itu yang paling efektif. Pengunjung tetap bisa melihat produk, manfaat, harga, dan testimoni di website, lalu proses closing lanjut lewat chat.\n\nModel ini cocok ketika produk masih sering berubah, butuh konsultasi sebelum order, atau admin ingin tetap mengatur transaksi secara manual. Dibanding memaksa checkout penuh terlalu cepat, alur WhatsApp sering lebih ringan dan lebih cepat jalan.\n\nYang penting, struktur websitenya tetap rapi. Pengunjung harus paham produk apa yang dijual, kisaran harga, cara order, dan berapa lama responnya. Kalau ini jelas, WhatsApp bisa jadi CTA yang sangat kuat.",
  },
  {
    slug: "partner-website-bisnis-area-jawa",
    title: "Partner Website Bisnis untuk Area Jawa: Hal yang Perlu Dicek",
    excerpt: "Kalau bisnis kamu melayani Jogja, Solo, Wonogiri, dan area Jawa lain, pilih partner website yang paham kebutuhan bisnis lokal.",
    image: "/images/article-website-jawa.svg",
    category: "Studi Kasus",
    date: "May 19, 2026",
    content:
      "Kalau bisnis kamu menjangkau Jogja, Solo, Wonogiri, atau area Jawa lain, partner website yang dipilih sebaiknya tidak cuma menjual visual. Yang lebih penting adalah apakah mereka paham kebutuhan bisnis lokal, bisa menunjukkan contoh hasil kerja, dan punya proses yang jelas dari brief sampai launch.\n\nPerhatikan cara mereka bertanya saat awal diskusi. Tim yang baik biasanya tidak langsung bicara desain saja, tapi juga menanyakan target pelanggan, tujuan website, CTA utama, dan alur komunikasi setelah website online.\n\nKalau targetnya website yang dipakai untuk promosi serius, pilih partner yang bisa membantu struktur halaman, bukan hanya memasang template. Hasil akhir website sangat dipengaruhi kualitas diskusi di awal.",
  },
  {
    slug: "seo-lokal-website-umkm",
    title: "SEO Lokal untuk Website UMKM: Langkah Dasar yang Paling Efektif",
    excerpt: "SEO lokal membantu website UMKM lebih relevan untuk calon pelanggan di area layanan tertentu.",
    image: "/images/article-seo-lokal.svg",
    category: "Digital Marketing",
    date: "May 16, 2026",
    content:
      "SEO lokal penting kalau bisnis kamu melayani area tertentu seperti kota, kabupaten, atau wilayah layanan spesifik. Google perlu sinyal yang jelas tentang lokasi, jenis layanan, dan siapa target pelanggan di area itu.\n\nLangkah dasarnya adalah menulis halaman layanan yang menyebut konteks lokal secara alami, menampilkan alamat atau area layanan, menyamakan data kontak di website, dan menyiapkan konten yang menjawab kebutuhan pelanggan lokal. Kombinasi ini membantu Google memahami relevansi bisnis.\n\nKalau ada Google Business Profile, website dan profil bisnis sebaiknya saling mendukung. Halaman layanan, kontak, dan CTA lokal harus konsisten supaya sinyal brand dan lokasi lebih kuat.",
  },
];

function getPriceOrderValue(price: string) {
  const normalized = price.toLowerCase().replace(/\s+/g, "");
  const numericPart = normalized.match(/(\d+(?:[.,]\d+)?)/)?.[1];

  if (!numericPart) {
    return Number.POSITIVE_INFINITY;
  }

  const amount = Number.parseFloat(numericPart.replace(",", "."));

  if (Number.isNaN(amount)) {
    return Number.POSITIVE_INFINITY;
  }

  if (normalized.includes("jt")) {
    return amount * 1_000_000;
  }

  if (normalized.includes("rb")) {
    return amount * 1_000;
  }

  return amount;
}

export function normalizePublicPricingPlans<T extends PublicPricingPlan>(plans: T[]) {
  const sortedPlans = [...plans].sort((left, right) => {
    const leftPrice = getPriceOrderValue(left.price);
    const rightPrice = getPriceOrderValue(right.price);

    if (leftPrice !== rightPrice) {
      return leftPrice - rightPrice;
    }

    return left.name.localeCompare(right.name);
  });

  let hasFeaturedPlan = false;

  return sortedPlans.map((plan) => {
    const featured = plan.featured && !hasFeaturedPlan;
    hasFeaturedPlan ||= featured;

    return featured === plan.featured ? plan : { ...plan, featured };
  });
}

const fallbackServiceDescriptions = new Map<string, string>(
  fallbackServices.map((service) => [service.title, service.description] as const)
);

export function mapPublicServices(
  rows: Array<{
    title: string;
    description: string | null;
    price: string | null;
    icon: string | null;
  }>
): PublicServiceCard[] {
  return rows.map((item) => ({
    title: item.title,
    description:
      item.description?.trim() ||
      fallbackServiceDescriptions.get(item.title) ||
      "Website service yang bisa disesuaikan dengan kebutuhan bisnis kamu.",
    price: item.price,
    icon: item.icon,
  }));
}

export async function getPublicCategories(limit = 4): Promise<PublicCategoryCard[]> {
  const fallbackItems = marketplaceCategories.map((item) => ({
    title: item.title,
    description: item.description,
  }));

  try {
    const [categoryRows, portfolioRows] = await Promise.all([
      db.select().from(portfolioCategories).orderBy(portfolioCategories.name),
      db.select({ categoryId: portfolios.categoryId }).from(portfolios),
    ]);

    if (categoryRows.length > 0) {
      const counts = portfolioRows.reduce<Record<string, number>>((accumulator, item) => {
        if (item.categoryId) {
          accumulator[item.categoryId] = (accumulator[item.categoryId] || 0) + 1;
        }
        return accumulator;
      }, {});

      const databaseItems = categoryRows.map((item) => {
        const count = counts[item.id] || 0;
        return {
          title: item.name,
          description:
            count > 0
              ? `${count} project siap dijadikan referensi untuk kategori ${item.name.toLowerCase()}.`
              : `Kategori ${item.name} siap dipakai untuk mengelompokkan project dan inspirasi bisnis.`,
          countLabel: `${count} project`,
        };
      });

      const mergedItems: PublicCategoryCard[] = [...databaseItems];

      for (const fallbackItem of fallbackItems) {
        if (mergedItems.length >= limit) {
          break;
        }

        if (!mergedItems.some((item) => item.title === fallbackItem.title)) {
          mergedItems.push(fallbackItem);
        }
      }

      return mergedItems.slice(0, limit);
    }
  } catch (error) {
    if (!isMissingTableError(error)) {
      console.warn("Failed to load public categories.", error);
    }
  }

  return fallbackItems.slice(0, limit);
}

export async function getPublicCreatives(limit?: number): Promise<PublicCreativeCard[]> {
  try {
    const portfolioRows = await db
      .select({
        name: portfolios.name,
        thumbnail: portfolios.thumbnail,
        result: portfolios.result,
        categoryName: portfolioCategories.name,
      })
      .from(portfolios)
      .leftJoin(portfolioCategories, eq(portfolios.categoryId, portfolioCategories.id))
      .orderBy(desc(portfolios.createdAt));

    if (portfolioRows.length > 0) {
      const items = portfolioRows.map((item, index) => ({
        name: item.name,
        category: item.categoryName || "Website Project",
        description: item.result || "Project website yang siap disesuaikan dengan kebutuhan bisnismu.",
        price: "By Brief",
        image: item.thumbnail || getFallbackImage(index),
      }));

      return typeof limit === "number" ? items.slice(0, limit) : items;
    }
  } catch (error) {
    if (!isMissingTableError(error)) {
      console.warn("Failed to load public creatives.", error);
    }
  }

  const fallback = typeof limit === "number" ? shopCreatives.slice(0, limit) : shopCreatives;
  return fallback.map((item) => ({
    name: item.name,
    category: item.category,
    description: item.description,
    price: item.price,
    image: item.image,
  }));
}

export async function getPublicServices(limit?: number): Promise<PublicServiceCard[]> {
  try {
    const rows = await db
      .select({
        title: servicesTable.title,
        description: servicesTable.description,
        price: servicesTable.price,
        icon: servicesTable.icon,
      })
      .from(servicesTable)
      .orderBy(asc(servicesTable.createdAt));

    if (rows.length > 0) {
      const items = mapPublicServices(rows);
      return typeof limit === "number" ? items.slice(0, limit) : items;
    }
  } catch (error) {
    if (!isMissingTableError(error)) {
      console.warn("Failed to load public services.", error);
    }
  }

  const fallback = fallbackServices.map((item) => ({
    title: item.title,
    description: item.description,
    price: null,
    icon: null,
  }));

  return typeof limit === "number" ? fallback.slice(0, limit) : fallback;
}

export async function getPublicPricing(): Promise<PublicPricingPlan[]> {
  try {
    const pricingRows = await db.select().from(pricings).orderBy(desc(pricings.isFeatured), desc(pricings.createdAt));

    if (pricingRows.length > 0) {
      return normalizePublicPricingPlans(pricingRows.map((item) => ({
        name: item.name,
        price: item.price,
        description: item.description || "Paket website yang bisa disesuaikan dengan kebutuhan bisnis kamu.",
        features: Array.isArray(item.features) ? item.features : [],
        featured: item.isFeatured,
      })));
    }
  } catch (error) {
    if (!isMissingTableError(error)) {
      console.warn("Failed to load public pricing.", error);
    }
  }

  return normalizePublicPricingPlans(pricingPlans.map((item) => ({
    name: item.name,
    price: item.price,
    description: item.description,
    features: [...item.features],
    featured: item.featured,
  })));
}

export async function getHomepagePricing(): Promise<PublicPricingPlan[]> {
  const pricing = await getPublicPricing();

  if (pricing.length >= 2) {
    return pricing.slice(0, 2);
  }

  return marketplacePricing.map((item) => ({
    name: item.name,
    price: item.price,
    description: item.description,
    features: [...item.features],
    featured: item.note.length > 0,
  }));
}

export async function getPublicBlogPosts(limit?: number): Promise<PublicBlogCard[]> {
  const fallbackItems = fallbackBlogDetails.map((item) => ({
    slug: item.slug,
    title: item.title,
    excerpt: item.excerpt,
    image: item.image,
    category: item.category,
    date: item.date,
  }));

  try {
    const rows = await db
      .select()
      .from(blogPostsTable)
      .where(eq(blogPostsTable.status, "published"))
      .orderBy(desc(blogPostsTable.publishedAt), desc(blogPostsTable.createdAt));

    if (rows.length > 0) {
      const databaseItems = rows.map((item, index) => ({
        slug: item.slug,
        title: item.title,
        excerpt: item.excerpt || "Insight praktis untuk membantu website bisnis tampil lebih meyakinkan.",
        image: item.thumbnail || getFallbackImage(index + 2),
        category: item.category,
        date: formatDate(item.publishedAt || item.createdAt),
      }));

      return typeof limit === "number" ? databaseItems.slice(0, limit) : databaseItems;
    }
  } catch (error) {
    if (!isMissingTableError(error)) {
      console.warn("Failed to load public blog posts.", error);
    }
  }

  return typeof limit === "number" ? fallbackItems.slice(0, limit) : fallbackItems;
}

export async function getPublicBlogCategories(): Promise<PublicBlogCategory[]> {
  try {
    const [rows, publishedPosts] = await Promise.all([
      db.select().from(blogCategoriesTable).orderBy(blogCategoriesTable.name),
      db
        .select({ category: blogPostsTable.category })
        .from(blogPostsTable)
        .where(eq(blogPostsTable.status, "published")),
    ]);
    const labels = [...rows.map((item) => item.name), ...publishedPosts.map((item) => item.category)]
      .filter((item, index, array) => array.indexOf(item) === index);

    if (labels.length > 0) {
      return [
        { label: "Semua Artikel", active: true },
        ...labels.map((label) => ({
          label,
        })),
      ];
    }
  } catch (error) {
    if (!isMissingTableError(error)) {
      console.warn("Failed to load public blog categories.", error);
    }
  }

  return [
    { label: "Semua Artikel", active: true },
    ...blogPagePosts.map((item) => ({ label: item.category })),
  ].filter((item, index, array) => array.findIndex((entry) => entry.label === item.label) === index);
}

export async function getPublicBlogPostBySlug(slug: string): Promise<PublicBlogDetail | null> {
  try {
    const [post] = await db
      .select()
      .from(blogPostsTable)
      .where(eq(blogPostsTable.slug, slug))
      .limit(1);

    if (post && post.status === "published") {
      return {
        slug: post.slug,
        title: post.title,
        excerpt: post.excerpt || "Insight praktis untuk membantu website bisnis tampil lebih meyakinkan.",
        image: post.thumbnail || getFallbackImage(0),
        category: post.category,
        date: formatDate(post.publishedAt || post.createdAt),
        content: sanitizeRichTextHtml(post.content || post.excerpt || "Konten artikel akan segera hadir."),
        contentFormat: "html",
        author: post.author,
        tags: post.tags,
      };
    }
  } catch (error) {
    if (!isMissingTableError(error)) {
      console.warn("Failed to load public blog detail.", error);
    }
  }

  return fallbackBlogDetails.find((item) => item.slug === slug) ?? null;
}

export async function getPortfolioProjects(limit?: number): Promise<PortfolioCard[]> {
  try {
    const query = db
      .select({
        id: portfolios.id,
        slug: portfolios.slug,
        name: portfolios.name,
        result: portfolios.result,
        thumbnailHash: sql<string | null>`md5(nullif(${portfolios.thumbnail}, ''))`,
        categoryName: portfolioCategories.name,
      })
      .from(portfolios)
      .leftJoin(portfolioCategories, eq(portfolios.categoryId, portfolioCategories.id))
      .orderBy(desc(portfolios.createdAt));
    const rows = typeof limit === "number" ? await query.limit(limit) : await query;

    if (rows.length > 0) {
      const items: PortfolioCard[] = rows.map((item) => ({
        id: item.id,
        slug: item.slug,
        category: item.categoryName || "Tanpa Kategori",
        name: item.name,
        result: item.result || "Portfolio project",
        thumbnail: item.thumbnailHash
          ? `/api/portfolio-images/${encodeURIComponent(item.id)}/thumbnail/${item.thumbnailHash}`
          : null,
      }));
      return items;
    }
  } catch (error) {
    if (!isMissingTableError(error)) {
      console.warn("Failed to load portfolio projects.", error);
    }
  }

  const fallback: PortfolioCard[] = portfolioItems.map((item, index) => ({
    id: `fallback-${index}`,
    slug: slugify(item.name),
    category: item.category,
    name: item.name,
    result: item.result,
    thumbnail: null,
  }));
  return typeof limit === "number" ? fallback.slice(0, limit) : fallback;
}

export async function getPortfolioProjectBySlug(slug: string): Promise<PortfolioDetail | null> {
  try {
    const [item] = await db
      .select({
        id: portfolios.id,
        slug: portfolios.slug,
        name: portfolios.name,
        result: portfolios.result,
        role: portfolios.role,
        features: portfolios.features,
        thumbnailHash: sql<string | null>`md5(nullif(${portfolios.thumbnail}, ''))`,
        galleryHash0: sql<string | null>`md5(nullif((${portfolios.gallery})[1], ''))`,
        galleryHash1: sql<string | null>`md5(nullif((${portfolios.gallery})[2], ''))`,
        categoryName: portfolioCategories.name,
      })
      .from(portfolios)
      .leftJoin(portfolioCategories, eq(portfolios.categoryId, portfolioCategories.id))
      .where(eq(portfolios.slug, slug))
      .limit(1);

    if (item) {
      return {
        id: item.id,
        slug: item.slug,
        category: item.categoryName || "Tanpa Kategori",
        name: item.name,
        result: item.result || "Portfolio project",
        role: item.role,
        features: item.features,
        gallery: [item.galleryHash0, item.galleryHash1].flatMap((hash, index) =>
          hash ? [`/api/portfolio-images/${encodeURIComponent(item.id)}/gallery-${index}/${hash}`] : [],
        ),
        thumbnail: item.thumbnailHash
          ? `/api/portfolio-images/${encodeURIComponent(item.id)}/thumbnail/${item.thumbnailHash}`
          : null,
      };
    }
  } catch (error) {
    if (!isMissingTableError(error)) {
      console.warn("Failed to load public portfolio detail.", error);
    }
  }

  const index = portfolioItems.findIndex((item) => slugify(item.name) === slug);
  const item = portfolioItems[index];

  return item
    ? {
        id: `fallback-${index}`,
        slug,
        category: item.category,
        name: item.name,
        result: item.result,
        role: null,
        features: [],
        gallery: [],
        thumbnail: null,
      }
    : null;
}
