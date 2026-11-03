import { serializeJsonLd } from "@/lib/seo";
import studio from "@/components/marketing/Studio.module.css";
import type { Metadata } from "next";
import { cache } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { notFound } from "next/navigation";
import { BlogListing } from "@/components/marketing/pages/BlogListing";
import styles from "@/components/marketing/pages/Blog.module.css";
import { getBlogAuthorName } from "@/features/blog/authors";
import { StudioProjectCta, StudioHeader, StudioFooter } from "@/components/marketing/sections/StudioChrome";
import { getPublicBlogPostBySlug, getPublicBlogPosts } from "@/features/blog/queries";
import { siteConfig } from "@/lib/site";

type Props = {
  params: Promise<{ slug: string }>;
};

const getCachedBlogPost = cache(getPublicBlogPostBySlug);

const relatedServiceLinksBySlug: Record<string, Array<{ href: string; label: string; description: string }>> = {
  "biaya-website-umkm-jogja": [
    {
      href: "/pricing",
      label: "Cek paket dan kisaran harga",
      description: "Lihat scope awal yang paling realistis untuk company profile, landing page, atau toko online.",
    },
    {
      href: "/project-inquiry",
      label: "Kirim brief project",
      description: "Kalau butuh estimasi yang lebih akurat berdasarkan kebutuhan bisnismu.",
    },
  ],
  "jasa-pembuatan-website-sleman": [
    {
      href: "/jasa-website-company-profile",
      label: "Jasa website company profile",
      description: "Cocok untuk bisnis jasa lokal yang butuh profil usaha yang lebih rapi dan meyakinkan.",
    },
    {
      href: "/contact",
      label: "Hubungi tim Kitangoding",
      description: "Untuk tanya alur kerja, timeline, dan scope yang paling masuk akal lebih dulu.",
    },
  ],
  "landing-page-iklan-umkm-jogja": [
    {
      href: "/jasa-landing-page-bisnis",
      label: "Lihat layanan landing page bisnis",
      description: "Untuk campaign iklan yang butuh satu halaman fokus konversi dan CTA lebih jelas.",
    },
    {
      href: "/project-inquiry",
      label: "Konsultasi campaign landing page",
      description: "Kalau kamu sudah punya iklan aktif dan butuh halaman tujuan yang lebih relevan.",
    },
  ],
  "jasa-website-company-profile-umkm": [
    {
      href: "/jasa-website-company-profile",
      label: "Jasa website company profile",
      description: "Halaman layanan untuk bisnis yang butuh profil perusahaan yang rapi dan meyakinkan.",
    },
  ],
  "jasa-landing-page-untuk-iklan": [
    {
      href: "/jasa-landing-page-bisnis",
      label: "Jasa landing page bisnis",
      description: "Cocok untuk campaign iklan, promo, dan halaman fokus konversi.",
    },
  ],
  "jasa-toko-online-untuk-umkm": [
    {
      href: "/jasa-toko-online-umkm",
      label: "Jasa toko online UMKM",
      description: "Untuk katalog produk dan alur order yang lebih rapi dari media sosial saja.",
    },
  ],
  "perbedaan-website-company-profile-dan-landing-page": [
    {
      href: "/jasa-website-company-profile",
      label: "Lihat company profile",
      description: "Kalau kebutuhanmu fokus ke kredibilitas brand dan profil usaha.",
    },
    {
      href: "/jasa-landing-page-bisnis",
      label: "Lihat landing page bisnis",
      description: "Kalau kebutuhanmu fokus ke campaign dan CTA yang lebih tajam.",
    },
  ],
  "website-umkm-untuk-order-whatsapp": [
    {
      href: "/jasa-toko-online-umkm",
      label: "Lihat solusi toko online UMKM",
      description: "Relevan untuk katalog ringan dengan CTA order ke WhatsApp.",
    },
  ],
  "biaya-pembuatan-website-umkm": [
    {
      href: "/pricing",
      label: "Cek kisaran harga",
      description: "Untuk lihat paket awal dan scope yang paling masuk akal.",
    },
  ],
};

function stripInlineMarkdown(text: string) {
  return text
    .replace(/\*\*(.*?)\*\*/g, "$1")
    .replace(/\*(.*?)\*/g, "$1")
    .trim();
}

function toIsoDate(value: string) {
  const date = new Date(value);

  return Number.isNaN(date.getTime()) ? undefined : date.toISOString();
}

function renderContent(content: string) {
  const blocks = content
    .split(/\n{2,}/)
    .map((block) => block.trim())
    .filter(Boolean);

  return blocks.map((block, index) => {
    const lines = block.split("\n").map((line) => line.trim()).filter(Boolean);

    if (lines.length === 1 && /^##\s+/.test(lines[0])) {
      return (
        <h2 key={`${index}-${lines[0]}`} className="text-2xl font-extrabold text-black">
          {stripInlineMarkdown(lines[0].replace(/^##\s+/, ""))}
        </h2>
      );
    }

    if (lines.length === 1 && /^\*\*(.+)\*\*$/.test(lines[0])) {
      return (
        <h2 key={`${index}-${lines[0]}`} className="text-2xl font-extrabold text-black">
          {stripInlineMarkdown(lines[0])}
        </h2>
      );
    }

    if (lines.every((line) => /^(\d+\.|-)\s+/.test(line))) {
      const isOrdered = lines.every((line) => /^\d+\.\s+/.test(line));
      const ListTag = isOrdered ? "ol" : "ul";

      return (
        <ListTag
          key={`${index}-${lines[0]}`}
          className={isOrdered ? "space-y-3 pl-6 list-decimal" : "space-y-3 pl-6 list-disc"}
        >
          {lines.map((line) => (
            <li key={line} className="leading-8 text-body">
              {stripInlineMarkdown(line.replace(/^(\d+\.|-)\s+/, ""))}
            </li>
          ))}
        </ListTag>
      );
    }

    return (
      <p key={`${index}-${lines[0]}`} className="leading-8 text-body">
        {stripInlineMarkdown(lines.join(" "))}
      </p>
    );
  });
}

export async function generateStaticParams() {
  const posts = await getPublicBlogPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getCachedBlogPost(slug);

  if (!post) {
    return {
      title: "Artikel Tidak Ditemukan",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const postImageUrl = post.image.startsWith("http")
    ? post.image
    : new URL(post.image, siteConfig.domain).toString();
  const description = `${post.excerpt} Baca panduan lengkapnya di ${siteConfig.name}.`;

  return {
    title: {
      absolute: `${post.title} | ${siteConfig.name}`,
    },
    description,
    keywords: [siteConfig.name, "Kita Ngoding", post.category, post.title],
    alternates: {
      canonical: `${siteConfig.domain}/blog/${post.slug}`,
    },
    openGraph: {
      title: `${post.title} | ${siteConfig.name}`,
      description,
      url: `${siteConfig.domain}/blog/${post.slug}`,
      type: "article",
      publishedTime: post.publishedAt || toIsoDate(post.date),
      modifiedTime: post.modifiedAt,
      authors: [getBlogAuthorName(post.author)],
      section: post.category,
      tags: post.tags,
      images: [
        {
          url: postImageUrl,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${post.title} | ${siteConfig.name}`,
      description,
      images: [postImageUrl],
    },
  };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const post = await getCachedBlogPost(slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = (await getPublicBlogPosts())
    .filter((item) => item.slug !== post.slug)
    .slice(0, 3);
  const relatedServiceLinks = relatedServiceLinksBySlug[post.slug] ?? [];
  const postImageUrl = post.image.startsWith("http")
    ? post.image
    : new URL(post.image, siteConfig.domain).toString();
  const publishedAt = post.publishedAt || toIsoDate(post.date);
  const author = getBlogAuthorName(post.author);
  const isTeam = author === siteConfig.name || author.startsWith("Tim ");
  const tags = post.tags || [];

  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: siteConfig.domain,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Blog",
          item: `${siteConfig.domain}/blog`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: post.title,
          item: `${siteConfig.domain}/blog/${post.slug}`,
        },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: post.title,
      description: post.excerpt,
      image: [postImageUrl],
      articleSection: post.category,
      ...(tags.length > 0 ? { keywords: tags.join(", ") } : {}),
      ...(publishedAt ? { datePublished: publishedAt } : {}),
      ...(post.modifiedAt ? { dateModified: post.modifiedAt } : {}),
      author: {
        "@type": isTeam ? "Organization" : "Person",
        name: author,
        ...(isTeam ? { url: `${siteConfig.domain}/tentang` } : {}),
      },
      publisher: {
        "@type": "Organization",
        name: siteConfig.name,
        url: siteConfig.domain,
        logo: { "@type": "ImageObject", url: `${siteConfig.domain}/logo-kitangoding.webp` },
      },
      mainEntityOfPage: `${siteConfig.domain}/blog/${post.slug}`,
    },
  ];

  return (
    <>
    <script
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(structuredData) }}
        type="application/ld+json"
      />
      <div className={studio.root}>
        <StudioHeader />
        <main id="konten">
          <article className={styles.articlePage}>
            <Link className={styles.back} href="/blog"><ArrowLeft size={16} aria-hidden="true" />Kembali ke blog</Link>
            <header className={styles.articleHeader}>
              <div className={styles.articleMeta}>
                <span><i aria-hidden="true" />{post.category} / <time dateTime={publishedAt}>{post.date}</time></span>
                <span>Oleh {isTeam ? <Link href="/tentang">{author}</Link> : author}</span>
              </div>
              <h1>{post.title}</h1>
            </header>
            <div className={styles.articleCover}>
              <Image alt={post.title} fill priority sizes="(max-width: 700px) 90vw, 1200px" src={post.image} />
            </div>
            {post.contentFormat === "html" ? (
              <div className={`rich-blog-content ${styles.body}`} dangerouslySetInnerHTML={{ __html: post.content }} />
            ) : <div className={styles.body}>{renderContent(post.content)}</div>}
            {tags.length > 0 && <div className={styles.tags}>{tags.map(tag => <span key={tag}>#{tag}</span>)}</div>}
            {relatedServiceLinks.length > 0 && <nav className={styles.serviceLinks} aria-label="Layanan terkait">
              {relatedServiceLinks.map(item => <Link href={item.href} key={item.href} title={item.description} data-analytics-event="blog_cta_click" data-analytics-label={item.label}>{item.label}<ArrowUpRight size={16} aria-hidden="true" /></Link>)}
            </nav>}
          </article>
          {relatedPosts.length > 0 && <section className={styles.related}>
            <h2>Artikel berikutnya.</h2>
            <BlogListing posts={relatedPosts} categories={[]} />
          </section>}
          <StudioProjectCta />
        </main>
        <StudioFooter />
      </div>
    </>
  );
}
