"use client";

import { MotionConfig, motion } from "motion/react";
import { Cpu, Fingerprint, Pencil, Settings2, Sparkles, Zap } from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Cepat dipahami",
    description: "Pengunjung langsung tahu bisnismu menawarkan apa dan kenapa mereka perlu memilihmu.",
  },
  {
    icon: Cpu,
    title: "Cepat diakses",
    description: "Halaman ringan dan responsif supaya calon pelanggan tidak pergi sebelum melihat penawaranmu.",
  },
  {
    icon: Fingerprint,
    title: "Terasa kredibel",
    description: "Struktur dan visual yang rapi membuat bisnismu terlihat serius sejak kesan pertama.",
  },
  {
    icon: Pencil,
    title: "Sesuai bisnismu",
    description: "Konten dan desain disusun mengikuti karakter brand, bukan sekadar memakai template generik.",
  },
  {
    icon: Settings2,
    title: "Mudah diarahkan",
    description: "Alur dan CTA yang jelas membantu pengunjung bergerak dari melihat menjadi chat atau order.",
  },
  {
    icon: Sparkles,
    title: "Siap bertumbuh",
    description: "Fondasi fleksibel untuk menambah layanan, konten, dan fitur saat kebutuhan bisnis berkembang.",
  },
] as const;

export function Features() {
  return (
    <MotionConfig reducedMotion="user">
      <section
        aria-labelledby="problem-solution-title"
        className="marketplace-grid py-16 md:py-24"
        id="masalah"
      >
        <div className="mx-auto max-w-5xl space-y-10 px-6 md:space-y-16">
          <motion.div
            className="relative z-10 mx-auto max-w-2xl space-y-5 text-center"
            initial={{ opacity: 0, y: 24 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.4 }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <span className="marketplace-eyebrow text-orange-dark">Dari ragu jadi yakin</span>
            <h2
              className="text-balance text-4xl leading-tight font-extrabold text-foreground lg:text-5xl"
              id="problem-solution-title"
            >
              Website yang baik mengubah keraguan menjadi tindakan.
            </h2>
            <p className="text-base leading-8 text-body">
              Kami sederhanakan alurnya supaya pengunjung cepat paham, percaya, lalu menghubungi kamu.
            </p>
          </motion.div>

          <ul className="relative mx-auto grid max-w-2xl gap-px overflow-hidden rounded-3xl border border-border bg-border shadow-soft sm:grid-cols-2 lg:max-w-5xl lg:grid-cols-3">
            {features.map(({ icon: Icon, title, description }, index) => (
              <motion.li
                className="group space-y-4 bg-white p-7 transition duration-300 hover:bg-orange-light/40 md:p-10"
                initial={{ opacity: 0, y: 28 }}
                key={title}
                transition={{ duration: 0.5, delay: index * 0.07, ease: "easeOut" }}
                viewport={{ once: true, amount: 0.25 }}
                whileInView={{ opacity: 1, y: 0 }}
              >
                <div className="flex items-center gap-3">
                  <span className="inline-flex size-9 items-center justify-center rounded-xl bg-orange-light text-orange-dark transition duration-300 group-hover:-rotate-3 group-hover:scale-110 group-hover:bg-orange group-hover:text-white">
                    <Icon aria-hidden="true" className="size-4" />
                  </span>
                  <h3 className="text-sm font-bold text-foreground">{title}</h3>
                </div>
                <p className="text-sm leading-6 text-body">{description}</p>
              </motion.li>
            ))}
          </ul>
        </div>
      </section>
    </MotionConfig>
  );
}
