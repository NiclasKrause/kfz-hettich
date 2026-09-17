import { getISODay, isBefore, parseISO, startOfDay } from "date-fns";
import { HU_CONFIG } from "./hu-config";
import { isSchleswigHolsteinHoliday } from "./holidays";

export interface DateCheckResult {
  valid: boolean;
  reason?: "past" | "weekday" | "holiday" | "closed" | "too-far";
}

/**
 * Rein kalendarische Prüfung (Wochentag, Feiertag, Vergangenheit, Horizont) –
 * keine Datenbankabfrage, deshalb sicher sowohl im Client (Kalender-UI) als
 * auch im Server (API-Route) verwendbar. Admin-Sperrtage aus der DB prüft
 * zusätzlich `isDateClosed` in hu-availability.ts (server-only).
 */
export function checkHuDate(dateStr: string): DateCheckResult {
  const date = parseISO(dateStr);
  const today = startOfDay(new Date());

  if (isBefore(date, today)) return { valid: false, reason: "past" };

  const horizon = new Date(today);
  horizon.setDate(horizon.getDate() + HU_CONFIG.bookingHorizonDays);
  if (date > horizon) return { valid: false, reason: "too-far" };

  const isoWeekday = getISODay(date);
  if (!(HU_CONFIG.weekdays as readonly number[]).includes(isoWeekday)) {
    return { valid: false, reason: "weekday" };
  }

  if (isSchleswigHolsteinHoliday(dateStr)) {
    return { valid: false, reason: "holiday" };
  }

  return { valid: true };
}
