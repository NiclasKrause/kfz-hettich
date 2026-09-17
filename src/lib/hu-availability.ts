import "server-only";
import { HU_CONFIG } from "./hu-config";
import { checkHuDate } from "./hu-date-check";
import { getSupabaseAdmin } from "./supabase";

export { checkHuDate };
export type { DateCheckResult } from "./hu-date-check";

/** Prüft zusätzlich admin-konfigurierte Sperrtage (Urlaub, Sonderschließung) aus der DB. */
export async function isDateClosed(dateStr: string): Promise<boolean> {
  const supabase = getSupabaseAdmin();
  const { data } = await supabase
    .from("hu_closures")
    .select("date")
    .eq("date", dateStr)
    .maybeSingle();
  return !!data;
}

/** Uhrzeit "HH:MM" für den übergebenen Tag bereits vergangen? (nur relevant für heute) */
function isSlotInPast(dateStr: string, time: string): boolean {
  const now = new Date();
  const todayStr = now.toISOString().slice(0, 10);
  if (dateStr !== todayStr) return false;
  const [h, m] = time.split(":").map(Number);
  const slot = new Date(now);
  slot.setHours(h, m, 0, 0);
  const minLead = new Date(now.getTime() + HU_CONFIG.minLeadHours * 60 * 60 * 1000);
  return slot < minLead;
}

export async function getAvailableSlots(dateStr: string): Promise<string[]> {
  const dateCheck = checkHuDate(dateStr);
  if (!dateCheck.valid) return [];

  if (await isDateClosed(dateStr)) return [];

  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("hu_appointments")
    .select("time")
    .eq("date", dateStr)
    .eq("status", "confirmed");

  if (error) throw error;

  const booked = new Set((data ?? []).map((row) => row.time));

  return HU_CONFIG.slots.filter((slot) => !booked.has(slot) && !isSlotInPast(dateStr, slot));
}
