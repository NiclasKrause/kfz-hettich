"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

const topics = [
  {
    label: "Profiltiefe",
    text: "Gesetzlich mindestens 1,6 mm – für sicheres Fahrverhalten empfehlen Experten deutlich mehr, besonders bei Nässe.",
  },
  {
    label: "Alter",
    text: "Reifen altern auch ohne Nutzung. Nach etwa 6–10 Jahren sollte ein Fachmann den Zustand prüfen.",
  },
  {
    label: "Luftdruck",
    text: "Falscher Luftdruck erhöht Verschleiß und Verbrauch. Eine regelmäßige Prüfung lohnt sich.",
  },
  {
    label: "Ungleichmäßiger Verschleiß",
    text: "Kann auf Fahrwerksprobleme hindeuten und sollte zeitnah geprüft werden.",
  },
];

export function ReifenEducation() {
  const [active, setActive] = useState<string | null>(null);

  return (
    <div className="border-t border-border px-6 py-14 sm:px-10">
      <p className="mb-6 text-xs font-semibold uppercase tracking-[0.2em] text-text-muted">
        Worauf es ankommt
      </p>
      <div className="flex flex-wrap gap-3">
        {topics.map((topic) => (
          <button
            key={topic.label}
            type="button"
            onClick={() => setActive(active === topic.label ? null : topic.label)}
            className={cn(
              "border px-4 py-2.5 text-sm font-medium transition-colors",
              active === topic.label ? "border-accent bg-accent text-white" : "border-border hover:border-text",
            )}
          >
            {topic.label}
          </button>
        ))}
      </div>
      {active ? (
        <p className="mt-6 max-w-lg text-sm leading-relaxed text-text-muted">
          {topics.find((t) => t.label === active)?.text}
        </p>
      ) : null}
    </div>
  );
}
