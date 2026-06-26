import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Newspaper } from "lucide-react";
import { notFound } from "next/navigation";
import { connection } from "next/server";
import { ButtonLink } from "@/components/atoms/Button";
import { Reveal } from "@/components/atoms/Reveal";
import { CustomProjectCta, FloatingNav, MarketplaceFooter } from "@/components/organisms/MarketplaceShell";
import { getPublicBlogPostBySlug, getPublicBlogPosts } from "@/lib/public-content";
import { siteConfig } from "@/lib/site";

type Props = {
  params: Promise<{ slug: string }>;
};

function stripInlineMarkdown(text: string) {
  return text
    .replace(/\*\*(.*?)\*\*/g, "$1")
    .replace(/\*(.*?)\*/g, "$1")
    .trim();
}

function renderContent(content: string) {
  const blocks = content
    .split(/\n{2,}/)
    .map((block) => block.trim())
    .filter(Boolean);

  return blocks.map((block, index) => {
    const lines = block.split("\n").map((line) => line.trim()).filter(Boolean);

    if (lines.length === 1 && /^\*\*(.+)\*\*$/.test(lines[0])) {
      return (
        <h2 key={`${index}-${lines[0]}`} className="text-2xl font-extrabold text-foreground">
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

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPublicBlogPostBySlug(slug);

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

  return {
    title: `${post.title} | Blog Kita Ngoding`,
    description: post.excerpt,
    alternates: {
      canonical: `${siteConfig.domain}/blog/${post.slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `${siteConfig.domain}/blog/${post.slug}`,
      type: "article",
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
      title: post.title,
      description: post.excerpt,
      images: [postImageUrl],
    },
  };
}

export default async function Page({ params }: Props) {
  await connection();

  const { slug } = await params;
  const post = await getPublicBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = (await getPublicBlogPosts())
    .filter((item) => item.slug !== post.slug)
    .slice(0, 3);
  const postImageUrl = post.image.startsWith("http")
    ? post.image
    : new URL(post.image, siteConfig.domain).toString();

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
      author: {
        "@type": "Organization",
        name: siteConfig.name,
      },
      publisher: {
        "@type": "Organization",
        name: siteConfig.name,
        url: siteConfig.domain,
      },
      mainEntityOfPage: `${siteConfig.domain}/blog/${post.slug}`,
    },
  ];

  return (
    <>
    <script
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        type="application/ld+json"
      />
      <div className="marketplace-page min-h-screen bg-market text-foreground">
        <FloatingNav />
        <main id="konten">
          <section className="marketplace-grid pt-24 pb-12">
            <div className="container-shell">
              <Reveal>
                <Link
                  className="inline-flex items-center gap-2 text-sm font-semibold text-body transition hover:text-success"
                  href="/blog"
                >
                  <ArrowLeft aria-hidden="true" className="size-4" />
                  Kembali ke blog
                </Link>
                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <span className="inline-flex items-center gap-2 rounded-lg border border-success/20 bg-white/80 px-3 py-2 text-sm font-semibold text-success shadow-sm">
                    <Newspaper aria-hidden="true" className="size-3.5" />
                    {post.category}
                  </span>
                  <span className="text-sm font-medium text-body/75">{post.date}</span>
                </div>
                <h1 className="mt-6 max-w-4xl text-4xl leading-tight font-extrabold text-foreground md:text-6xl">
                  {post.title}
                </h1>
                <p className="mt-5 max-w-3xl text-lg leading-8 text-muted">
                  {post.excerpt}
                </p>
              </Reveal>
            </div>
          </section>

          <section className="marketplace-grid pb-20">
            <div className="container-shell grid gap-10 lg:grid-cols-[minmax(0,1fr)_320px]">
              <Reveal>
                <article className="overflow-hidden rounded-[2rem] border border-border bg-white shadow-card">
                  <div className="relative aspect-[16/9] w-full overflow-hidden bg-surface">
                    <Image
                      alt={post.title}
                      className="object-cover"
                      fill
                      priority
                      sizes="(max-width: 1024px) 100vw, 900px"
                      src={post.image}
                    />
                  </div>
                  <div className="space-y-6 p-8 md:p-10">{renderContent(post.content)}</div>
                </article>
              </Reveal>

              <Reveal delay={0.08}>
                <aside className="space-y-6">
                  <div className="rounded-[2rem] border border-border bg-white p-6 shadow-card">
                    <p className="text-sm font-bold uppercase tracking-[0.18em] text-success">
                      Artikel Lainnya
                    </p>
                    <div className="mt-5 space-y-5">
                      {relatedPosts.map((item) => (
                        <Link
                          key={item.slug}
                          className="group block rounded-2xl border border-border/70 bg-market p-4 transition hover:border-success/30 hover:shadow-sm"
                          href={`/blog/${item.slug}`}
                        >
                          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-success">
                            {item.category}
                          </p>
                          <h2 className="mt-2 text-lg leading-snug font-extrabold text-foreground transition group-hover:text-success">
                            {item.title}
                          </h2>
                          <p className="mt-2 text-sm leading-6 text-muted">{item.excerpt}</p>
                        </Link>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-[2rem] border border-border bg-white p-6 shadow-card">
                    <p className="text-sm font-bold uppercase tracking-[0.18em] text-success">
                      Butuh website yang rapi?
                    </p>
                    <p className="mt-3 leading-7 text-muted">
                      Kalau kamu ingin artikel ini diterjemahkan jadi website yang benar-benar siap
                      dipakai, kita bisa bantu susun struktur dan CTA-nya.
                    </p>
                    <ButtonLink
                      className="mt-5 w-full shadow-soft"
                      href="/project-inquiry"
                      data-analytics-event="blog_cta_click"
                      data-analytics-label={post.title}
                      icon={<ArrowUpRight aria-hidden="true" className="size-4" />}
                    >
                      Diskusi Project
                    </ButtonLink>
                  </div>
                </aside>
              </Reveal>
            </div>
          </section>

          <CustomProjectCta />
        </main>
        <MarketplaceFooter />
      </div>
    </>
  );
}
