"use client";

import { useState } from "react";
import { kindersitzRecommendationFor } from "@/data/news";

export function KindersitzGuide() {
  const [cm, setCm] = useState(100);
  const rec = kindersitzRecommendationFor(cm);

  return (
    <div className="border border-border bg-surface p-6 sm:p-10">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-text-muted">
        Wie groß ist Ihr Kind?
      </p>
      <div className="mt-6 flex items-center gap-4">
        <input
          type="range"
          min={40}
          max={160}
          step={1}
          value={cm}
          onChange={(e) => setCm(Number(e.target.value))}
          className="w-full accent-[var(--color-accent)]"
          aria-label="Körpergröße in Zentimetern"
        />
        <span className="font-display w-20 shrink-0 text-right text-2xl font-bold tabular-nums">
          {cm} cm
        </span>
      </div>

      <div className="mt-8 border-t border-border pt-8">
        <p className="text-xs font-semibold uppercase tracking-widest text-accent">{rec.direction}</p>
        <p className="mt-1 font-display text-2xl font-bold uppercase tracking-tight">{rec.label}</p>
        <p className="text-sm text-text-muted">{rec.range}</p>
        <p className="mt-4 max-w-md text-sm leading-relaxed text-text">{rec.text}</p>
      </div>

      <p className="mt-6 text-xs text-text-muted">
        Allgemeine Orientierung nach i-Size (ECE R129). Die verbindliche Einbauposition
        richtet sich immer nach Herstellerangabe von Sitz und Fahrzeug.
      </p>
    </div>
  );
}
