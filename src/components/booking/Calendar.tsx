"use client";

import { useMemo, useState } from "react";
import {
  addMonths,
  endOfMonth,
  format,
  getISODay,
  isSameDay,
  isSameMonth,
  startOfMonth,
  startOfToday,
  subMonths,
} from "date-fns";
import { de } from "date-fns/locale";
import { checkHuDate } from "@/lib/hu-date-check";
import { cn } from "@/lib/cn";

interface CalendarProps {
  selected: Date | null;
  onSelect: (date: Date) => void;
}

function buildMonthGrid(monthAnchor: Date): Date[] {
  const start = startOfMonth(monthAnchor);
  const end = endOfMonth(monthAnchor);
  const startOffset = (getISODay(start) + 6) % 7; // Montag = 0
  const days: Date[] = [];
  for (let i = 0; i < startOffset; i++) {
    days.push(new Date(start.getFullYear(), start.getMonth(), start.getDate() - (startOffset - i)));
  }
  for (let d = 1; d <= end.getDate(); d++) {
    days.push(new Date(start.getFullYear(), start.getMonth(), d));
  }
  while (days.length % 7 !== 0) {
    const last = days[days.length - 1];
    days.push(new Date(last.getFullYear(), last.getMonth(), last.getDate() + 1));
  }
  return days;
}

const weekdayLabels = ["MO", "DI", "MI", "DO", "FR", "SA", "SO"];

export function Calendar({ selected, onSelect }: CalendarProps) {
  const today = startOfToday();
  const [monthAnchor, setMonthAnchor] = useState(startOfMonth(today));

  const days = useMemo(() => buildMonthGrid(monthAnchor), [monthAnchor]);
  const canGoPrev = !isSameMonth(monthAnchor, today) && monthAnchor > today;
  const maxMonth = useMemo(() => addMonths(startOfMonth(today), 3), [today]);
  const canGoNext = monthAnchor < maxMonth;

  return (
    <div>
      <div className="flex items-center justify-between pb-4">
        <button
          type="button"
          onClick={() => setMonthAnchor((m) => subMonths(m, 1))}
          disabled={!canGoPrev}
          aria-label="Vorheriger Monat"
          className="flex h-9 w-9 items-center justify-center border border-border text-lg disabled:opacity-30"
        >
          ‹
        </button>
        <p className="font-display text-base font-semibold uppercase tracking-wide">
          {format(monthAnchor, "MMMM yyyy", { locale: de })}
        </p>
        <button
          type="button"
          onClick={() => setMonthAnchor((m) => addMonths(m, 1))}
          disabled={!canGoNext}
          aria-label="Nächster Monat"
          className="flex h-9 w-9 items-center justify-center border border-border text-lg disabled:opacity-30"
        >
          ›
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 pb-2 text-center text-[11px] font-semibold uppercase tracking-wide text-text-muted">
        {weekdayLabels.map((d) => (
          <span key={d}>{d}</span>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {days.map((day, i) => {
          const inMonth = isSameMonth(day, monthAnchor);
          const dateStr = format(day, "yyyy-MM-dd");
          const check = checkHuDate(dateStr);
          const isSelected = selected ? isSameDay(day, selected) : false;
          const isToday = isSameDay(day, today);
          const disabled = !inMonth || !check.valid;

          return (
            <button
              key={i}
              type="button"
              disabled={disabled}
              onClick={() => onSelect(day)}
              aria-pressed={isSelected}
              aria-label={format(day, "EEEE, d. MMMM yyyy", { locale: de })}
              className={cn(
                "relative aspect-square rounded-sm text-sm transition-colors",
                !inMonth && "text-transparent",
                inMonth && disabled && "text-text-muted/40 cursor-not-allowed",
                inMonth && !disabled && "text-text hover:bg-brand-light cursor-pointer",
                isSelected && "bg-accent text-white hover:bg-accent",
                isToday && !isSelected && "font-semibold underline underline-offset-4",
              )}
            >
              {format(day, "d")}
            </button>
          );
        })}
      </div>
    </div>
  );
}
