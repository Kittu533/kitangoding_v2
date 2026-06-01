"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Send } from "lucide-react";
import type { ReactNode } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { createWhatsAppHref } from "@/lib/site";

const leadSchema = z.object({
  name: z.string().min(2, "Nama minimal 2 karakter."),
  business: z.string().min(2, "Nama bisnis perlu diisi."),
  need: z.string().min(1, "Pilih kebutuhan website."),
  message: z.string().min(10, "Ceritakan kebutuhan minimal 10 karakter."),
});

type LeadFormValue = z.infer<typeof leadSchema>;

export function LeadForm() {
  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
  } = useForm<LeadFormValue>({
    resolver: zodResolver(leadSchema),
    defaultValues: {
      need: "Company profile",
    },
  });

  function onSubmit(value: LeadFormValue) {
    const message = [
      "Halo Kita Ngoding, saya ingin konsultasi website.",
      `Nama: ${value.name}`,
      `Bisnis: ${value.business}`,
      `Kebutuhan: ${value.need}`,
      `Catatan: ${value.message}`,
    ].join("\n");

    window.open(createWhatsAppHref(message), "_blank", "noopener,noreferrer");
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
          {...register("name")}
        />
      </Field>
      <Field label="Nama bisnis" error={errors.business?.message}>
        <input
          className="w-full rounded-lg border border-white/15 bg-white px-4 py-3 text-sm text-foreground"
          placeholder="Contoh: Roti Oven Mbak Sari"
          {...register("business")}
        />
      </Field>
      <Field label="Kebutuhan" error={errors.need?.message}>
        <select
          className="w-full rounded-lg border border-white/15 bg-white px-4 py-3 text-sm text-foreground"
          {...register("need")}
        >
          <option>Company profile</option>
          <option>Landing page campaign</option>
          <option>Toko online UMKM</option>
          <option>Redesign website lama</option>
        </select>
      </Field>
      <Field className="md:row-span-2" label="Catatan singkat" error={errors.message?.message}>
        <textarea
          className="min-h-32 w-full resize-none rounded-lg border border-white/15 bg-white px-4 py-3 text-sm text-foreground"
          placeholder="Ceritakan produk, target pelanggan, atau masalah website sekarang."
          {...register("message")}
        />
      </Field>
      <button
        className="inline-flex items-center justify-center gap-2 rounded-lg bg-orange px-5 py-3 text-sm font-semibold text-white hover:bg-orange-dark disabled:cursor-not-allowed disabled:opacity-70"
        disabled={isSubmitting}
        type="submit"
      >
        Kirim ke WhatsApp
        <Send aria-hidden="true" className="size-4" />
      </button>
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
