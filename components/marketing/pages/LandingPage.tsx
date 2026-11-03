import { Suspense, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowRight, ArrowUpRight, Plus } from "lucide-react";
import { getPortfolioProjects } from "@/features/portfolio/queries";
import { getPublicPricing } from "@/features/pricing/queries";
import { faqs, processSteps } from "@/lib/landing-data";
import { serviceLandingPages } from "@/lib/service-landing-pages";
import { whatsappHref } from "@/lib/site";
import {
  StudioHeader,
  StudioFooter,
} from "@/components/marketing/sections/StudioChrome";
import { PortfolioCard } from "@/components/marketing/components/PortfolioCard";
import { PricingPlanGrid } from "@/components/marketing/sections/PricingPlanGrid";
import styles from "../Studio.module.css";

function Cta({
  children,
  href = whatsappHref,
  secondary = false,
}: {
  children: ReactNode;
  href?: string;
  secondary?: boolean;
}) {
  return (
    <Link
      className={`${styles.cta} ${secondary ? styles.secondary : ""}`}
      href={href}
    >
      {children}
      <span>
        <ArrowUpRight size={21} aria-hidden="true" />
      </span>
    </Link>
  );
}

function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <span className={styles.eyebrow}>
      <i aria-hidden="true" />
      {children}
    </span>
  );
}

function Preview({ index }: { index: number }) {
  return (
    <div className={styles.browser}>
      <div className={styles.browserBar} aria-hidden="true">
        <i />
        <i />
        <i />
        <span>kitangoding / selected work</span>
      </div>
      <div className={styles.browserImage}>
        <Image
          src={`/images/portofolio-${index}.webp`}
          alt={`Preview desain website portfolio Kitangoding ${index}`}
          fill
          sizes="(max-width: 700px) 330px, 560px"
          priority={index === 1}
        />
      </div>
    </div>
  );
}

async function SelectedWork() {
  const projects = await getPortfolioProjects(5);
  return (
    <div className={styles.workGrid}>
      {projects.map((project) => (
        <div className={styles.workItem} key={project.id}>
          <PortfolioCard item={project} />
        </div>
      ))}
    </div>
  );
}

async function HomePricing() {
  return <PricingPlanGrid plans={(await getPublicPricing()).slice(0, 3)} />;
}

function LoadingCards() {
  return (
    <div className={styles.loading} role="status">
      Menyiapkan pilihan untuk bisnismu…
    </div>
  );
}

export function LandingPage() {
  return (
    <div className={styles.root}>
      <StudioHeader />
      <main id="konten">
        <section className={styles.hero} aria-labelledby="home-title">
          <div className={styles.heroCopy}>
            <Eyebrow>Independent web studio · Yogyakarta</Eyebrow>
            <h1 id="home-title">
              WEBSITE YANG BIKIN
              <br />
              BISNISMU <em>BERARTI.</em>
            </h1>
            <p>
              Jasa pembuatan website untuk UMKM dan bisnis di Jogja.
              <br className={styles.desktopBreak} /> Dari company profile, landing page,
              hingga toko online yang memudahkan pelangganmu.
            </p>
            <div className={styles.heroActions}>
              <Cta>Wujudkan websitemu</Cta>
              <Cta href="#portfolio" secondary>
                Lihat karya kami
              </Cta>
            </div>
            <a className={styles.scrollCue} href="#showcase">
              <ArrowDown size={14} aria-hidden="true" /> Scroll untuk eksplorasi
            </a>
          </div>
          <div
            className={styles.showcase}
            id="showcase"
            aria-label="Eksplorasi desain website kami"
          >
            <div className={styles.previewRow}>
              {[0, 1].map((copy) => (
                <div className={styles.previewGroup} key={copy} aria-hidden={copy === 1 ? true : undefined}>
                  {[1, 2, 3].map((index) => <Preview index={index} key={index} />)}
                </div>
              ))}
            </div>
            <div className={`${styles.previewRow} ${styles.secondRow}`}>
              {[0, 1].map((copy) => (
                <div className={styles.previewGroup} key={copy} aria-hidden={copy === 1 ? true : undefined}>
                  {[4, 5, 6].map((index) => <Preview index={index} key={index} />)}
                </div>
              ))}
            </div>
            <div className={styles.showcaseBottom}>
              <span>Dari ide di kepala, jadi pengalaman di layar.</span>
              <Link href="/portfolio">
                Eksplorasi portfolio{" "}
                <ArrowUpRight size={17} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </section>
        <section
          className={`${styles.section} ${styles.about}`}
          id="tentang"
          aria-labelledby="about-title"
        >
          <div className={styles.aboutCopy}>
            <Eyebrow>Sedikit tentang kami</Eyebrow>
            <h2 id="about-title">
              PARTNER DIGITAL UNTUK
              <br />
              BISNIS YANG <em>BERTUMBUH.</em>
            </h2>
            <p>
              Kitangoding adalah partner digital untuk UMKM, brand lokal, dan
              bisnis jasa. Kami menyatukan desain, konten, dan teknologi untuk
              membantu bisnismu tampil meyakinkan, bercerita lebih jelas, dan
              terhubung dengan pelanggan.
            </p>
            <Cta href="#layanan">Eksplorasi layanan</Cta>
          </div>
          <div className={styles.aboutGallery}>
            <div className={styles.aboutVisual}>
              <Image
                src="/images/studio/company-profile.webp"
                alt="Ilustrasi konsep website company profile dan identitas bisnis"
                fill
                sizes="(max-width: 700px) 15vw, 18vw"
              />
            </div>
            <div className={`${styles.aboutVisual} ${styles.aboutFocus}`}>
              <Image
                src="/images/studio/design-process.webp"
                alt="Ilustrasi proses diskusi wireframe dan desain website"
                fill
                sizes="(max-width: 700px) 70vw, 55vw"
              />
            </div>
            <div className={styles.aboutVisual}>
              <Image
                src="/images/studio/online-store.webp"
                alt="Ilustrasi konsep toko online untuk produk UMKM"
                fill
                sizes="(max-width: 700px) 15vw, 18vw"
              />
            </div>
          </div>
        </section>
        <section
          className={`${styles.section} ${styles.services}`}
          id="layanan"
          aria-labelledby="services-title"
        >
          <div className={styles.servicesHeading}>
            <div>
              <Eyebrow>Layanan kami</Eyebrow>
              <h2 id="services-title">
                WEBSITE UNTUK
                <br />
                <em>SETIAP LANGKAH.</em>
              </h2>
            </div>
            <div>
              <p>
                Kami membantu bisnis membangun profil, menjalankan campaign,
                menjual produk, dan memperbarui pengalaman digitalnya.
              </p>
              <Link className={styles.textLink} href="/layanan">
                Eksplorasi layanan <ArrowUpRight size={16} aria-hidden="true" />
              </Link>
            </div>
          </div>
          <div className={styles.serviceList}>
            {serviceLandingPages.map((service, index) => (
              <Link
                className={styles.service}
                key={service.pathname}
                href={service.pathname}
              >
                <span className={styles.serviceIndex} aria-hidden="true">
                  (0{index + 1})
                </span>
                <h3>{service.name}</h3>
                <div className={styles.servicePreview} aria-hidden="true">
                  <Image
                    src={service.image}
                    alt=""
                    fill
                    sizes="(max-width: 700px) 85vw, 320px"
                  />
                  <span>
                    Lihat detail <ArrowUpRight size={16} />
                  </span>
                </div>
                <ArrowUpRight
                  className={styles.serviceArrow}
                  size={26}
                  aria-hidden="true"
                />
              </Link>
            ))}
          </div>
        </section>
        <section
          className={styles.section}
          id="portfolio"
          aria-labelledby="work-title"
        >
          <div className={styles.workHeading}>
            <Eyebrow>Selected work</Eyebrow>
            <h2 id="work-title">
              IDE JADI <em>KARYA.</em>
            </h2>
            <p>
              Website dan pengalaman digital yang kami kerjakan.
              <br />
              Temukan cerita dan detail di balik setiap project.
            </p>
          </div>
          <Suspense fallback={<LoadingCards />}>
            <SelectedWork />
          </Suspense>
          <Link
            className={`${styles.textLink} ${styles.morePricing}`}
            href="/portfolio"
          >
            Semua portfolio <ArrowUpRight size={18} aria-hidden="true" />
          </Link>
        </section>
        <section
          className={`${styles.section} ${styles.process}`}
          id="proses"
          aria-labelledby="process-title"
        >
          <div className={styles.splitHeading}>
            <div>
              <Eyebrow>Kolaborasi tanpa ribet</Eyebrow>
              <h2 id="process-title">
                DARI OBROLAN,
                <br />
                JADI <em>KENYATAAN.</em>
              </h2>
            </div>
            <p>
              Kamu fokus pada bisnismu.
              <br />
              Kami bantu merapikan langkah digitalnya.
            </p>
          </div>
          <div className={styles.processGrid}>
            {processSteps.map((step) => (
              <article key={step.number}>
                <span>
                  {step.number}
                  <ArrowRight size={20} aria-hidden="true" />
                </span>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </article>
            ))}
          </div>
        </section>
        <section
          className={styles.section}
          id="harga"
          aria-labelledby="pricing-title"
        >
          <div className={styles.centerHeading}>
            <Eyebrow>Investasi untuk bisnismu</Eyebrow>
            <h2 id="pricing-title">
              MULAI DARI YANG <em>KAMU BUTUHKAN.</em>
            </h2>
            <p>
              Scope jelas, proses transparan. Kita cari pilihan yang paling
              masuk akal.
            </p>
          </div>
          <Suspense fallback={<LoadingCards />}>
            <HomePricing />
          </Suspense>
          <Link
            className={`${styles.textLink} ${styles.morePricing}`}
            href="/pricing"
          >
            Lihat semua paket & detail{" "}
            <ArrowUpRight size={18} aria-hidden="true" />
          </Link>
        </section>
        <section
          className={`${styles.section} ${styles.faq}`}
          id="faq"
          aria-labelledby="faq-title"
        >
          <div>
            <Eyebrow>Sebelum kita mulai</Eyebrow>
            <h2 id="faq-title">
              MASIH ADA
              <br />
              <em>PERTANYAAN?</em>
            </h2>
            <p>Beberapa hal yang mungkin sedang kamu pikirkan.</p>
            <Link className={styles.textLink} href={whatsappHref}>
              Tanya langsung ke kami{" "}
              <ArrowUpRight size={18} aria-hidden="true" />
            </Link>
          </div>
          <div>
            {faqs.map((faq) => (
              <details key={faq.question}>
                <summary>
                  {faq.question}
                  <Plus size={19} aria-hidden="true" />
                </summary>
                <p>{faq.answer}</p>
              </details>
            ))}
          </div>
        </section>
        <section className={styles.finalCta}>
          <Eyebrow>Project berikutnya, mungkin milikmu.</Eyebrow>
          <h2>
            IDE BAGUS LAYAK PUNYA
            <br />
            <em>WEBSITE YANG BAGUS.</em>
          </h2>
          <Cta>Yuk, mulai ngobrol</Cta>
          <span>Tanpa komitmen. Ceritakan idemu dulu.</span>
        </section>
      </main>
      <StudioFooter />
    </div>
  );
}
