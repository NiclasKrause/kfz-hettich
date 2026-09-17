"use client";

import { useId, useState, type FormEvent } from "react";
import { useSearchParams } from "next/navigation";
import { company } from "@/data/company";
import { cn } from "@/lib/cn";

const topics = ["Inspektion", "HU", "Reifen", "Reparatur", "Unfall", "Sonstiges"] as const;

const inputClasses =
  "w-full border-0 border-b border-border bg-transparent py-2.5 text-base text-text outline-none transition-colors placeholder:text-text-muted focus:border-accent";

export function ContactForm() {
  const searchParams = useSearchParams();
  const preselected = searchParams.get("thema") ?? "";
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const formId = useId();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setError(null);
    const data = new FormData(event.currentTarget);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          topic: data.get("topic"),
          name: data.get("name"),
          email: data.get("email"),
          phone: data.get("phone"),
          message: data.get("message"),
          privacyAccepted: data.get("privacy") === "on",
          website: data.get("website") || "",
        }),
      });
      if (!res.ok) throw new Error();
      setSubmitted(true);
    } catch {
      setError("Senden fehlgeschlagen. Bitte versuchen Sie es erneut oder rufen Sie uns an.");
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div className="border border-border bg-surface p-8">
        <p className="font-display text-xl font-bold">Danke für Ihre Anfrage.</p>
        <p className="mt-3 text-sm leading-relaxed text-text-muted">
          Wir melden uns zeitnah bei Ihnen. In dringenden Fällen erreichen Sie uns
          telefonisch unter{" "}
          <a href={`tel:${company.phoneHref}`} className="underline">
            {company.phoneDisplay}
          </a>
          .
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
      {/* Honeypot – für Menschen unsichtbar, Bots füllen es oft trotzdem aus */}
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

      <Field label="Thema" htmlFor={`${formId}-topic`}>
        <select
          id={`${formId}-topic`}
          name="topic"
          defaultValue={(topics as readonly string[]).includes(preselected) ? preselected : topics[0]}
          required
          className={cn(inputClasses, "bg-transparent")}
        >
          {topics.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </Field>
      <Field label="Name" htmlFor={`${formId}-name`}>
        <input id={`${formId}-name`} name="name" required className={inputClasses} />
      </Field>
      <Field label="E-Mail" htmlFor={`${formId}-email`}>
        <input id={`${formId}-email`} name="email" type="email" required className={inputClasses} />
      </Field>
      <Field label="Telefon" htmlFor={`${formId}-phone`}>
        <input id={`${formId}-phone`} name="phone" type="tel" className={inputClasses} />
      </Field>

      <Field label="Nachricht" htmlFor={`${formId}-message`} full>
        <textarea id={`${formId}-message`} name="message" rows={4} required className={cn(inputClasses, "resize-none")} />
      </Field>

      <div className="flex items-start gap-3 sm:col-span-2">
        <input
          id={`${formId}-privacy`}
          name="privacy"
          type="checkbox"
          required
          className="mt-1 h-4 w-4 shrink-0 border border-border accent-[var(--color-accent)]"
        />
        <label htmlFor={`${formId}-privacy`} className="text-xs leading-relaxed text-text-muted">
          Ich stimme zu, dass meine Angaben zur Bearbeitung meiner Anfrage gespeichert
          werden. Weitere Informationen in der Datenschutzerklärung.
        </label>
      </div>

      {error ? <p className="text-sm text-accent sm:col-span-2">{error}</p> : null}

      <button
        type="submit"
        disabled={submitting}
        className="mt-2 inline-flex w-fit items-center gap-2 bg-accent px-6 py-3.5 text-sm font-semibold uppercase tracking-wide text-white transition-colors hover:bg-accent-dark disabled:opacity-40 sm:col-span-2"
      >
        {submitting ? "Wird gesendet…" : "Anfrage senden"}
      </button>
    </form>
  );
}

function Field({
  label,
  htmlFor,
  children,
  full,
}: {
  label: string;
  htmlFor: string;
  children: React.ReactNode;
  full?: boolean;
}) {
  return (
    <div className={cn("flex flex-col gap-2", full && "sm:col-span-2")}>
      <label htmlFor={htmlFor} className="text-xs font-semibold uppercase tracking-widest text-text-muted">
        {label}
      </label>
      {children}
    </div>
  );
}
