"use client";

import type { FormEvent } from "react";
import { useState } from "react";
import { saveLeadSubmission } from "@/app/actions/leads";
import { trackPublicAnalyticsEvent } from "@/lib/analytics-client";

export function ContactLeadForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setSubmitError("");
    setLoading(true);

    const popup = window.open("", "_blank");
    if (popup) {
      popup.opener = null;
    }

    try {
      const result = await saveLeadSubmission({
        email,
        honeypot,
        message,
        name,
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

      trackPublicAnalyticsEvent({
        eventType: "lead_submitted",
        path: window.location.pathname,
        source: "contact_page",
        params: {
          form_name: "contact_page",
        },
      });
      window.location.assign(result.whatsappHref);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className="mx-auto grid max-w-3xl gap-7 text-left" onSubmit={handleSubmit}>
      <div className="grid gap-6 md:grid-cols-2">
        <label className="grid gap-3 text-[16px] leading-6 font-medium text-foreground">
          Nama kamu
          <input
            className="h-14 rounded-xl border border-border bg-white px-5 text-[16px] leading-6 font-normal text-foreground outline-none transition placeholder:text-black/15 focus:border-success focus:ring-4 focus:ring-success/10"
            name="name"
            onChange={(event) => setName(event.target.value)}
            placeholder="Masukkan nama"
            minLength={2}
            required
            type="text"
            value={name}
          />
        </label>

        <label className="grid gap-3 text-[16px] leading-6 font-medium text-foreground">
          Email kamu
          <input
            className="h-14 rounded-xl border border-border bg-white px-5 text-[16px] leading-6 font-normal text-foreground outline-none transition placeholder:text-black/15 focus:border-success focus:ring-4 focus:ring-success/10"
            name="email"
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Masukkan email"
            required
            type="email"
            value={email}
          />
        </label>
      </div>

      <label className="grid gap-3 text-[16px] leading-6 font-medium text-foreground">
        Tulis kebutuhanmu
        <textarea
          className="min-h-36 resize-none rounded-xl border border-border bg-white px-5 py-4 text-[16px] leading-6 font-normal text-foreground outline-none transition placeholder:text-black/15 focus:border-success focus:ring-4 focus:ring-success/10"
          name="message"
          onChange={(event) => setMessage(event.target.value)}
          placeholder="Contoh: Saya ingin website untuk usaha kuliner, ada katalog menu dan tombol WhatsApp."
          minLength={10}
          required
          value={message}
        />
      </label>

      <input
        className="hidden"
        autoComplete="off"
        name="website"
        tabIndex={-1}
        type="text"
        value={honeypot}
        onChange={(event) => setHoneypot(event.target.value)}
      />

      <div className="text-center">
        <button
          className="inline-flex rounded-xl bg-ink px-7 py-4 text-[14px] leading-[17px] font-medium text-white shadow-soft transition hover:-translate-y-0.5 hover:bg-navy active:translate-y-0"
          disabled={loading}
          type="submit"
        >
          {loading ? "Sending..." : "Send Message"}
        </button>
      </div>

      {submitError ? <p className="text-center text-sm font-medium text-orange-glow">{submitError}</p> : null}
    </form>
  );
}
