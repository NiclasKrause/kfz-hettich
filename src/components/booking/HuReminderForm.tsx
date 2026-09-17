"use client";

import { useState, type FormEvent } from "react";
import { cn } from "@/lib/cn";

const inputClasses =
  "w-full border-0 border-b border-border bg-transparent py-2.5 text-base text-text outline-none transition-colors placeholder:text-text-muted focus:border-accent";

const months = [
  "Januar", "Februar", "März", "April", "Mai", "Juni",
  "Juli", "August", "September", "Oktober", "November", "Dezember",
];

export function HuReminderForm() {
  const [licensePlate, setLicensePlate] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [huMonth, setHuMonth] = useState(1);
  const [huYear, setHuYear] = useState(new Date().getFullYear());
  const [privacyAccepted, setPrivacyAccepted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/hu/reminder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ licensePlate, name, email, huMonth, huYear, privacyAccepted }),
      });
      if (!res.ok) throw new Error();
      setDone(true);
    } catch {
      setError("Das hat leider nicht geklappt. Bitte versuchen Sie es erneut.");
    } finally {
      setSubmitting(false);
    }
  }

  if (done) {
    return (
      <div className="border border-border bg-surface p-6">
        <p className="font-display text-lg font-bold">Erinnerung aktiviert.</p>
        <p className="mt-2 text-sm text-text-muted">
          Wir melden uns rechtzeitig vor Ihrem HU-Termin bei Ihnen.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6 sm:grid-cols-2">
      <div className="flex flex-col gap-2">
        <label className="text-xs font-semibold uppercase tracking-widest text-text-muted">
          Kennzeichen
        </label>
        <input
          required
          value={licensePlate}
          onChange={(e) => setLicensePlate(e.target.value.toUpperCase())}
          className={inputClasses}
        />
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-xs font-semibold uppercase tracking-widest text-text-muted">Name</label>
        <input required value={name} onChange={(e) => setName(e.target.value)} className={inputClasses} />
      </div>
      <div className="flex flex-col gap-2 sm:col-span-2">
        <label className="text-xs font-semibold uppercase tracking-widest text-text-muted">E-Mail</label>
        <input
          required
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={inputClasses}
        />
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-xs font-semibold uppercase tracking-widest text-text-muted">
          HU fällig – Monat
        </label>
        <select
          value={huMonth}
          onChange={(e) => setHuMonth(Number(e.target.value))}
          className={cn(inputClasses, "bg-transparent")}
        >
          {months.map((m, i) => (
            <option key={m} value={i + 1}>
              {m}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-xs font-semibold uppercase tracking-widest text-text-muted">Jahr</label>
        <select
          value={huYear}
          onChange={(e) => setHuYear(Number(e.target.value))}
          className={cn(inputClasses, "bg-transparent")}
        >
          {[0, 1, 2].map((offset) => {
            const y = new Date().getFullYear() + offset;
            return (
              <option key={y} value={y}>
                {y}
              </option>
            );
          })}
        </select>
      </div>

      <div className="flex items-start gap-3 sm:col-span-2">
        <input
          id="reminder-privacy"
          type="checkbox"
          required
          checked={privacyAccepted}
          onChange={(e) => setPrivacyAccepted(e.target.checked)}
          className="mt-1 h-4 w-4 shrink-0 border border-border accent-[var(--color-accent)]"
        />
        <label htmlFor="reminder-privacy" className="text-xs leading-relaxed text-text-muted">
          Ich stimme der Verarbeitung meiner Daten gemäß der Datenschutzerklärung zu.
        </label>
      </div>

      {error ? <p className="text-sm text-accent sm:col-span-2">{error}</p> : null}

      <button
        type="submit"
        disabled={submitting}
        className="mt-2 inline-flex w-fit items-center gap-2 border border-text px-6 py-3 text-sm font-semibold uppercase tracking-wide transition-colors hover:bg-dark hover:text-white disabled:opacity-40 sm:col-span-2"
      >
        {submitting ? "Wird gespeichert…" : "HU-Erinnerung aktivieren"}
      </button>
    </form>
  );
}
