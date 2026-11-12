import type { Metadata } from "next";
import { cache } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { connection } from "next/server";
import { PortfolioImageGallery } from "@/components/marketing/components/PortfolioImageGallery";
import { StudioHeader, StudioFooter } from "@/components/marketing/sections/StudioChrome";
import { getPortfolioProjectBySlug } from "@/features/portfolio/queries";
import { buildPortfolioMetaDescription, toDescriptionBlocks } from "@/features/portfolio/description";
import type { PortfolioDetail } from "@/features/portfolio/types";
import { siteConfig } from "@/lib/site";
import { buildPageTitle, serializeJsonLd } from "@/lib/seo";
import studio from "@/components/marketing/Studio.module.css";
import styles from "@/components/marketing/components/Portfolio.module.css";

type Props = { params: Promise<{ id: string }> };
const getCachedPortfolioProject = cache(getPortfolioProjectBySlug);

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id: slug } = await params;
  const project = await getCachedPortfolioProject(slug);
  if (!project) return { title: "Project Tidak Ditemukan", robots: { index: false, follow: false } };
  const title = buildPageTitle([project.name, "Portfolio", siteConfig.name], [project.name, siteConfig.name], [project.name]);
  const description = buildPortfolioMetaDescription({ ...project, brand: siteConfig.name });
  const url = `${siteConfig.domain}/portfolio/${project.slug}`;
  const image = new URL(project.thumbnail || "/og-image.png", siteConfig.domain).toString();
  return {
    title: { absolute: title }, description,
    alternates: { canonical: url },
    openGraph: { title, description, url, type: "website", images: [{ url: image, alt: `Tampilan proyek ${project.name}` }] },
    twitter: { card: "summary_large_image", title, description, images: [image] },
  };
}

function PortfolioDetailContent({ project }: { project: PortfolioDetail }) {
  const images = Array.from(new Set([project.thumbnail, ...project.gallery].filter((image): image is string => Boolean(image))));
  const [heroImage, ...galleryImages] = images;
  const description = toDescriptionBlocks(project.result, project.features);
  const metaDescription = buildPortfolioMetaDescription({ ...project, brand: siteConfig.name });
  const url = `${siteConfig.domain}/portfolio/${project.slug}`;
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.domain },
        { "@type": "ListItem", position: 2, name: "Portfolio", item: `${siteConfig.domain}/portfolio` },
        { "@type": "ListItem", position: 3, name: project.name, item: url },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "CreativeWork",
      "@id": `${url}#project`,
      name: project.name,
      description: metaDescription,
      url,
      mainEntityOfPage: url,
      inLanguage: "id-ID",
      ...(images.length ? { image: images.map(image => new URL(image, siteConfig.domain).toString()) } : {}),
      creator: { "@type": "Organization", name: siteConfig.name, url: siteConfig.domain },
    },
  ];

  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(structuredData) }} />
    <header className={styles.heading}>
      <span className={studio.eyebrow}><i aria-hidden="true" />Our projects</span>
      <h1>{project.name}</h1>
      <p>Desain dan pengembangan {project.category.toLowerCase()} oleh Kitangoding.</p>
    </header>
    <div className={styles.heroImage}>{heroImage ? <Image src={heroImage} alt={`Tampilan utama proyek ${project.name}`} fill preload sizes="90vw" unoptimized={heroImage.startsWith('/api/')} /> : <div className={styles.placeholder} aria-hidden="true">{project.name.charAt(0)}</div>}</div>
    {galleryImages.length > 0 && <section id="project-gallery" className={styles.galleryWrap} aria-label={`Galeri proyek ${project.name}`}><PortfolioImageGallery images={galleryImages} projectName={project.name} /></section>}
    <div className={styles.detail}>
      <article className={styles.prose}>
        <h2>Tentang project</h2>
        {description.map((block, index) => block.type === "heading"
          ? <h3 key={index}>{block.text}</h3>
          : <p key={index} className={block.lead ? styles.lead : undefined}>{block.label && <strong>{block.label} </strong>}{block.text}</p>)}
      </article>
      <aside className={styles.sideCard} aria-label="Informasi project">
        <dl className={styles.facts}>
          <div><dt>Project</dt><dd>{project.name}</dd></div>
          <div><dt>Kategori</dt><dd>{project.category}</dd></div>
          <div><dt>Peran</dt><dd>{project.role || "Desain & pengembangan website"}</dd></div>
        </dl>
        <div className={styles.actions}>
          {project.linkPreview && <a href={project.linkPreview} target="_blank" rel="noopener noreferrer" className={studio.cta}>Kunjungi website<span><ArrowUpRight size={20} aria-hidden="true" /></span></a>}
          <Link href="/project-inquiry" className={studio.textLink}>Diskusikan proyek serupa <ArrowUpRight size={18} aria-hidden="true" /></Link>
        </div>
      </aside>
    </div>
  </>;
}

export default async function PortfolioDetailPage({ params }: Props) {
  await connection();
  const { id: slug } = await params;
  const project = await getCachedPortfolioProject(slug);
  // Must run before the shell is sent; inside Suspense the response would already be a 200.
  if (!project) notFound();

  return <div className={studio.root}>
    <StudioHeader />
    <main id="konten" className={styles.page}>
      <Link className={styles.back} href="/portfolio"><ArrowLeft size={14} aria-hidden="true" /> Kembali ke portfolio</Link>
      <PortfolioDetailContent project={project} />
    </main>
    <StudioFooter />
  </div>;
}
