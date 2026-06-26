"use client";

import type { FormEvent, ReactNode } from "react";
import { useState } from "react";
import { saveLeadSubmission } from "@/app/actions/leads";
import { trackPublicAnalyticsEvent } from "@/lib/analytics-client";

const projectTypes = [
  "Website company profile",
  "Landing page promosi",
  "Katalog produk",
  "Toko online sederhana",
  "Custom UI/UX",
] as const;

const budgetOptions = [
  "Di bawah 2 juta",
  "2 juta - 5 juta",
  "5 juta - 10 juta",
  "Di atas 10 juta",
  "Diskusi dulu",
] as const;

export function ProjectInquiryForm() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [projectType, setProjectType] = useState<(typeof projectTypes)[number]>(projectTypes[0]);
  const [budget, setBudget] = useState<(typeof budgetOptions)[number]>(budgetOptions[1]);
  const [description, setDescription] = useState("");
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
        budget,
        business: company,
        email,
        honeypot,
        message: description,
        name: fullName,
        phone,
        service: projectType,
      });

      if (!result.success) {
        popup?.close();
        trackPublicAnalyticsEvent({
          eventType: "form_submit_error",
          path: window.location.pathname,
          source: "project_inquiry",
          params: {
            budget_range: budget,
            error_reason: result.reason,
            form_name: "project_inquiry",
            project_type: projectType,
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
          source: "project_inquiry",
          params: {
            budget_range: budget,
            form_name: "project_inquiry",
            project_type: projectType,
          },
        });
        popup.location.assign(result.whatsappHref);
        return;
      }

      trackPublicAnalyticsEvent({
        eventType: "lead_submitted",
        path: window.location.pathname,
        source: "project_inquiry",
        params: {
          budget_range: budget,
          form_name: "project_inquiry",
          project_type: projectType,
        },
      });
      window.location.assign(result.whatsappHref);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className="mx-auto grid max-w-4xl gap-7 text-left" onSubmit={handleSubmit}>
      <div className="grid gap-7 md:grid-cols-2">
        <Field label="Full Name">
          <input
            className={fieldClass}
            onChange={(event) => setFullName(event.target.value)}
            placeholder="Jane Doe"
            minLength={2}
            required
            type="text"
            value={fullName}
          />
        </Field>
        <Field label="Email Address">
          <input
            className={fieldClass}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="info@email.com"
            required
            type="email"
            value={email}
          />
        </Field>
        <Field label="Phone Number">
          <input
            className={fieldClass}
            onChange={(event) => setPhone(event.target.value)}
            placeholder="Eg. +62 812 3456 7890"
            type="tel"
            value={phone}
          />
        </Field>
        <Field label="Company Name (Opt)">
          <input
            className={fieldClass}
            onChange={(event) => setCompany(event.target.value)}
            placeholder="Nama bisnis kamu"
            type="text"
            value={company}
          />
        </Field>
        <Field label="Project Type">
          <select
            className={fieldClass}
            onChange={(event) => setProjectType(event.target.value as (typeof projectTypes)[number])}
            value={projectType}
          >
            {projectTypes.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        </Field>
        <Field label="Project Budget">
          <select
            className={fieldClass}
            onChange={(event) => setBudget(event.target.value as (typeof budgetOptions)[number])}
            value={budget}
          >
            {budgetOptions.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        </Field>
      </div>

        <Field label="Project Description">
          <textarea
            className={`${fieldClass} min-h-36 resize-none py-4`}
            onChange={(event) => setDescription(event.target.value)}
            placeholder="Jelaskan singkat kebutuhan project kamu"
            minLength={10}
            required
            value={description}
          />
        </Field>

      <input
        className="hidden"
        autoComplete="off"
        name="website"
        tabIndex={-1}
        type="text"
        value={honeypot}
        onChange={(event) => setHoneypot(event.target.value)}
      />

      <button
        className="w-fit rounded-xl bg-ink px-7 py-4 text-[14px] leading-[17px] font-medium text-white shadow-soft transition hover:-translate-y-0.5 hover:bg-navy active:translate-y-0"
        disabled={loading}
        type="submit"
      >
        {loading ? "Sending..." : "Send Inquiry"}
      </button>

      {submitError ? <p className="text-sm font-medium text-orange-glow">{submitError}</p> : null}
    </form>
  );
}

function Field({ children, label }: { children: ReactNode; label: string }) {
  return (
    <label className="grid gap-3 text-[16px] leading-6 font-medium text-foreground">
      {label}
      {children}
    </label>
  );
}

const fieldClass =
  "h-14 rounded-xl border border-border bg-white px-5 text-[16px] leading-6 font-normal text-foreground outline-none transition placeholder:text-muted/70 focus:border-success focus:ring-4 focus:ring-success/10";
