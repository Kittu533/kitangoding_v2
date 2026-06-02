"use client";

import type { FormEvent } from "react";
import { useState } from "react";
import { createWhatsAppHref } from "@/lib/site";

export function ContactLeadForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const whatsappMessage = [
      "Halo Kita Ngoding, saya ingin konsultasi website.",
      `Nama: ${name || "-"}`,
      `Email: ${email || "-"}`,
      `Pesan: ${message || "-"}`,
    ].join("\n");

    window.open(createWhatsAppHref(whatsappMessage), "_blank", "noopener,noreferrer");
  }

  return (
    <form className="mx-auto grid max-w-3xl gap-7 text-left" onSubmit={handleSubmit}>
      <div className="grid gap-6 md:grid-cols-2">
        <label className="grid gap-3 text-[16px] leading-6 font-medium text-foreground">
          Nama kamu
          <input
            className="h-14 rounded-xl border border-border bg-white px-5 text-[16px] leading-6 font-normal text-foreground outline-none transition placeholder:text-muted/70 focus:border-success focus:ring-4 focus:ring-success/10"
            name="name"
            onChange={(event) => setName(event.target.value)}
            placeholder="Masukkan nama"
            type="text"
            value={name}
          />
        </label>

        <label className="grid gap-3 text-[16px] leading-6 font-medium text-foreground">
          Email kamu
          <input
            className="h-14 rounded-xl border border-border bg-white px-5 text-[16px] leading-6 font-normal text-foreground outline-none transition placeholder:text-muted/70 focus:border-success focus:ring-4 focus:ring-success/10"
            name="email"
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Masukkan email"
            type="email"
            value={email}
          />
        </label>
      </div>

      <label className="grid gap-3 text-[16px] leading-6 font-medium text-foreground">
        Tulis kebutuhanmu
        <textarea
          className="min-h-36 resize-none rounded-xl border border-border bg-white px-5 py-4 text-[16px] leading-6 font-normal text-foreground outline-none transition placeholder:text-muted/70 focus:border-success focus:ring-4 focus:ring-success/10"
          name="message"
          onChange={(event) => setMessage(event.target.value)}
          placeholder="Contoh: Saya ingin website untuk usaha kuliner, ada katalog menu dan tombol WhatsApp."
          value={message}
        />
      </label>

      <div className="text-center">
        <button
          className="inline-flex rounded-xl bg-ink px-7 py-4 text-[14px] leading-[17px] font-medium text-white shadow-soft transition hover:-translate-y-0.5 hover:bg-navy active:translate-y-0"
          type="submit"
        >
          Send Message
        </button>
      </div>
    </form>
  );
}
