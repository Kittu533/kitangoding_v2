"use client";

import { MotionConfig, motion } from "motion/react";
import {
  MonitorSmartphone,
  SearchCheck,
  Sparkles,
  Store,
  Workflow,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const serviceSolutions = [
  {
    title: "Website Company Profile",
    description: "Profil bisnis yang langsung terasa tepercaya.",
    icon: MonitorSmartphone,
    span: "sm:col-span-3 lg:col-span-2",
    number: "01",
    visual: "from-navy-light via-white to-orange-light/70",
    iconStyle: "bg-navy text-white",
    accent: "bg-orange",
    wide: false,
  },
  {
    title: "Landing Page Iklan",
    description: "Halaman fokus untuk mengubah klik menjadi chat.",
    icon: SearchCheck,
    span: "sm:col-span-3 lg:col-span-2",
    number: "02",
    visual: "from-orange-light via-white to-navy-light/60",
    iconStyle: "bg-orange text-white",
    accent: "bg-orange",
    wide: false,
  },
  {
    title: "Toko Online & Katalog",
    description: "Katalog rapi dengan alur order yang mudah.",
    icon: Store,
    span: "lg:col-span-3",
    number: "03",
    visual: "from-success/10 via-white to-navy-light/70",
    iconStyle: "bg-success text-white",
    accent: "bg-success",
    wide: true,
  },
  {
    title: "Aplikasi Web Custom",
    description: "Sistem khusus untuk proses kerja yang lebih efisien.",
    icon: Workflow,
    span: "lg:col-span-3",
    number: "04",
    visual: "from-navy-light/80 via-white to-orange-light/50",
    iconStyle: "bg-navy text-white",
    accent: "bg-navy",
    wide: true,
  },
] as const;

export function Features() {
  return (
    <MotionConfig reducedMotion="user">
      <section
        aria-labelledby="services-title"
        className="marketplace-grid bg-navy-light/25 py-16 md:py-24"
        id="layanan"
      >
        <div className="mx-auto max-w-5xl px-6">
          <motion.div
            className="mx-auto max-w-3xl text-center"
            initial={{ opacity: 0, y: 24 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.4 }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <span className="inline-flex rounded-full border border-success/20 bg-white px-4 py-2 marketplace-eyebrow text-success shadow-sm">
              Layanan utama
            </span>
            <h2
              className="mt-5 text-balance text-4xl leading-tight font-extrabold text-foreground md:text-5xl"
              id="services-title"
            >
              Satu partner untuk semua kebutuhan website bisnismu.
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-body">
              Pilih solusi yang paling sesuai dengan target bisnismu.
            </p>
          </motion.div>

          <div className="relative mt-12 grid grid-cols-6 gap-4">
            <motion.div
              className="col-span-full h-full lg:col-span-2"
              initial={{ opacity: 0, y: 28 }}
              transition={{ duration: 0.55, ease: "easeOut" }}
              viewport={{ once: true, amount: 0.25 }}
              whileInView={{ opacity: 1, y: 0 }}
            >
              <Card className="group relative h-full overflow-hidden rounded-[1.75rem] bg-gradient-to-br from-orange-light via-white to-navy-light/70 py-0 shadow-soft ring-1 ring-navy/10 transition duration-300 hover:-translate-y-1 hover:shadow-card motion-reduce:transform-none">
                <span
                  aria-hidden="true"
                  className="absolute -top-20 -right-20 size-52 rounded-full bg-orange/15 blur-3xl"
                />
                <span
                  aria-hidden="true"
                  className="absolute -bottom-24 -left-20 size-56 rounded-full bg-navy/10 blur-3xl"
                />
                <CardContent className="relative flex h-full min-h-72 flex-col items-center justify-center p-8 text-center">
                  <Sparkles
                    aria-hidden="true"
                    className="absolute top-6 right-6 size-6 text-orange transition duration-300 group-hover:rotate-12 group-hover:scale-110"
                  />
                  <div className="relative flex h-24 w-48 items-center justify-center">
                    <span
                      aria-hidden="true"
                      className="absolute inset-x-0 inset-y-2 -rotate-3 rounded-[50%] border-2 border-orange/55 transition duration-300 group-hover:-rotate-6"
                    />
                    <span
                      aria-hidden="true"
                      className="absolute inset-x-2 inset-y-1 rotate-2 rounded-[50%] border border-navy/20 transition duration-300 group-hover:rotate-5"
                    />
                    <span className="relative text-5xl font-extrabold text-navy">100%</span>
                  </div>
                  <h3 className="mt-6 max-w-56 text-2xl leading-tight font-extrabold text-foreground">
                    Dibuat khusus untukmu
                  </h3>
                </CardContent>
              </Card>
            </motion.div>

            {serviceSolutions.map((service, index) => {
              const Icon = service.icon;

              return (
                <motion.div
                  className={cn("col-span-full h-full", service.span)}
                  initial={{ opacity: 0, y: 28 }}
                  key={service.title}
                  transition={{
                    duration: 0.55,
                    delay: (index + 1) * 0.07,
                    ease: "easeOut",
                  }}
                  viewport={{ once: true, amount: 0.25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                >
                  <Card className="group relative h-full overflow-hidden rounded-[1.75rem] bg-white py-0 shadow-soft ring-1 ring-navy/10 transition duration-300 hover:-translate-y-1 hover:ring-orange/30 hover:shadow-card motion-reduce:transform-none">
                    <CardContent
                      className={cn(
                        "relative flex h-full min-h-72 flex-col p-6 md:p-7",
                        service.wide &&
                          "sm:grid sm:min-h-64 sm:grid-cols-[0.85fr_1.15fr] sm:items-center sm:gap-8",
                      )}
                    >
                      <div
                        className={cn(
                          "relative flex h-32 items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br",
                          service.visual,
                          service.wide && "sm:order-2 sm:h-48",
                        )}
                      >
                        <span
                          aria-hidden="true"
                          className="absolute top-3 left-4 text-5xl font-black text-navy/[0.06]"
                        >
                          {service.number}
                        </span>
                        <span aria-hidden="true" className="absolute inset-x-6 h-px bg-navy/10" />
                        <span aria-hidden="true" className="absolute inset-y-5 w-px bg-navy/10" />
                        <span
                          aria-hidden="true"
                          className="absolute size-28 rounded-full border border-navy/10 transition duration-500 group-hover:scale-110"
                        />
                        <span
                          aria-hidden="true"
                          className="absolute size-20 rounded-full border border-orange/30 transition duration-500 group-hover:scale-90"
                        />
                        <span
                          className={cn(
                            "relative flex size-14 items-center justify-center rounded-2xl shadow-md transition duration-300 group-hover:-rotate-3 group-hover:scale-110",
                            service.iconStyle,
                          )}
                        >
                          <Icon aria-hidden="true" className="size-6" />
                        </span>
                      </div>

                      <div className={cn("mt-6 flex flex-col", service.wide && "sm:mt-0")}>
                        <span
                          aria-hidden="true"
                          className={cn("mb-4 h-1 w-10 rounded-full", service.accent)}
                        />
                        <h3 className="text-xl font-extrabold text-foreground">{service.title}</h3>
                        <p className="mt-3 max-w-sm text-sm leading-6 text-body">
                          {service.description}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </MotionConfig>
  );
}
