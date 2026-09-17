"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { company } from "@/data/company";
import { useBooking } from "@/components/booking/BookingProvider";

const options: { label: string; topic: string }[] = [
  { label: "HU", topic: "HU" },
  { label: "Inspektion", topic: "Inspektion" },
  { label: "Reifen", topic: "Reifen" },
  { label: "Reparatur", topic: "Reparatur" },
  { label: "Unfall", topic: "Unfall" },
  { label: "Sonstiges", topic: "Sonstiges" },
];

export function MobileBottomBar() {
  const [sheetOpen, setSheetOpen] = useState(false);
  const { openBooking } = useBooking();
  const router = useRouter();

  function handleOption(topic: string) {
    setSheetOpen(false);
    if (topic === "HU") {
      openBooking("HU");
    } else {
      router.push(`/kontakt?thema=${encodeURIComponent(topic)}`);
    }
  }

  return (
    <>
      <div className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 border-t border-border bg-white lg:hidden">
        <a
          href={`tel:${company.phoneHref}`}
          className="flex items-center justify-center border-r border-border py-4 text-sm font-semibold uppercase tracking-wide text-text"
        >
          Anrufen
        </a>
        <button
          type="button"
          onClick={() => setSheetOpen(true)}
          className="flex items-center justify-center bg-accent py-4 text-sm font-semibold uppercase tracking-wide text-white"
        >
          Termin
        </button>
      </div>

      <AnimatePresence>
        {sheetOpen ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[90] bg-black/50 lg:hidden"
            onClick={() => setSheetOpen(false)}
          >
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="absolute inset-x-0 bottom-0 rounded-t-lg bg-white px-6 pb-8 pt-6"
            >
              <div className="mx-auto mb-6 h-1 w-10 rounded-full bg-border" />
              <p className="mb-4 font-display text-lg font-bold uppercase tracking-tight">
                Was möchten Sie buchen?
              </p>
              <div className="grid grid-cols-2 gap-2">
                {options.map((opt) => (
                  <button
                    key={opt.topic}
                    type="button"
                    onClick={() => handleOption(opt.topic)}
                    className="border border-border px-4 py-4 text-left text-sm font-semibold uppercase tracking-wide hover:border-text"
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
