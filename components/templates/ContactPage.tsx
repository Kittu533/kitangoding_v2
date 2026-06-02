import { Headphones, Mail, MapPin, Phone, Route } from "lucide-react";
import { Reveal } from "@/components/atoms/Reveal";
import { ContactLeadForm } from "@/components/molecules/ContactLeadForm";
import { FloatingNav, MarketplaceFooter } from "@/components/organisms/MarketplaceShell";
import { siteConfig } from "@/lib/site";

const locationText = "Sendangadi, Mlati, Sleman";
const mapsHref =
  "https://www.google.com/maps/place/Masjid+Al+Huda/@-7.7345923,110.3624853,15.73z/data=!4m15!1m8!3m7!1s0x2e7a58e9df5f07f7:0x5027a76e35697d0!2sSendangadi,+Kec.+Mlati,+Kabupaten+Sleman,+Daerah+Istimewa+Yogyakarta!3b1!8m2!3d-7.7344501!4d110.3631352!16s%2Fg%2F122dl3lv!3m5!1s0x2e7a59046ee81d17:0x135916f625420e42!8m2!3d-7.737676!4d110.3609135!16s%2Fg%2F11mnkm05q_?entry=ttu";
const mapsEmbedSrc =
  "https://maps.google.com/maps?q=Masjid%20Al%20Huda%2C%20Sendangadi%2C%20Mlati%2C%20Sleman&t=&z=15&ie=UTF8&iwloc=&output=embed";

const contactItems = [
  {
    icon: Mail,
    label: "Write Email",
    value: siteConfig.email,
    href: `mailto:${siteConfig.email}`,
  },
  {
    icon: Phone,
    label: "Make a call",
    value: siteConfig.phoneDisplay,
    href: `tel:${siteConfig.phoneHref}`,
  },
  {
    icon: MapPin,
    label: "Location",
    value: locationText,
    href: mapsHref,
  },
] as const;

export function ContactPage() {
  return (
    <div className="marketplace-page min-h-screen bg-market text-foreground">
      <FloatingNav />
      <main id="konten">
        <section className="marketplace-grid pt-24 pb-16">
          <div className="container-shell text-center">
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-lg border border-success/20 bg-white/80 px-3 py-2 marketplace-eyebrow text-success shadow-sm backdrop-blur">
                <Headphones aria-hidden="true" className="size-3.5" />
                Contact
              </span>
              <h1 className="mx-auto mt-8 max-w-4xl text-5xl leading-tight font-extrabold text-foreground md:text-6xl">
                Get in touch with us
              </h1>
              <p className="mx-auto mt-5 max-w-2xl marketplace-hero-copy">
                Ceritakan kebutuhan website kamu. Kami bantu arahkan paket, struktur halaman, dan
                langkah paling masuk akal untuk mulai.
              </p>
            </Reveal>
          </div>
        </section>

        <section className="marketplace-grid pb-16">
          <div className="container-shell">
            <Reveal>
              <ContactLeadForm />
            </Reveal>
          </div>
        </section>

        <section className="marketplace-grid py-12">
          <div className="container-shell grid gap-px overflow-hidden rounded-xl border border-border bg-border md:grid-cols-3">
            {contactItems.map((item, index) => {
              const Icon = item.icon;

              return (
                <Reveal key={item.label} delay={index * 0.04}>
                  <a className="group flex gap-5 bg-market p-8" href={item.href} rel="noreferrer" target={item.href.startsWith("http") ? "_blank" : undefined}>
                    <span className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-border bg-white text-foreground transition group-hover:border-success group-hover:text-success">
                      <Icon aria-hidden="true" className="size-5" />
                    </span>
                    <span>
                      <span className="block text-[14px] leading-[17px] font-medium text-muted">{item.label}</span>
                      <span className="mt-3 block text-[16px] leading-6 font-medium text-foreground">
                        {item.value}
                      </span>
                    </span>
                  </a>
                </Reveal>
              );
            })}
          </div>
        </section>

        <section className="marketplace-grid pb-16">
          <div className="container-shell">
            <Reveal>
              <div className="relative h-[420px] overflow-hidden rounded-3xl border border-border bg-[#edf2f5] shadow-sm">
              <iframe
                className="absolute inset-0 h-full w-full grayscale-[0.2]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                src={mapsEmbedSrc}
                title="Lokasi Kita Ngoding di Sendangadi, Mlati, Sleman"
              />
              <div aria-hidden="true" className="absolute inset-0 bg-white/20" />
              <div className="absolute left-4 top-4 w-[calc(100%-2rem)] rounded-2xl border border-white/70 bg-white/90 p-5 text-foreground shadow-soft backdrop-blur md:left-1/2 md:top-10 md:w-[420px] md:-translate-x-1/2">
                <div className="flex items-start gap-4">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-border bg-market text-success">
                    <MapPin aria-hidden="true" className="size-5" />
                  </span>
                  <div>
                    <p className="text-[16px] leading-6 font-medium">{locationText}</p>
                    <p className="mt-1 text-sm leading-6 text-muted">Area Sleman, DI Yogyakarta</p>
                    <a
                      className="mt-4 inline-flex items-center gap-2 text-[14px] leading-[17px] font-medium text-success hover:text-foreground"
                      href={mapsHref}
                      rel="noreferrer"
                      target="_blank"
                    >
                      Get Direction
                      <Route aria-hidden="true" className="size-4" />
                    </a>
                  </div>
                </div>
              </div>
              <div className="absolute bottom-24 left-1/2 flex size-9 -translate-x-1/2 items-center justify-center rounded-full bg-white shadow-soft">
                <span className="size-4 rounded-full bg-success" />
              </div>
              </div>
            </Reveal>
          </div>
        </section>
      </main>
      <MarketplaceFooter />
    </div>
  );
}
