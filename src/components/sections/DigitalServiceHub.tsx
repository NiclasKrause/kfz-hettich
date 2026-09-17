"use client";

import Link from "next/link";
import { HeadlineReveal } from "@/components/motion/HeadlineReveal";
import { Reveal } from "@/components/motion/Reveal";
import { useBooking } from "@/components/booking/BookingProvider";

export function DigitalServiceHub() {
  const { openBooking } = useBooking();

  const actions: { label: string; onClick?: () => void; href?: string }[] = [
    { label: "Termin buchen", onClick: () => openBooking("HU") },
    { label: "HU buchen", onClick: () => openBooking("HU") },
    { label: "HU-Erinnerung", href: "/#hu" },
    { label: "Service anfragen", href: "/kontakt" },
    { label: "Unfall melden", href: "/#unfall" },
  ];

  return (
    <section className="border-t border-border bg-surface px-6 py-20 sm:px-10 sm:py-24">
      <h2 className="font-display font-bold uppercase leading-[1.05] tracking-tight text-[clamp(1.8rem,4vw,2.8rem)]">
        <HeadlineReveal lines={["Ihr Fahrzeug.", "Ihr Termin.", "Ihre Entscheidung."]} />
      </h2>

      <Reveal delay={0.15} className="mt-10 flex flex-wrap gap-3 border-t border-border pt-8">
        {actions.map((action) =>
          action.href ? (
            <Link
              key={action.label}
              href={action.href}
              className="border border-border bg-white px-5 py-3 text-sm font-semibold uppercase tracking-wide transition-colors hover:border-text"
            >
              {action.label}
            </Link>
          ) : (
            <button
              key={action.label}
              type="button"
              onClick={action.onClick}
              className="border border-border bg-white px-5 py-3 text-sm font-semibold uppercase tracking-wide transition-colors hover:border-text"
            >
              {action.label}
            </button>
          ),
        )}
      </Reveal>
    </section>
  );
}
