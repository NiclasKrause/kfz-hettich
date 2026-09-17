"use client";

import { useId, useState } from "react";
import { HeadlineReveal } from "@/components/motion/HeadlineReveal";
import { faqItems } from "@/data/faq";
import { cn } from "@/lib/cn";

export function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const baseId = useId();

  return (
    <section className="border-t border-border px-6 py-20 sm:px-10 sm:py-24">
      <h2 className="font-display font-bold uppercase leading-[1.05] tracking-tight text-[clamp(1.8rem,4.5vw,3rem)]">
        <HeadlineReveal lines={["Häufige", "Fragen."]} />
      </h2>

      <div className="mx-auto mt-10 max-w-3xl border-t border-border">
        {faqItems.map((item, i) => {
          const isOpen = openIndex === i;
          const panelId = `${baseId}-panel-${i}`;
          const buttonId = `${baseId}-button-${i}`;
          return (
            <div key={item.question} className="border-b border-border">
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenIndex(isOpen ? null : i)}
                className="flex w-full items-center justify-between gap-6 py-5 text-left"
              >
                <span className="font-display text-base font-semibold sm:text-lg">{item.question}</span>
                <span
                  className={cn("relative h-4 w-4 shrink-0 transition-transform duration-300", isOpen && "rotate-45")}
                >
                  <span className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-text" />
                  <span className="absolute top-1/2 left-0 h-px w-full -translate-y-1/2 bg-text" />
                </span>
              </button>
              <div id={panelId} role="region" aria-labelledby={buttonId} className={cn("accordion-panel", isOpen && "is-open")}>
                <div>
                  <p className="max-w-2xl pb-5 text-sm leading-relaxed text-text-muted sm:text-base">{item.answer}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
