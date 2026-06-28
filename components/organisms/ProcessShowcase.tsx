"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ArrowDown, CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/atoms/Badge";
import { processSteps } from "@/lib/landing-data";
import { cn } from "@/lib/utils";

const showcaseImages = [
  {
    src: "/process-audit.svg",
    alt: "Gambaran awal kebutuhan website UMKM",
    label: "Kenalan",
  },
  {
    src: "/process-wireframe.svg",
    alt: "Gambaran susunan isi halaman website",
    label: "Susun Isi",
  },
  {
    src: "/process-development.svg",
    alt: "Gambaran tampilan website yang sedang dibuat",
    label: "Buat Tampilan",
  },
  {
    src: "/process-launch.svg",
    alt: "Gambaran website yang siap digunakan pelanggan",
    label: "Siap Pakai",
  },
] as const;

const stepOutputs = [
  ["Arah bisnis", "Target pelanggan", "Hal yang ditonjolkan"],
  ["Urutan isi", "Kalimat utama", "Tombol hubungi"],
  ["Tampilan rapi", "Nyaman di HP", "Mudah dibaca"],
  ["Cek akhir", "Perbaikan kecil", "Siap dibagikan"],
] as const;

export function ProcessShowcase() {
  const [activeStep, setActiveStep] = useState(0);
  const stepRefs = useRef<Array<HTMLElement | null>>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (!visibleEntry) {
          return;
        }

        const nextIndex = Number(visibleEntry.target.getAttribute("data-step-index"));
        if (!Number.isNaN(nextIndex)) {
          setActiveStep(nextIndex);
        }
      },
      {
        rootMargin: "-25% 0px -45% 0px",
        threshold: [0.25, 0.5, 0.75],
      }
    );

    stepRefs.current.forEach((node) => {
      if (node) {
        observer.observe(node);
      }
    });

    return () => observer.disconnect();
  }, []);

  const activeImage = showcaseImages[activeStep];

  return (
    <div className="mt-14 grid gap-10 lg:grid-cols-2 lg:items-start">
      <div className="lg:sticky lg:top-24">
        <div className="rounded-lg border border-border bg-white p-4 shadow-soft">
          <div className="rounded-lg bg-navy p-4 text-white">
            <div className="mb-4 flex items-center justify-between gap-4">
              <Badge tone="glass">{activeImage.label}</Badge>
              <span className="text-sm font-semibold text-white/65">
                Langkah {activeStep + 1} dari {processSteps.length}
              </span>
            </div>

            <div className="relative mx-auto max-w-xl">
              <div className="rounded-lg bg-ink p-3 shadow-soft">
                <div className="overflow-hidden rounded-lg bg-white">
                  <Image
                    alt={activeImage.alt}
                    className="h-auto w-full"
                    height={800}
                    priority
                    src={activeImage.src}
                    width={1200}
                  />
                </div>
              </div>
              <div className="mx-auto h-4 w-2/3 rounded-b-lg bg-ink" />

              <div className="absolute -right-2 -bottom-6 w-32 rounded-3xl border-8 border-ink bg-white shadow-soft sm:w-40">
                <div className="mx-auto mt-2 h-3 w-14 rounded-full bg-ink" />
                <div className="overflow-hidden rounded-b-3xl p-2">
                  <Image
                    alt={`${activeImage.alt} dalam tampilan mobile`}
                    className="h-auto w-full rounded-2xl"
                    height={800}
                    src={activeImage.src}
                    width={1200}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative">
        <div className="absolute top-0 bottom-0 left-6 hidden w-px bg-border md:block" />
        <div className="space-y-8">
          {processSteps.map((step, index) => {
            const isActive = activeStep === index;

            return (
              <article
                aria-current={isActive ? "step" : undefined}
                className={cn(
                  "relative rounded-lg border bg-white p-6 shadow-card transition md:ml-16",
                  isActive ? "border-orange" : "border-border"
                )}
                data-step-index={index}
                key={step.number}
                ref={(node) => {
                  stepRefs.current[index] = node;
                }}
              >
                <div
                  className={cn(
                    "absolute top-6 -left-16 hidden size-12 items-center justify-center rounded-full border-4 border-white text-sm font-extrabold shadow-card md:flex",
                    isActive ? "bg-orange text-white" : "bg-navy-light text-navy"
                  )}
                >
                  {index + 1}
                </div>

                <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
                  <div
                    className={cn(
                      "flex size-12 flex-none items-center justify-center rounded-lg text-sm font-extrabold md:hidden",
                      isActive ? "bg-orange text-white" : "bg-navy-light text-navy"
                    )}
                  >
                    {index + 1}
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-orange-dark">{step.number}</p>
                    <h3 className="mt-2 text-3xl leading-tight font-extrabold text-foreground">
                      {step.title}
                    </h3>
                    <p className="mt-4 max-w-xl leading-8 text-muted">{step.description}</p>

                    <div className="mt-6 grid gap-3 sm:grid-cols-3">
                      {stepOutputs[index].map((output) => (
                        <div
                          className="flex items-center gap-2 rounded-lg bg-surface p-3 text-sm font-semibold text-body"
                          key={output}
                        >
                          <CheckCircle2 aria-hidden="true" className="size-4 flex-none text-success" />
                          <span>{output}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {index < processSteps.length - 1 ? (
                  <div className="mt-8 flex items-center gap-3 text-sm font-semibold text-muted">
                    <ArrowDown aria-hidden="true" className="size-4 text-orange" />
                    Scroll untuk lanjut ke langkah berikutnya
                  </div>
                ) : null}
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );
}
