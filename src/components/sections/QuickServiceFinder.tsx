"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";
import { useBooking } from "@/components/booking/BookingProvider";
import { cn } from "@/lib/cn";

interface Option {
  label: string;
  info: string;
  action: { type: "booking" } | { type: "contact"; topic: string };
}

const options: Option[] = [
  {
    label: "Inspektion",
    info: "Wartung nach Herstellervorgabe – wir sagen Ihnen, was ansteht.",
    action: { type: "contact", topic: "Inspektion" },
  },
  {
    label: "HU",
    info: "Hauptuntersuchung dienstags & donnerstags – direkt online buchbar.",
    action: { type: "booking" },
  },
  {
    label: "Reifen",
    info: "Wechsel, Auswuchten, Einlagerung – für jede Saison.",
    action: { type: "contact", topic: "Reifen" },
  },
  {
    label: "Reparatur",
    info: "Von der Diagnose bis zur fachgerechten Instandsetzung.",
    action: { type: "contact", topic: "Reparatur" },
  },
  {
    label: "Unfall",
    info: "Abschleppen, Schadensfeststellung, Ersatzfahrzeug – wir übernehmen.",
    action: { type: "contact", topic: "Unfall" },
  },
  {
    label: "Karosserie",
    info: "Instandsetzung von Karosserieschäden, abgestimmt mit Ihnen.",
    action: { type: "contact", topic: "Sonstiges" },
  },
];

export function QuickServiceFinder() {
  const [active, setActive] = useState<string | null>(null);
  const { openBooking } = useBooking();

  const activeOption = options.find((o) => o.label === active);

  return (
    <section className="border-t border-border px-6 py-20 sm:px-10 sm:py-24">
      <Reveal>
        <h2 className="font-display text-2xl font-bold uppercase tracking-tight sm:text-3xl">
          Was braucht Ihr Fahrzeug?
        </h2>
      </Reveal>

      <Reveal delay={0.1} className="mt-8 flex flex-wrap gap-3">
        {options.map((opt) => (
          <button
            key={opt.label}
            type="button"
            onClick={() => setActive(active === opt.label ? null : opt.label)}
            className={cn(
              "border px-5 py-3 text-sm font-semibold uppercase tracking-wide transition-colors",
              active === opt.label ? "border-accent bg-accent text-white" : "border-border hover:border-text",
            )}
          >
            {opt.label}
          </button>
        ))}
      </Reveal>

      <AnimatePresence mode="wait">
        {activeOption ? (
          <motion.div
            key={activeOption.label}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="mt-6 flex flex-col items-start gap-4 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
              <p className="max-w-lg text-base text-text-muted">{activeOption.info}</p>
              {activeOption.action.type === "booking" ? (
                <button
                  type="button"
                  onClick={() => openBooking("HU")}
                  className="shrink-0 bg-dark px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white"
                >
                  Termin buchen
                </button>
              ) : (
                <Link
                  href={`/kontakt?thema=${encodeURIComponent(activeOption.action.topic)}`}
                  className="shrink-0 bg-dark px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white"
                >
                  Termin buchen
                </Link>
              )}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}
