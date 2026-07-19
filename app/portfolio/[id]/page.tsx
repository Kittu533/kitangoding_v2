import type { Metadata } from "next";
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { connection } from "next/server";
import { ButtonLink } from "@/components/atoms/Button";
import { PortfolioImageGallery } from "@/components/molecules/PortfolioImageGallery";
import { CustomProjectCta, FloatingNav, MarketplaceFooter } from "@/components/organisms/MarketplaceShell";
import { getPortfolioProject } from "@/lib/public-content";
import { siteConfig } from "@/lib/site";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const project = await getPortfolioProject(id);

  if (!project) {
    return {};
  }

  const title = `${project.name} | Portfolio`;
  const description = project.result || `Detail proyek ${project.name} dari ${siteConfig.name}.`;
  const url = `${siteConfig.domain}/portfolio/${project.id}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url, type: "website" },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function PortfolioDetailPage({ params }: Props) {
  await connection();
  const { id } = await params;
  const project = await getPortfolioProject(id);

  if (!project) {
    notFound();
  }

  const images = Array.from(new Set([project.thumbnail, ...project.gallery].filter(Boolean))).slice(0, 3) as string[];

  return (
    <div className="marketplace-page min-h-screen bg-market text-foreground">
      <FloatingNav />
      <main id="konten">
        <section className="marketplace-grid pb-20 pt-24 md:pt-28">
          <div className="container-shell">
            <Link
              className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-body transition hover:bg-surface-2 hover:text-navy"
              href="/portfolio"
            >
              <ArrowLeft aria-hidden="true" className="size-4" />
              Kembali ke portfolio
            </Link>

            <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-start">
              <div>
                {images.length > 0 ? (
                  <PortfolioImageGallery images={images} projectName={project.name} />
                ) : (
                  <div className="flex aspect-[16/10] items-end rounded-[2rem] bg-gradient-to-br from-navy via-navy-mid to-orange p-8 text-white shadow-card">
                    <p className="font-display text-3xl font-bold leading-tight">{project.name}</p>
                  </div>
                )}
              </div>

              <div>
                <p className="text-sm font-bold tracking-[0.16em] text-success uppercase">{project.category}</p>
                <h1 className="mt-4 text-4xl leading-tight font-bold tracking-tight text-foreground md:text-5xl">{project.name}</h1>
                <p className="mt-6 text-lg leading-8 text-body">{project.result}</p>

                <dl className="mt-8 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-2xl border border-border bg-white p-5 shadow-sm">
                    <dt className="text-xs font-bold tracking-[0.14em] text-black uppercase">Kategori</dt>
                    <dd className="mt-2 font-semibold text-foreground">{project.category}</dd>
                  </div>
                  {project.role ? (
                    <div className="rounded-2xl border border-border bg-white p-5 shadow-sm">
                      <dt className="text-xs font-bold tracking-[0.14em] text-muted uppercase">Role</dt>
                      <dd className="mt-2 font-semibold text-foreground">{project.role}</dd>
                    </div>
                  ) : null}
                </dl>

                {project.features.length > 0 ? (
                  <section className="mt-8 rounded-[2rem] border border-border bg-white p-6 shadow-sm">
                    <h2 className="text-xl font-bold text-foreground">Fitur Utama</h2>
                    <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                      {project.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-3 text-body">
                          <CheckCircle2 aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-success" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </section>
                ) : null}

                <ButtonLink
                  className="mt-8"
                  href="/project-inquiry"
                  icon={<ArrowRight aria-hidden="true" className="size-4" />}
                >
                  Diskusikan Proyek Serupa
                </ButtonLink>
              </div>
            </div>
          </div>
        </section>
        <CustomProjectCta />
      </main>
      <MarketplaceFooter />
    </div>
  );
}
