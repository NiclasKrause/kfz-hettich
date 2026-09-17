"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { HeadlineReveal } from "@/components/motion/HeadlineReveal";
import { Reveal } from "@/components/motion/Reveal";
import { HuReminderForm } from "@/components/booking/HuReminderForm";
import { useBooking } from "@/components/booking/BookingProvider";
import { huWeekdayNames } from "@/lib/hu-config";

export function HuSection() {
  const { openBooking } = useBooking();
  const [reminderOpen, setReminderOpen] = useState(false);

  return (
    <section id="hu" className="grid grid-cols-1 border-t border-border lg:grid-cols-2">
      <div className="flex flex-col justify-center px-6 py-20 sm:px-10 sm:py-28">
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-text-muted">
          Hauptuntersuchung
        </span>
        <h2 className="mt-4 font-display font-bold uppercase leading-[1.05] tracking-tight text-[clamp(2.2rem,5vw,3.4rem)]">
          <HeadlineReveal lines={["HU fällig?", "Dann machen", "wir es einfach."]} />
        </h2>
        <Reveal delay={0.15}>
          <p className="mt-6 text-base text-text-muted sm:text-lg">
            Hauptuntersuchung bei Hettich: {huWeekdayNames()}.
          </p>
        </Reveal>
        <Reveal delay={0.2}>
          <button
            type="button"
            onClick={() => openBooking("HU")}
            className="mt-8 inline-flex w-fit items-center gap-2 bg-accent px-6 py-3.5 text-sm font-semibold uppercase tracking-wide text-white transition-colors hover:bg-accent-dark"
          >
            HU-Termin finden →
          </button>
        </Reveal>
      </div>

      <div className="flex flex-col justify-center border-t border-border px-6 py-16 sm:px-10 lg:border-l lg:border-t-0">
        <button
          type="button"
          onClick={() => setReminderOpen((v) => !v)}
          className="text-left"
        >
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-text-muted">
            Noch nicht fällig?
          </span>
          <p className="mt-2 font-display text-xl font-bold uppercase tracking-tight">
            HU-Erinnerung aktivieren {reminderOpen ? "−" : "+"}
          </p>
        </button>

        <AnimatePresence>
          {reminderOpen ? (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="mt-6">
                <HuReminderForm />
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </section>
  );
}
