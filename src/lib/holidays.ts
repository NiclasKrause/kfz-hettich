import { addDays, format } from "date-fns";

/**
 * Berechnet den Ostersonntag (gregorianisch) nach dem Gauß'schen Osteralgorithmus.
 */
function easterSunday(year: number): Date {
  const a = year % 19;
  const b = Math.floor(year / 100);
  const c = year % 100;
  const d = Math.floor(b / 4);
  const e = b % 4;
  const f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4);
  const k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const month = Math.floor((h + l - 7 * m + 114) / 31);
  const day = ((h + l - 7 * m + 114) % 31) + 1;
  return new Date(year, month - 1, day);
}

/**
 * Gesetzliche Feiertage in Schleswig-Holstein für ein gegebenes Jahr.
 * Gibt ein Set im Format "yyyy-MM-dd" zurück.
 */
export function schleswigHolsteinHolidays(year: number): Set<string> {
  const easter = easterSunday(year);
  const dates: Date[] = [
    new Date(year, 0, 1), // Neujahr
    addDays(easter, -2), // Karfreitag
    addDays(easter, 1), // Ostermontag
    new Date(year, 4, 1), // Tag der Arbeit
    addDays(easter, 39), // Christi Himmelfahrt
    addDays(easter, 50), // Pfingstmontag
    new Date(year, 9, 3), // Tag der Deutschen Einheit
    new Date(year, 9, 31), // Reformationstag
    new Date(year, 11, 25), // 1. Weihnachtsfeiertag
    new Date(year, 11, 26), // 2. Weihnachtsfeiertag
  ];
  return new Set(dates.map((d) => format(d, "yyyy-MM-dd")));
}

const cache = new Map<number, Set<string>>();

export function isSchleswigHolsteinHoliday(dateStr: string): boolean {
  const year = Number(dateStr.slice(0, 4));
  if (!cache.has(year)) {
    cache.set(year, schleswigHolsteinHolidays(year));
  }
  return cache.get(year)!.has(dateStr);
}
