"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import type { ReactNode } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
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

const projectInquirySchema = z.object({
  fullName: z.string().trim().min(2, "Nama minimal 2 karakter."),
  email: z.string().trim().email("Email tidak valid."),
  phone: z.string().trim().max(50).optional(),
  company: z.string().trim().max(255).optional(),
  projectType: z.enum(projectTypes),
  budget: z.enum(budgetOptions),
  description: z.string().trim().min(10, "Jelaskan kebutuhan minimal 10 karakter."),
  honeypot: z.string().max(0).default(""),
});

type ProjectInquiryValues = z.input<typeof projectInquirySchema>;

export function ProjectInquiryForm() {
  const [submitError, setSubmitError] = useState("");
  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
  } = useForm<ProjectInquiryValues>({
    resolver: zodResolver(projectInquirySchema),
    defaultValues: {
      budget: budgetOptions[1],
      company: "",
      description: "",
      email: "",
      fullName: "",
      honeypot: "",
      phone: "",
      projectType: projectTypes[0],
    },
  });

  async function onSubmit(values: ProjectInquiryValues) {
    setSubmitError("");

    const popup = window.open("", "_blank");
    if (popup) {
      popup.opener = null;
    }

    try {
      const result = await saveLeadSubmission({
        budget: values.budget,
        business: values.company,
        email: values.email,
        honeypot: values.honeypot,
        message: values.description,
        name: values.fullName,
        phone: values.phone,
        service: values.projectType,
      });

      if (!result.success) {
        popup?.close();
        trackPublicAnalyticsEvent({
          eventType: "form_submit_error",
          path: window.location.pathname,
          source: "project_inquiry",
          params: {
            budget_range: values.budget,
            error_reason: result.reason,
            form_name: "project_inquiry",
            project_type: values.projectType,
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
          source: "project_inquiry",
          params: {
            budget_range: values.budget,
            form_name: "project_inquiry",
            project_type: values.projectType,
          },
        });
        popup.location.assign(result.whatsappHref);
        return;
      }

      toast.success("Membuka WhatsApp...");
      trackPublicAnalyticsEvent({
        eventType: "lead_submitted",
        path: window.location.pathname,
        source: "project_inquiry",
        params: {
          budget_range: values.budget,
          form_name: "project_inquiry",
          project_type: values.projectType,
        },
      });
      window.location.assign(result.whatsappHref);
    } catch {
      popup?.close();
      setSubmitError("Belum bisa mengirim data. Coba lagi sebentar lagi.");
    }
  }

  return (
    <form className="mx-auto grid max-w-4xl gap-7 text-left" onSubmit={handleSubmit(onSubmit)}>
      <div className="grid gap-7 md:grid-cols-2">
        <Field error={errors.fullName?.message} label="Full Name">
          <input
            className={fieldClass}
            placeholder="Jane Doe"
            type="text"
            {...register("fullName")}
          />
        </Field>
        <Field error={errors.email?.message} label="Email Address">
          <input
            className={fieldClass}
            placeholder="info@email.com"
            type="email"
            {...register("email")}
          />
        </Field>
        <Field error={errors.phone?.message} label="Phone Number">
          <input
            className={fieldClass}
            placeholder="Eg. +62 812 3456 7890"
            type="tel"
            {...register("phone")}
          />
        </Field>
        <Field error={errors.company?.message} label="Company Name (Opt)">
          <input
            className={fieldClass}
            placeholder="Nama bisnis kamu"
            type="text"
            {...register("company")}
          />
        </Field>
        <Field error={errors.projectType?.message} label="Project Type">
          <select className={fieldClass} {...register("projectType")}>
            {projectTypes.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </Field>
        <Field error={errors.budget?.message} label="Project Budget">
          <select className={fieldClass} {...register("budget")}>
            {budgetOptions.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </Field>
      </div>

        <Field error={errors.description?.message} label="Project Description">
          <textarea
            className={`${fieldClass} min-h-36 resize-none py-4`}
            placeholder="Jelaskan singkat kebutuhan project kamu"
            {...register("description")}
          />
        </Field>

      <input className="hidden" autoComplete="off" tabIndex={-1} type="text" {...register("honeypot")} />

      <button
        className="w-fit rounded-xl bg-ink px-7 py-4 text-[14px] leading-[17px] font-medium text-white shadow-soft transition hover:-translate-y-0.5 hover:bg-navy active:translate-y-0"
        disabled={isSubmitting}
        type="submit"
      >
        {isSubmitting ? "Sending..." : "Send Inquiry"}
      </button>

      {submitError ? <p className="text-sm font-medium text-orange-glow">{submitError}</p> : null}
    </form>
  );
}

function Field({ children, error, label }: { children: ReactNode; error?: string; label: string }) {
  return (
    <label className="grid gap-3 text-[16px] leading-6 font-medium text-foreground">
      {label}
      {children}
      {error ? <span className="text-sm font-medium text-orange-glow">{error}</span> : null}
    </label>
  );
}

const fieldClass =
  "h-14 rounded-xl border border-border bg-white px-5 text-[16px] leading-6 font-normal text-foreground outline-none transition placeholder:text-muted/70 focus:border-success focus:ring-4 focus:ring-success/10";
