import type { Metadata } from "next";
import { cache, Suspense } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { connection } from "next/server";
import { ButtonLink } from "@/components/atoms/Button";
import { PortfolioImageGallery } from "@/components/molecules/PortfolioImageGallery";
import { CustomProjectCta, FloatingNav, MarketplaceFooter } from "@/components/organisms/MarketplaceShell";
import { Skeleton } from "@/components/ui/skeleton";
import { getPortfolioProjectBySlug } from "@/lib/public-content";
import { siteConfig } from "@/lib/site";

type Props = {
  params: Promise<{ id: string }>;
};

const getCachedPortfolioProject = cache(getPortfolioProjectBySlug);

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id: slug } = await params;
  const project = await getCachedPortfolioProject(slug);

  if (!project) {
    return {};
  }

  const title = `${project.name} | Portfolio`;
  const description = project.result || `Detail proyek ${project.name} dari ${siteConfig.name}.`;
  const url = `${siteConfig.domain}/portfolio/${project.slug}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url, type: "website" },
    twitter: { card: "summary_large_image", title, description },
  };
}

async function PortfolioDetailContent({ params }: Props) {
  await connection();
  const { id: slug } = await params;
  const project = await getCachedPortfolioProject(slug);

  if (!project) {
    notFound();
  }

  const images = Array.from(new Set([project.thumbnail, ...project.gallery].filter(Boolean))).slice(0, 3) as string[];

  return (
    <>
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
                <p className="mt-6 text-justify text-lg leading-8 text-body">{project.result}</p>

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
              </div>
      </div>

      {project.features.length > 0 ? (
        <section className="mt-10">
          <h2 className="text-2xl font-bold text-foreground">Fitur Utama</h2>
          <ul className="mt-4 grid list-disc gap-x-8 gap-y-2 pl-5 leading-6 text-body sm:grid-cols-2">
            {project.features.map((feature) => (
              <li key={feature}>{feature.replace(/^[-•]\s*/, "")}</li>
            ))}
          </ul>
        </section>
      ) : null}

      <div className="mt-8 flex justify-end">
        <ButtonLink href="/project-inquiry" icon={<ArrowRight aria-hidden="true" className="size-4" />}>
          Diskusikan Proyek Serupa
        </ButtonLink>
      </div>
    </>
  );
}

function PortfolioDetailSkeleton() {
  return (
    <div aria-busy="true" aria-label="Memuat detail portfolio" className="mt-8">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-start">
        <div>
          <Skeleton className="aspect-[16/10] rounded-[2rem]" />
          <div className="mt-4 grid grid-cols-3 gap-3">
            {Array.from({ length: 3 }, (_, index) => (
              <Skeleton className="aspect-[4/3] rounded-xl" key={index} />
            ))}
          </div>
        </div>
        <div>
          <Skeleton className="h-4 w-32" />
          <Skeleton className="mt-5 h-12 w-4/5" />
          <div className="mt-7 space-y-3">
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-3/4" />
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <Skeleton className="h-24 rounded-2xl" />
            <Skeleton className="h-24 rounded-2xl" />
          </div>
        </div>
      </div>
      <div className="mt-10">
        <Skeleton className="h-8 w-40" />
        <div className="mt-4 space-y-3">
          {Array.from({ length: 6 }, (_, index) => (
            <Skeleton className="h-5 w-full max-w-xl" key={index} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function PortfolioDetailPage({ params }: Props) {
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
            <Suspense fallback={<PortfolioDetailSkeleton />}>
              <PortfolioDetailContent params={params} />
            </Suspense>
          </div>
        </section>
        <CustomProjectCta />
      </main>
      <MarketplaceFooter />
    </div>
  );
}
