import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Plus } from "lucide-react";
import { type ServiceLandingPageConfig, createServiceLandingPageStructuredData } from "@/lib/service-landing-pages";
import { whatsappHref } from "@/lib/site";
import { StudioHeader, StudioFooter } from "@/components/marketing/sections/StudioChrome";
import studio from "../Studio.module.css";
import styles from "./ServiceLandingPage.module.css";

export function ServiceLandingPage({ page }: { page: ServiceLandingPageConfig }) {
  return <div className={studio.root}>
    <script dangerouslySetInnerHTML={{ __html: JSON.stringify(createServiceLandingPageStructuredData(page)) }} type="application/ld+json" />
    <StudioHeader />
    <main className={styles.page} id="konten">
      <header className={styles.heading}>
        <Link className={styles.back} href="/#layanan"><ArrowLeft size={14} aria-hidden="true" /> Semua layanan</Link>
        <span className={studio.eyebrow}><i aria-hidden="true" />Detail layanan</span>
        <h1>{page.name}</h1>
        <p>{page.description}</p>
      </header>
      <div className={styles.heroImage}><Image src={page.image} alt={`Ilustrasi konsep layanan ${page.name}`} fill priority sizes="(max-width: 700px) 90vw, 85vw" /></div>
      <div className={styles.content}>
        <section aria-labelledby="about-service"><h2 id="about-service">Tentang layanan ini.</h2><p>{page.heroDescription}</p></section>
        <section aria-labelledby="service-scope"><h2 id="service-scope">Apa yang kami kerjakan?</h2><ol className={styles.highlights}>{page.highlights.map((item) => <li key={item.title}><strong>{item.title}:</strong> {item.description}</li>)}</ol></section>
        <section aria-labelledby="service-deliverables"><h2 id="service-deliverables">Yang kamu dapatkan.</h2><ul className={styles.deliverables}>{page.deliverables.map((item) => <li key={item}>{item}</li>)}</ul></section>
        <section aria-labelledby="why-service"><h2 id="why-service">Dibuat untuk kebutuhan bisnismu.</h2><p>{page.heroTitle} Kami mulai dengan memahami tujuan, pelanggan, dan isi yang perlu disampaikan. Scope, alur pengerjaan, dan kebutuhan fitur kita sepakati bersama sebelum implementasi.</p><div className={styles.actions}><Link className={studio.cta} href={whatsappHref}>Diskusikan project<span><ArrowUpRight size={20} aria-hidden="true" /></span></Link><Link className={studio.textLink} href="/pricing">Lihat harga <ArrowUpRight size={16} aria-hidden="true" /></Link></div></section>
        <section className={styles.faq} aria-labelledby="service-faq"><h2 id="service-faq">Sebelum mulai.</h2>{page.faq.map((item) => <details key={item.question}><summary>{item.question}<Plus size={17} aria-hidden="true" /></summary><p>{item.answer}</p></details>)}</section>
        <nav className={styles.related} aria-label="Eksplorasi layanan terkait"><h2>Eksplorasi berikutnya.</h2>{page.relatedLinks.map((link) => <Link href={link.href} key={link.href}>{link.label}<ArrowUpRight size={14} aria-hidden="true" /></Link>)}</nav>
      </div>
    </main>
    <StudioFooter />
  </div>;
}
