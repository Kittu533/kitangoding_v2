"use client";

import type { FormEvent, ReactNode } from "react";
import { useState } from "react";
import { createWhatsAppHref } from "@/lib/site";

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
  const [projectType, setProjectType] = useState(projectTypes[0]);
  const [budget, setBudget] = useState(budgetOptions[1]);
  const [description, setDescription] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const message = [
      "Halo Kita Ngoding, saya ingin mengirim project inquiry.",
      `Nama: ${fullName || "-"}`,
      `Email: ${email || "-"}`,
      `No. HP: ${phone || "-"}`,
      `Bisnis/Perusahaan: ${company || "-"}`,
      `Tipe project: ${projectType}`,
      `Budget: ${budget}`,
      `Deskripsi: ${description || "-"}`,
    ].join("\n");

    window.open(createWhatsAppHref(message), "_blank", "noopener,noreferrer");
  }

  return (
    <form className="mx-auto grid max-w-4xl gap-7 text-left" onSubmit={handleSubmit}>
      <div className="grid gap-7 md:grid-cols-2">
        <Field label="Full Name">
          <input
            className={fieldClass}
            onChange={(event) => setFullName(event.target.value)}
            placeholder="Jane Doe"
            type="text"
            value={fullName}
          />
        </Field>
        <Field label="Email Address">
          <input
            className={fieldClass}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="info@email.com"
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
            onChange={(event) => setProjectType(event.target.value)}
            value={projectType}
          >
            {projectTypes.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        </Field>
        <Field label="Project Budget">
          <select className={fieldClass} onChange={(event) => setBudget(event.target.value)} value={budget}>
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
          value={description}
        />
      </Field>

      <button
        className="w-fit rounded-xl bg-ink px-7 py-4 text-[14px] leading-[17px] font-medium text-white shadow-soft transition hover:-translate-y-0.5 hover:bg-navy active:translate-y-0"
        type="submit"
      >
        Send Inquiry
      </button>
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
