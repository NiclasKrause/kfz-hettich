"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { HeadlineReveal } from "@/components/motion/HeadlineReveal";
import { company } from "@/data/company";
import { useBooking } from "@/components/booking/BookingProvider";

export function Hero() {
  const { openBooking } = useBooking();

  return (
    <section className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="/photos/hero.jpg"
          alt="Fahrzeug auf Hebebühne in moderner Werkstatt"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-black/10" />
      </div>

      <div className="relative px-6 pb-14 pt-32 sm:px-10 sm:pb-16">
        <h1 className="font-display font-bold uppercase leading-[1.02] tracking-tight text-[clamp(2.6rem,8vw,6.5rem)] text-white">
          <HeadlineReveal trigger="mount" lines={["Werkstatt.", "Aber weiter", "gedacht."]} />
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="mt-6 max-w-md text-balance text-base text-white/85 sm:text-lg"
        >
          Service, Wartung und Reparatur für Ihr Fahrzeug – persönlich, transparent
          und direkt in Pinneberg.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-4"
        >
          <button
            type="button"
            onClick={() => openBooking("HU")}
            className="bg-accent px-6 py-3.5 text-sm font-semibold uppercase tracking-wide text-white transition-colors hover:bg-accent-dark"
          >
            Termin buchen
          </button>
          <a href="#leistungen" className="text-sm font-semibold text-white hover:text-white/80">
            Service entdecken
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-10 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/70"
        >
          {company.legalName} · {company.place}
        </motion.div>
      </div>
    </section>
  );
}
