import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { PublicServiceCard } from "@/features/services/types";
import { serviceLandingPages } from "@/lib/service-landing-pages";
import { whatsappHref } from "@/lib/site";
import styles from "../Studio.module.css";

export function ServicesOverviewSection({ services }: { services: PublicServiceCard[] }) {
  return <>
    <section className="text-center"><div className="container-shell">
      <span className={styles.eyebrow}><i aria-hidden="true" />Layanan kami</span>
      <h1 className="mx-auto mt-7 max-w-4xl">WEBSITE UNTUK<br /><em>SETIAP LANGKAH.</em></h1>
      <p className="mx-auto mt-5 max-w-2xl marketplace-hero-copy">Dari membangun kepercayaan sampai memudahkan transaksi. Pilih layanan yang sesuai dengan langkah bisnismu berikutnya.</p>
    </div></section>
    <section className="pb-20"><div className="container-shell">
      <div className="grid gap-5 md:grid-cols-2">{services.map((service, index) => <article className="rounded-2xl border border-border bg-white p-7 md:p-10" key={service.title}>
        <span className="text-xs text-orange">(0{index + 1})</span><h2 className="mt-5 text-2xl">{service.title}</h2><p className="mt-4 text-sm leading-7 text-body">{service.description}</p>
        {service.price && <p className="mt-5 font-semibold">{service.price}</p>}
        <Link href={whatsappHref} className={`${styles.textLink} mt-6`}>Diskusikan kebutuhan <ArrowUpRight size={16} aria-hidden="true" /></Link>
      </article>)}</div>
      <nav className="mt-14" aria-label="Detail layanan"><h2 className="mb-6 text-2xl">Pelajari layanan lebih dekat.</h2><div className="flex flex-wrap gap-3">{serviceLandingPages.map(service => <Link className="inline-flex items-center gap-4 rounded-full border border-border bg-white px-5 py-3 text-sm hover:border-orange" href={service.pathname} key={service.pathname}>{service.name}<ArrowUpRight size={16} aria-hidden="true" /></Link>)}</div></nav>
    </div></section>
  </>;
}
