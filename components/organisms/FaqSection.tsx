import { Plus } from "lucide-react";
import { Reveal } from "@/components/atoms/Reveal";
import { SectionHeader } from "@/components/molecules/SectionHeader";
import { faqs } from "@/lib/landing-data";

export function FaqSection() {
  return (
    <section className="section-space bg-white" id="faq">
      <div className="container-shell">
        <SectionHeader
          align="center"
          eyebrow="FAQ"
          title="Pertanyaan yang paling sering muncul sebelum mulai."
        />

        <Reveal className="mx-auto mt-12 max-w-3xl">
          <div className="divide-y divide-border rounded-lg border border-border bg-surface px-6">
            {faqs.map((faq) => (
              <details key={faq.question} className="group py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-foreground">
                  <span>{faq.question}</span>
                  <Plus
                    aria-hidden="true"
                    className="size-5 flex-none text-orange transition group-open:rotate-45"
                  />
                </summary>
                <p className="mt-4 max-w-2xl leading-8 text-muted">{faq.answer}</p>
              </details>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
