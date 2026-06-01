import { Badge } from "@/components/atoms/Badge";
import { Reveal } from "@/components/atoms/Reveal";
import { ProcessShowcase } from "@/components/organisms/ProcessShowcase";

export function ProcessSection() {
  return (
    <section className="section-space bg-white" id="proses">
      <div className="container-shell">
        <Reveal>
          <div className="mx-auto max-w-4xl text-center">
            <Badge>Cara kami bekerja</Badge>
            <h2 className="mt-5 text-4xl leading-tight font-extrabold text-foreground md:text-6xl">
              Dari cerita bisnismu, kami bantu jadikan website yang siap dipakai.
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-muted">
              Di kiri kamu bisa lihat gambaran tampilan yang sedang dikerjakan. Di kanan, setiap
              langkah menjelaskan prosesnya dengan bahasa yang sederhana.
            </p>
          </div>
        </Reveal>

        <ProcessShowcase />
      </div>
    </section>
  );
}
