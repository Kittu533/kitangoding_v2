import type { Metadata } from "next";
import { cache, Suspense } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { connection } from "next/server";
import { PortfolioImageGallery } from "@/components/marketing/components/PortfolioImageGallery";
import { StudioHeader, StudioFooter } from "@/components/marketing/sections/StudioChrome";
import { getPortfolioProjectBySlug } from "@/features/portfolio/queries";
import { siteConfig } from "@/lib/site";
import studio from "@/components/marketing/Studio.module.css";
import styles from "@/components/marketing/components/Portfolio.module.css";

type Props = { params: Promise<{ id: string }> };
const getCachedPortfolioProject = cache(getPortfolioProjectBySlug);

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id: slug } = await params;
  const project = await getCachedPortfolioProject(slug);
  if (!project) return {};
  const title = `${project.name} | Portfolio`;
  const description = project.result || `Detail proyek ${project.name} dari ${siteConfig.name}.`;
  const url = `${siteConfig.domain}/portfolio/${project.slug}`;
  return {
    title, description,
    alternates: { canonical: url },
    openGraph: { title, description, url, type: "website" },
    twitter: { card: "summary_large_image", title, description },
  };
}

async function PortfolioDetailContent({ params }: Props) {
  await connection();
  const { id: slug } = await params;
  const project = await getCachedPortfolioProject(slug);
  if (!project) notFound();
  const images = Array.from(new Set([project.thumbnail, ...project.gallery].filter((image): image is string => Boolean(image))));

  return <>
    <header className={styles.heading}>
      <span className={studio.eyebrow}><i aria-hidden="true" />Our projects</span>
      <h1>{project.name}</h1>
      <p>Desain dan pengembangan {project.category.toLowerCase()} oleh Rekalur.</p>
    </header>
    <div className={styles.heroImage}>{images[0] ? <Image src={images[0]} alt={`Tampilan utama proyek ${project.name}`} fill priority sizes="90vw" unoptimized={images[0].startsWith('/api/')} /> : <div className={styles.placeholder} aria-hidden="true">{project.name.charAt(0)}</div>}</div>
    <dl className={styles.facts}>
      <div><dt>Project</dt><dd>{project.name}</dd></div>
      <div><dt>Kategori</dt><dd>{project.category}</dd></div>
      <div><dt>Peran</dt><dd>{project.role || "Desain & pengembangan website"}</dd></div>
    </dl>
    <div className={styles.overview}>
      <article id="project-overview"><h2>Overview.</h2><p>{project.result}</p>{project.features.length > 0 && <><h2 id="project-features" style={{ marginTop: 25 }}>Fitur Utama.</h2><ul>{project.features.map(feature => <li key={feature}>{feature.replace(/^[-•]\s*/, "")}</li>)}</ul></>}</article>
      <nav aria-label="Bagian detail project"><a href="#project-overview">Overview</a>{project.features.length > 0 && <a href="#project-features">Fitur Utama</a>}{images.length > 0 && <a href="#project-gallery">Galeri project</a>}</nav>
    </div>
    {images.length > 0 && <section id="project-gallery" aria-label={`Galeri proyek ${project.name}`}><PortfolioImageGallery images={images} projectName={project.name} /></section>}
    <div className={styles.actions}>{project.linkPreview && <a href={project.linkPreview} target="_blank" rel="noopener noreferrer" className={studio.cta}>Kunjungi website<span><ArrowUpRight size={20} aria-hidden="true" /></span></a>}<Link href="/project-inquiry" className={studio.textLink}>Diskusikan proyek serupa <ArrowUpRight size={18} aria-hidden="true" /></Link></div>
  </>;
}

export default function PortfolioDetailPage({ params }: Props) {
  return <div className={studio.root}>
    <StudioHeader />
    <main id="konten" className={styles.page}>
      <Link className={styles.back} href="/portfolio"><ArrowLeft size={14} aria-hidden="true" /> Kembali ke portfolio</Link>
      <Suspense fallback={<div className={styles.loading} role="status">Memuat detail portfolio…</div>}><PortfolioDetailContent params={params} /></Suspense>
    </main>
    <StudioFooter />
  </div>;
}
