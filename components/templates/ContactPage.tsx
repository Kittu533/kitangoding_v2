import { Clock3, Headphones, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { ButtonLink } from "@/components/atoms/Button";
import { Reveal } from "@/components/atoms/Reveal";
import { FloatingNav, MarketplaceFooter } from "@/components/organisms/MarketplaceShell";
import { siteConfig, whatsappHref } from "@/lib/site";

const locationText = "Sendangadi, Mlati, Sleman";
const mapsHref =
  "https://www.google.com/maps/place/Masjid+Al+Huda/@-7.7345923,110.3624853,15.73z/data=!4m15!1m8!3m7!1s0x2e7a58e9df5f07f7:0x5027a76e35697d0!2sSendangadi,+Kec.+Mlati,+Kabupaten+Sleman,+Daerah+Istimewa+Yogyakarta!3b1!8m2!3d-7.7344501!4d110.3631352!16s%2Fg%2F122dl3lv!3m5!1s0x2e7a59046ee81d17:0x135916f625420e42!8m2!3d-7.737676!4d110.3609135!16s%2Fg%2F11mnkm05q_?entry=ttu";
const contactItems = [
  {
    description: "Pilihan tercepat untuk konsultasi awal.",
    icon: MessageCircle,
    label: "WhatsApp",
    value: siteConfig.phoneDisplay,
    href: whatsappHref,
  },
  {
    description: "Untuk brief atau dokumen yang lebih lengkap.",
    icon: Mail,
    label: "Email",
    value: siteConfig.email,
    href: `mailto:${siteConfig.email}`,
  },
  {
    description: "Hubungi langsung pada jam kerja.",
    icon: Phone,
    label: "Telepon",
    value: siteConfig.phoneDisplay,
    href: `tel:${siteConfig.phoneHref}`,
  },
  {
    description: "Melayani proyek secara lokal maupun remote.",
    icon: MapPin,
    label: "Lokasi",
    value: locationText,
    href: mapsHref,
  },
] as const;

const conversationPoints = [
  "Jenis bisnis dan layanan yang kamu tawarkan",
  "Tujuan utama website yang ingin dibuat",
  "Contoh website atau kisaran budget jika sudah ada",
];

const contactSteps = [
  {
    number: "01",
    title: "Ceritakan kebutuhan",
    description: "Kirim ringkasan singkat lewat WhatsApp atau email. Tidak perlu brief formal.",
  },
  {
    number: "02",
    title: "Kami bantu arahkan",
    description: "Kami pelajari kebutuhanmu lalu menyarankan scope dan langkah paling masuk akal.",
  },
  {
    number: "03",
    title: "Lanjut kalau cocok",
    description: "Estimasi dan tahapan dibahas lebih dulu. Konsultasi awal tidak mengikat.",
  },
];

export function ContactPage() {
  return (
    <div className="marketplace-page min-h-screen bg-market text-foreground">
      <FloatingNav />
      <main id="konten">
        <section className="bg-white py-16 sm:py-20">
          <div className="container-shell grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
            <Reveal>
              <span className="inline-flex items-center gap-2 marketplace-eyebrow text-orange-dark">
                <Headphones aria-hidden="true" className="size-3.5" />
                Hubungi kitangoding.id
              </span>
              <h1 className="mt-4 max-w-3xl !text-4xl !leading-tight !font-bold sm:!text-5xl">
                Mari bicara tentang website yang bisnismu butuhkan.
              </h1>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-body">
                Mulai dari obrolan singkat. Kami bantu merapikan kebutuhan, menentukan scope, dan
                memberi gambaran langkah yang realistis sebelum proyek dimulai.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <ButtonLink
                  href={whatsappHref}
                  icon={<MessageCircle aria-hidden="true" className="size-4" />}
                  rel="noreferrer"
                  target="_blank"
                >
                  Chat via WhatsApp
                </ButtonLink>
                <ButtonLink href={`mailto:${siteConfig.email}`} variant="outline">
                  Kirim Email
                </ButtonLink>
              </div>
            </Reveal>
            <Reveal delay={0.08}>
              <aside className="rounded-3xl border border-border bg-market p-7 md:p-8">
                <p className="marketplace-eyebrow text-success">Biar obrolannya lebih cepat</p>
                <h2 className="mt-4 !text-2xl !font-bold">Cukup siapkan tiga hal ini</h2>
                <ul className="mt-6 space-y-4">
                  {conversationPoints.map((point, index) => (
                    <li className="flex items-start gap-3 leading-7 text-body" key={point}>
                      <span className="flex size-7 flex-none items-center justify-center rounded-full bg-orange-light text-xs font-bold text-orange-dark">
                        {index + 1}
                      </span>
                      {point}
                    </li>
                  ))}
                </ul>
                <div className="mt-7 flex items-center gap-3 border-t border-border pt-5 text-sm text-body">
                  <Clock3 aria-hidden="true" className="size-4 text-orange-dark" />
                  Balasan mengikuti jam kerja, tanpa kewajiban lanjut.
                </div>
              </aside>
            </Reveal>
          </div>
        </section>

        <section className="marketplace-grid py-20">
          <div className="container-shell">
            <Reveal>
              <div className="max-w-2xl">
                <p className="marketplace-eyebrow text-success">Pilih cara menghubungi</p>
                <h2 className="mt-4 !text-3xl !leading-tight sm:!text-4xl">
                  Hubungi lewat kanal yang paling nyaman.
                </h2>
              </div>
            </Reveal>
            <div className="mt-10 grid gap-4 md:grid-cols-2">
            {contactItems.map((item, index) => {
              const Icon = item.icon;

              return (
                <Reveal key={item.label} delay={index * 0.04}>
                  <a
                    className="group flex h-full gap-5 rounded-2xl border border-border bg-white p-6 transition hover:-translate-y-0.5 hover:shadow-card md:p-7"
                    href={item.href}
                    rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    target={item.href.startsWith("http") ? "_blank" : undefined}
                  >
                    <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-orange text-white transition group-hover:bg-orange-dark">
                      <Icon aria-hidden="true" className="size-5" />
                    </span>
                    <span className="min-w-0">
                      <span className="block font-semibold text-foreground">{item.label}</span>
                      <span className="mt-1 block break-words text-sm leading-6 text-body">
                        {item.description}
                      </span>
                      <span className="mt-4 block break-words font-medium text-foreground">
                        {item.value}
                      </span>
                    </span>
                  </a>
                </Reveal>
              );
            })}
            </div>
          </div>
        </section>

        <section className="bg-white py-20">
          <div className="container-shell">
            <Reveal>
              <div className="max-w-2xl">
                <p className="marketplace-eyebrow text-orange-dark">Setelah kamu menghubungi</p>
                <h2 className="mt-4 !text-3xl !leading-tight sm:!text-4xl">
                  Proses awal yang jelas, tanpa langsung terikat proyek.
                </h2>
              </div>
            </Reveal>
            <div className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-3">
              {contactSteps.map((step, index) => (
                <Reveal delay={index * 0.05} key={step.number}>
                  <article className="h-full bg-white p-7 md:p-8">
                    <span className="text-sm font-bold tracking-[0.14em] text-orange-dark">
                      {step.number}
                    </span>
                    <h3 className="mt-6 text-xl font-bold">{step.title}</h3>
                    <p className="mt-3 leading-7 text-body">{step.description}</p>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      </main>
      <MarketplaceFooter />
    </div>
  );
}
