"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { HeadlineReveal } from "@/components/motion/HeadlineReveal";
import { Reveal } from "@/components/motion/Reveal";
import { problems } from "@/data/problems";
import { cn } from "@/lib/cn";

export function ProblemFinder() {
  const [active, setActive] = useState<string | null>(null);
  const activeProblem = problems.find((p) => p.slug === active);

  return (
    <section className="border-t border-border bg-surface px-6 py-20 sm:px-10 sm:py-24">
      <h2 className="font-display font-bold uppercase leading-[1.05] tracking-tight text-[clamp(2rem,4.5vw,3rem)]">
        <HeadlineReveal lines={["Was macht", "Ihr Auto?"]} />
      </h2>

      <Reveal delay={0.1} className="mt-8 flex flex-wrap gap-3">
        {problems.map((p) => (
          <button
            key={p.slug}
            type="button"
            onClick={() => setActive(active === p.slug ? null : p.slug)}
            className={cn(
              "border bg-white px-5 py-3 text-sm font-semibold transition-colors",
              active === p.slug ? "border-accent bg-accent text-white" : "border-border hover:border-text",
            )}
          >
            {p.label}
          </button>
        ))}
      </Reveal>

      <AnimatePresence mode="wait">
        {activeProblem ? (
          <motion.div
            key={activeProblem.slug}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="mt-6 border-t border-border pt-6">
              <p className="text-xs font-semibold uppercase tracking-widest text-accent">
                {activeProblem.recommendationTitle}
              </p>
              <p className="mt-2 max-w-lg text-base text-text-muted">{activeProblem.recommendation}</p>
              <Link
                href={`/kontakt?thema=${encodeURIComponent(activeProblem.topic)}`}
                className="mt-4 inline-flex items-center gap-2 bg-dark px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white"
              >
                Prüftermin anfragen →
              </Link>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}
