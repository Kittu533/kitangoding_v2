"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { saveLeadSubmission } from "@/app/actions/leads";
import { trackPublicAnalyticsEvent } from "@/lib/analytics-client";

const contactLeadSchema = z.object({
  name: z.string().trim().min(2, "Nama minimal 2 karakter."),
  email: z.string().trim().email("Email tidak valid."),
  message: z.string().trim().min(10, "Ceritakan kebutuhan minimal 10 karakter."),
  honeypot: z.string().max(0).default(""),
});

type ContactLeadValues = z.input<typeof contactLeadSchema>;

export function ContactLeadForm() {
  const [submitError, setSubmitError] = useState("");
  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
  } = useForm<ContactLeadValues>({
    resolver: zodResolver(contactLeadSchema),
    defaultValues: {
      email: "",
      honeypot: "",
      message: "",
      name: "",
    },
  });

  async function onSubmit(values: ContactLeadValues) {
    setSubmitError("");

    const popup = window.open("", "_blank");
    if (popup) {
      popup.opener = null;
    }

    try {
      const result = await saveLeadSubmission({
        email: values.email,
        honeypot: values.honeypot,
        message: values.message,
        name: values.name,
        service: "Kontak Umum",
      });

      if (!result.success) {
        popup?.close();
        trackPublicAnalyticsEvent({
          eventType: "form_submit_error",
          path: window.location.pathname,
          source: "contact_page",
          params: {
            form_name: "contact_page",
            error_reason: result.reason,
          },
        });
        setSubmitError(
          result.reason === "rate_limited"
            ? "Terlalu banyak percobaan. Coba lagi beberapa saat."
            : "Belum bisa mengirim data. Coba lagi sebentar lagi."
        );
        return;
      }

      if (popup) {
        toast.success("Membuka WhatsApp...");
        trackPublicAnalyticsEvent({
          eventType: "lead_submitted",
          path: window.location.pathname,
          source: "contact_page",
          params: {
            form_name: "contact_page",
          },
        });
        popup.location.assign(result.whatsappHref);
        return;
      }

      toast.success("Membuka WhatsApp...");
      trackPublicAnalyticsEvent({
        eventType: "lead_submitted",
        path: window.location.pathname,
        source: "contact_page",
        params: {
          form_name: "contact_page",
        },
      });
      window.location.assign(result.whatsappHref);
    } catch {
      popup?.close();
      setSubmitError("Belum bisa mengirim data. Coba lagi sebentar lagi.");
    }
  }

  return (
    <form className="mx-auto grid max-w-3xl gap-7 text-left" onSubmit={handleSubmit(onSubmit)}>
      <div className="grid gap-6 md:grid-cols-2">
        <label className="grid gap-3 text-[16px] leading-6 font-medium text-foreground">
          Nama kamu
          <input
            className="h-14 rounded-xl border border-border bg-white px-5 text-[16px] leading-6 font-normal text-foreground outline-none transition placeholder:text-black/15 focus:border-success focus:ring-4 focus:ring-success/10"
            placeholder="Masukkan nama"
            type="text"
            {...register("name")}
          />
          {errors.name ? <span className="text-sm font-medium text-orange-glow">{errors.name.message}</span> : null}
        </label>

        <label className="grid gap-3 text-[16px] leading-6 font-medium text-foreground">
          Email kamu
          <input
            className="h-14 rounded-xl border border-border bg-white px-5 text-[16px] leading-6 font-normal text-foreground outline-none transition placeholder:text-black/15 focus:border-success focus:ring-4 focus:ring-success/10"
            placeholder="Masukkan email"
            type="email"
            {...register("email")}
          />
          {errors.email ? <span className="text-sm font-medium text-orange-glow">{errors.email.message}</span> : null}
        </label>
      </div>

      <label className="grid gap-3 text-[16px] leading-6 font-medium text-foreground">
        Tulis kebutuhanmu
        <textarea
          className="min-h-36 resize-none rounded-xl border border-border bg-white px-5 py-4 text-[16px] leading-6 font-normal text-foreground outline-none transition placeholder:text-black/15 focus:border-success focus:ring-4 focus:ring-success/10"
          placeholder="Contoh: Saya ingin website untuk usaha kuliner, ada katalog menu dan tombol WhatsApp."
          {...register("message")}
        />
        {errors.message ? <span className="text-sm font-medium text-orange-glow">{errors.message.message}</span> : null}
      </label>

      <input className="hidden" autoComplete="off" tabIndex={-1} type="text" {...register("honeypot")} />

      <div className="text-center">
        <button
          className="inline-flex rounded-xl bg-ink px-7 py-4 text-[14px] leading-[17px] font-medium text-white shadow-soft transition hover:-translate-y-0.5 hover:bg-navy active:translate-y-0"
          disabled={isSubmitting}
          type="submit"
        >
          {isSubmitting ? "Sending..." : "Send Message"}
        </button>
      </div>

      {submitError ? <p className="text-center text-sm font-medium text-orange-glow">{submitError}</p> : null}
    </form>
  );
}
