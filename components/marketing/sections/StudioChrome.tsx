import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Menu } from "lucide-react";
import { siteConfig, whatsappHref } from "@/lib/site";
import styles from "../Studio.module.css";

const navigation = [
  { href: "/layanan", label: "Layanan" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/blog", label: "Blog" },
  { href: "/#proses", label: "Cara kerja" },
  { href: "/pricing", label: "Harga" },
];

export function StudioHeader() {
  return <header className={styles.header} id="studio-top">
    <Link href="/" className={styles.brand} aria-label="Rekalur — beranda"><Image src="/rekalur-mark.svg" alt="" width={42} height={42} priority /><span>rekalur<span className={styles.brandDot}>.</span></span></Link>
    <nav className={styles.desktopNav} aria-label="Navigasi utama">{navigation.map((item) => <Link href={item.href} key={item.href}>{item.label}</Link>)}</nav>
    <div className={styles.navCta}><Link className={styles.cta} href={whatsappHref}>Mulai project<span><ArrowUpRight size={21} aria-hidden="true" /></span></Link></div>
    <details className={styles.mobileMenu}><summary aria-label="Buka menu navigasi"><Menu aria-hidden="true" /></summary><nav aria-label="Navigasi mobile">{navigation.map((item) => <Link href={item.href} key={item.href}>{item.label}</Link>)}<Link href={whatsappHref}>Mulai project <ArrowUpRight size={16} aria-hidden="true" /></Link></nav></details>
  </header>;
}

export function StudioFooter() {
  return <footer className={styles.footer}>
    <div><Link className={styles.footerBrand} href="/">rekalur.</Link><p>Website yang terasa seperti bisnismu.</p></div>
    <div className={styles.footerLinks}><Link href="/tentang">Tentang</Link><Link href="/referensi">Referensi</Link><Link href="/blog">Insight</Link><Link href="/project-inquiry">Brief project</Link><Link href="/contact">Kontak</Link><a href={siteConfig.instagram} target="_blank" rel="noopener noreferrer">Instagram <ArrowUpRight size={14} aria-hidden="true" /></a><a href={`mailto:${siteConfig.email}`}>Email <ArrowUpRight size={14} aria-hidden="true" /></a></div>
    <div className={styles.footerBottom}><span>© {new Date().getFullYear()} {siteConfig.name}</span><span>Dibuat dengan sepenuh hati, di Yogyakarta.</span><a href="#studio-top">Kembali ke atas ↑</a></div>
  </footer>;
}

export function StudioProjectCta() {
  return <section className={styles.finalCta} id="project">
    <span className={styles.eyebrow}><i aria-hidden="true" />Mulai dari obrolan singkat</span>
    <h2>IDE BAGUS LAYAK PUNYA<br /><em>WEBSITE YANG BAGUS.</em></h2>
    <Link className={styles.cta} href={whatsappHref}>Diskusikan project<span><ArrowUpRight size={21} aria-hidden="true" /></span></Link>
    <span>Tanpa komitmen. Ceritakan kebutuhan bisnismu dulu.</span>
  </section>;
}
