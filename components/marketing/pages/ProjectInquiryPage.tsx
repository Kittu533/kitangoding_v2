import studio from "@/components/marketing/Studio.module.css";
import { ClipboardList } from "lucide-react";
import { Reveal } from "@/components/marketing/ui/Reveal";
import { ProjectInquiryForm } from "@/components/marketing/components/ProjectInquiryForm";
import { StudioHeader, StudioFooter } from "@/components/marketing/sections/StudioChrome";

export function ProjectInquiryPage() {
  return (
    <div className={`marketplace-page ${studio.publicPage}`}>
      <StudioHeader />
      <main id="konten">
        <section className="marketplace-grid pt-24 pb-16">
          <div className="container-shell text-center">
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-lg border border-success/20 bg-white/80 px-3 py-2 marketplace-eyebrow text-success shadow-sm backdrop-blur">
                <ClipboardList aria-hidden="true" className="size-3.5" />
                Project Inquiry
              </span>
              <h1 className="mx-auto mt-8 max-w-4xl text-5xl leading-tight font-extrabold text-foreground md:text-6xl">
                CERITAKAN IDE <em>PROJECTMU.</em>
              </h1>
              <p className="mx-auto mt-5 max-w-2xl marketplace-hero-copy">
                Kirim detail kebutuhan project kamu. Kami akan bantu baca konteksnya dan balas dengan
                arahan paket atau langkah pengerjaan yang paling masuk akal.
              </p>
            </Reveal>
          </div>
        </section>

        <section className="marketplace-grid pb-24">
          <div className="container-shell">
            <Reveal>
              <div className="mx-auto max-w-5xl rounded-[2rem] border border-border bg-market/70 p-6 backdrop-blur md:p-10">
                <ProjectInquiryForm />
              </div>
            </Reveal>
          </div>
        </section>
      </main>
      <StudioFooter />
    </div>
  );
}
