"use client";

import { useEffect, useState } from "react";
import { format } from "date-fns";
import { de } from "date-fns/locale";
import { AnimatePresence, motion } from "motion/react";
import { useBooking } from "./BookingProvider";
import { Calendar } from "./Calendar";
import { StepIndicator } from "./StepIndicator";
import { huWeekdayNames } from "@/lib/hu-config";
import { company } from "@/data/company";
import { cn } from "@/lib/cn";

const inputClasses =
  "w-full border-0 border-b border-border bg-transparent py-2.5 text-base text-text outline-none transition-colors placeholder:text-text-muted focus:border-accent";

interface BookingResult {
  id: string;
  date: string;
  dateLabel: string;
  time: string;
}

export function BookingModal() {
  const { isOpen, initialService, closeBooking } = useBooking();

  useEffect(() => {
    document.documentElement.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  // key={initialService} erzwingt einen frischen Mount bei jedem Öffnen –
  // dadurch startet der komplette Wizard-State sauber neu, ganz ohne
  // Reset-Effekt (state derived from props sollte nicht per Effekt
  // synchronisiert werden, siehe react-hooks/set-state-in-effect).
  return <BookingWizard key={`${isOpen}-${initialService}`} initialService={initialService} closeBooking={closeBooking} />;
}

function BookingWizard({
  initialService,
  closeBooking,
}: {
  initialService: "HU" | "AU";
  closeBooking: () => void;
}) {
  const [step, setStep] = useState(1);
  const [service, setService] = useState<"HU" | "AU">(initialService);
  const [licensePlate, setLicensePlate] = useState("");
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [slots, setSlots] = useState<string[]>([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [privacyAccepted, setPrivacyAccepted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [result, setResult] = useState<BookingResult | null>(null);

  async function loadSlotsFor(date: Date) {
    setLoadingSlots(true);
    const dateStr = format(date, "yyyy-MM-dd");
    try {
      const res = await fetch(`/api/hu/availability?date=${dateStr}`);
      const data = await res.json();
      setSlots(data.slots ?? []);
    } catch {
      setSlots([]);
    } finally {
      setLoadingSlots(false);
    }
  }

  // Termin auswählen ist eine Nutzeraktion, kein reiner State-Sync – deshalb
  // wird hier direkt im Event-Handler geladen statt in einem Effekt, der auf
  // selectedDate reagiert (siehe react-hooks/set-state-in-effect).
  function handleSelectDate(date: Date) {
    setSelectedDate(date);
    setSelectedTime(null);
    void loadSlotsFor(date);
  }

  async function handleSubmit() {
    if (!selectedDate || !selectedTime) return;
    setSubmitting(true);
    setSubmitError(null);

    try {
      const res = await fetch("/api/hu/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          service,
          licensePlate,
          make,
          model,
          date: format(selectedDate, "yyyy-MM-dd"),
          time: selectedTime,
          name,
          email,
          phone,
          privacyAccepted,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setSubmitError(data.error || "Buchung fehlgeschlagen. Bitte versuchen Sie es erneut.");
        if (res.status === 409) {
          setStep(3);
          setSelectedTime(null);
          if (selectedDate) void loadSlotsFor(selectedDate);
        }
        return;
      }

      setResult(data);
      setStep(5);
    } catch {
      setSubmitError("Verbindung fehlgeschlagen. Bitte versuchen Sie es erneut.");
    } finally {
      setSubmitting(false);
    }
  }

  const canContinueStep2 = licensePlate.trim().length >= 4;
  const canContinueStep3 = !!selectedDate && !!selectedTime;
  const canSubmitStep4 = name.trim().length >= 2 && /\S+@\S+\.\S+/.test(email) && phone.trim().length >= 5 && privacyAccepted;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-end justify-center bg-black/50 sm:items-center sm:p-6"
        onClick={closeBooking}
      >
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 20, opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          onClick={(e) => e.stopPropagation()}
          role="dialog"
          aria-modal="true"
          aria-label="HU-Termin buchen"
          className="flex max-h-[92vh] w-full max-w-xl flex-col overflow-hidden rounded-t-lg bg-white sm:max-h-[85vh] sm:rounded-sm"
        >
          <div className="flex items-center justify-between border-b border-border px-6 py-4">
            <StepIndicator step={step} />
            <button
              type="button"
              onClick={closeBooking}
              aria-label="Schließen"
              className="text-2xl leading-none text-text-muted hover:text-text"
            >
              ×
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-6 py-8">
            {step === 1 ? (
              <div>
                <h2 className="font-display text-2xl font-bold uppercase tracking-tight">
                  Welcher Service?
                </h2>
                <div className="mt-6 grid grid-cols-2 gap-3">
                  {(["HU", "AU"] as const).map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setService(s)}
                      className={cn(
                        "border px-4 py-6 text-left transition-colors",
                        service === s ? "border-accent bg-accent/5" : "border-border hover:border-text",
                      )}
                    >
                      <span className="font-display block text-xl font-bold">{s}</span>
                      <span className="mt-1 block text-xs text-text-muted">
                        {s === "HU" ? "Hauptuntersuchung" : "Abgasuntersuchung"}
                      </span>
                    </button>
                  ))}
                </div>
                <p className="mt-6 text-sm text-text-muted">
                  Termine sind {huWeekdayNames()} verfügbar.
                </p>
              </div>
            ) : null}

            {step === 2 ? (
              <div>
                <h2 className="font-display text-2xl font-bold uppercase tracking-tight">
                  Ihr Fahrzeug
                </h2>
                <div className="mt-6 flex flex-col gap-6">
                  <Field label="Kennzeichen *">
                    <input
                      value={licensePlate}
                      onChange={(e) => setLicensePlate(e.target.value.toUpperCase())}
                      placeholder="PI-AB 123"
                      className={inputClasses}
                      autoFocus
                    />
                  </Field>
                  <div className="grid grid-cols-2 gap-6">
                    <Field label="Hersteller (optional)">
                      <input value={make} onChange={(e) => setMake(e.target.value)} className={inputClasses} />
                    </Field>
                    <Field label="Modell (optional)">
                      <input value={model} onChange={(e) => setModel(e.target.value)} className={inputClasses} />
                    </Field>
                  </div>
                </div>
              </div>
            ) : null}

            {step === 3 ? (
              <div>
                <h2 className="font-display text-2xl font-bold uppercase tracking-tight">
                  Termin wählen
                </h2>
                <div className="mt-6">
                  <Calendar selected={selectedDate} onSelect={handleSelectDate} />
                </div>

                {selectedDate ? (
                  <div className="mt-8">
                    <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-text-muted">
                      Verfügbare Zeiten am {format(selectedDate, "d. MMMM", { locale: de })}
                    </p>
                    {loadingSlots ? (
                      <p className="text-sm text-text-muted">Lade Verfügbarkeit…</p>
                    ) : slots.length === 0 ? (
                      <p className="text-sm text-text-muted">
                        An diesem Tag sind leider keine Termine mehr frei.
                      </p>
                    ) : (
                      <div className="grid grid-cols-4 gap-2 sm:grid-cols-5">
                        {slots.map((slot) => (
                          <button
                            key={slot}
                            type="button"
                            onClick={() => setSelectedTime(slot)}
                            className={cn(
                              "border py-2.5 text-sm font-medium transition-colors",
                              selectedTime === slot
                                ? "border-accent bg-accent text-white"
                                : "border-border hover:border-text",
                            )}
                          >
                            {slot}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ) : null}
              </div>
            ) : null}

            {step === 4 ? (
              <div>
                <h2 className="font-display text-2xl font-bold uppercase tracking-tight">
                  Ihre Kontaktdaten
                </h2>
                <div className="mt-6 flex flex-col gap-6">
                  <Field label="Name *">
                    <input value={name} onChange={(e) => setName(e.target.value)} className={inputClasses} autoFocus />
                  </Field>
                  <Field label="Telefon *">
                    <input value={phone} onChange={(e) => setPhone(e.target.value)} type="tel" className={inputClasses} />
                  </Field>
                  <Field label="E-Mail *">
                    <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" className={inputClasses} />
                  </Field>
                  <div className="flex items-start gap-3">
                    <input
                      id="booking-privacy"
                      type="checkbox"
                      checked={privacyAccepted}
                      onChange={(e) => setPrivacyAccepted(e.target.checked)}
                      className="mt-1 h-4 w-4 shrink-0 border border-border accent-[var(--color-accent)]"
                    />
                    <label htmlFor="booking-privacy" className="text-xs leading-relaxed text-text-muted">
                      Ich stimme der Verarbeitung meiner Daten gemäß der Datenschutzerklärung zu.
                    </label>
                  </div>
                  {submitError ? <p className="text-sm text-accent">{submitError}</p> : null}
                </div>
              </div>
            ) : null}

            {step === 5 && result ? (
              <div className="flex flex-col items-center py-6 text-center">
                <span className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-accent text-2xl text-white">
                  ✓
                </span>
                <h2 className="font-display text-2xl font-bold uppercase tracking-tight">
                  Termin steht.
                </h2>
                <p className="mt-4 font-display text-xl font-semibold">{result.dateLabel}</p>
                <p className="font-display text-xl font-semibold">{result.time} Uhr</p>
                <p className="mt-6 text-sm text-text-muted">
                  {company.legalName}
                  <br />
                  {company.street}
                  <br />
                  {company.zip} {company.place}
                </p>
                <a
                  href={`/api/hu/ics/${result.id}`}
                  className="mt-8 inline-flex items-center gap-2 border border-text px-6 py-3 text-sm font-semibold uppercase tracking-wide hover:bg-surface"
                >
                  Zum Kalender hinzufügen
                </a>
                <p className="mt-4 text-xs text-text-muted">
                  Eine Bestätigung wurde an {email} gesendet.
                </p>
              </div>
            ) : null}
          </div>

          {step < 5 ? (
            <div className="flex items-center justify-between border-t border-border px-6 py-4">
              <button
                type="button"
                onClick={() => setStep((s) => Math.max(1, s - 1))}
                className={cn("text-sm font-semibold uppercase tracking-wide", step === 1 && "invisible")}
              >
                Zurück
              </button>

              {step < 4 ? (
                <button
                  type="button"
                  disabled={(step === 2 && !canContinueStep2) || (step === 3 && !canContinueStep3)}
                  onClick={() => setStep((s) => s + 1)}
                  className="bg-dark px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white transition-opacity disabled:opacity-30"
                >
                  Weiter
                </button>
              ) : (
                <button
                  type="button"
                  disabled={!canSubmitStep4 || submitting}
                  onClick={handleSubmit}
                  className="bg-accent px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white transition-opacity disabled:opacity-30"
                >
                  {submitting ? "Wird gebucht…" : "Termin verbindlich buchen"}
                </button>
              )}
            </div>
          ) : null}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-xs font-semibold uppercase tracking-widest text-text-muted">{label}</label>
      {children}
    </div>
  );
}
