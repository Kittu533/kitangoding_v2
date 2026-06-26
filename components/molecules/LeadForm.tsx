"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Send } from "lucide-react";
import type { ReactNode } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { saveLeadSubmission } from "@/app/actions/leads";

const leadSchema = z.object({
  name: z.string().trim().min(2, "Nama minimal 2 karakter."),
  email: z.string().trim().email("Email tidak valid."),
  business: z.string().trim().min(2, "Nama bisnis perlu diisi."),
  need: z.string().trim().min(1, "Pilih kebutuhan website."),
  message: z.string().trim().min(10, "Ceritakan kebutuhan minimal 10 karakter."),
  honeypot: z.string().max(0).default(""),
});

type LeadFormValue = z.input<typeof leadSchema>;

export function LeadForm() {
  const [submitError, setSubmitError] = useState("");
  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
  } = useForm<LeadFormValue>({
    resolver: zodResolver(leadSchema),
    defaultValues: {
      email: "",
      need: "Company profile",
      honeypot: "",
    },
  });

  async function onSubmit(value: LeadFormValue) {
    setSubmitError("");

    const popup = window.open("", "_blank");
    if (popup) {
      popup.opener = null;
    }

    const result = await saveLeadSubmission({
      business: value.business,
      email: value.email,
      honeypot: value.honeypot,
      message: value.message,
      name: value.name,
      service: value.need,
    });

    if (!result.success) {
      popup?.close();

      setSubmitError(
        result.reason === "rate_limited"
          ? "Terlalu banyak percobaan. Coba lagi beberapa saat."
          : "Belum bisa mengirim data. Coba lagi sebentar lagi."
      );
      return;
    }

    if (popup) {
      popup.location.href = result.whatsappHref;
      return;
    }

    window.location.href = result.whatsappHref;
  }

  return (
    <form
      className="grid gap-4 rounded-lg border border-white/10 bg-white/10 p-5 text-left backdrop-blur md:grid-cols-2"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Field label="Nama" error={errors.name?.message}>
        <input
          className="w-full rounded-lg border border-white/15 bg-white px-4 py-3 text-sm text-foreground"
          placeholder="Nama kamu"
          required
          {...register("name")}
        />
      </Field>
      <Field label="Email" error={errors.email?.message}>
        <input
          className="w-full rounded-lg border border-white/15 bg-white px-4 py-3 text-sm text-foreground"
          placeholder="nama@email.com"
          type="email"
          required
          {...register("email")}
        />
      </Field>
      <Field label="Nama bisnis" error={errors.business?.message}>
        <input
          className="w-full rounded-lg border border-white/15 bg-white px-4 py-3 text-sm text-foreground"
          placeholder="Contoh: Roti Oven Mbak Sari"
          required
          {...register("business")}
        />
      </Field>
      <Field label="Kebutuhan" error={errors.need?.message}>
        <select
          className="w-full rounded-lg border border-white/15 bg-white px-4 py-3 text-sm text-foreground"
          required
          {...register("need")}
        >
          <option>Company profile</option>
          <option>Landing page campaign</option>
          <option>Toko online UMKM</option>
          <option>Redesign website lama</option>
        </select>
      </Field>
      <Field className="md:col-span-2" label="Catatan singkat" error={errors.message?.message}>
        <textarea
          className="min-h-32 w-full resize-none rounded-lg border border-white/15 bg-white px-4 py-3 text-sm text-foreground"
          placeholder="Ceritakan produk, target pelanggan, atau masalah website sekarang."
          required
          {...register("message")}
        />
      </Field>
      <input className="hidden" tabIndex={-1} {...register("honeypot")} />
      <button
        className="inline-flex items-center justify-center gap-2 rounded-lg bg-orange px-5 py-3 text-sm font-semibold text-white hover:bg-orange-dark disabled:cursor-not-allowed disabled:opacity-70 md:col-span-2"
        disabled={isSubmitting}
        type="submit"
      >
        Kirim ke WhatsApp
        <Send aria-hidden="true" className="size-4" />
      </button>
      {submitError ? (
        <p className="text-sm font-medium text-orange-glow md:col-span-2">{submitError}</p>
      ) : null}
    </form>
  );
}

function Field({
  children,
  className,
  error,
  label,
}: {
  children: ReactNode;
  className?: string;
  error?: string;
  label: string;
}) {
  return (
    <label className={className}>
      <span className="mb-2 block text-sm font-semibold text-white">{label}</span>
      {children}
      {error ? <span className="mt-2 block text-xs font-medium text-orange-glow">{error}</span> : null}
    </label>
  );
}
