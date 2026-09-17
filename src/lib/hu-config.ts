/**
 * Zentrale HU-Konfiguration. Einzige Stelle, an der Wochentage, Slots und
 * Dauer der Hauptuntersuchung definiert werden – nirgendwo sonst hardcoden.
 *
 * weekdays: 1 = Montag ... 7 = Sonntag (ISO, wie date-fns getISODay()).
 * Aktuell laut bestehender Website: Dienstag (2) und Donnerstag (4).
 */
export const HU_CONFIG = {
  weekdays: [2, 4] as const,
  durationMinutes: 30,
  slots: ["08:00", "09:00", "10:00", "11:00", "14:00", "15:00", "16:00"] as const,
  bookingHorizonDays: 60,
  minLeadHours: 2,
} as const;

export type HuSlot = (typeof HU_CONFIG.slots)[number];

export const HU_WEEKDAY_LABELS: Record<number, string> = {
  1: "Montag",
  2: "Dienstag",
  3: "Mittwoch",
  4: "Donnerstag",
  5: "Freitag",
  6: "Samstag",
  7: "Sonntag",
};

export function huWeekdayNames(): string {
  return HU_CONFIG.weekdays.map((d) => HU_WEEKDAY_LABELS[d]).join(" & ");
}
