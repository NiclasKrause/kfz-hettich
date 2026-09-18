import { company } from "@/data/company";
import { HU_CONFIG } from "./hu-config";

const APPOINTMENT_TIME_ZONE = "Europe/Berlin";

/**
 * Wandelt eine Wanduhrzeit in der angegebenen Zeitzone (z. B. "08:00 in
 * Europe/Berlin") in den korrekten UTC-Zeitpunkt um. Das ist bewusst
 * unabhängig von der Serverzeitzone: `new Date(y, m, d, h, min)` würde auf
 * Vercel (Laufzeit in UTC) sonst 08:00 Berlin fälschlich als 08:00 UTC
 * exportieren, statt der korrekten 06:00 UTC (CEST) bzw. 07:00 UTC (CET).
 */
function zonedTimeToUtc(year: number, month: number, day: number, hour: number, minute: number): Date {
  const utcGuess = new Date(Date.UTC(year, month - 1, day, hour, minute));
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: APPOINTMENT_TIME_ZONE,
    hourCycle: "h23",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).formatToParts(utcGuess);

  const map: Record<string, string> = {};
  for (const part of parts) map[part.type] = part.value;

  const asUtc = Date.UTC(
    Number(map.year),
    Number(map.month) - 1,
    Number(map.day),
    Number(map.hour),
    Number(map.minute),
    Number(map.second),
  );
  const offset = asUtc - utcGuess.getTime();
  return new Date(utcGuess.getTime() - offset);
}

function toIcsDate(date: Date): string {
  return date.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
}

function escapeIcs(text: string): string {
  return text.replace(/[\\;,]/g, (m) => `\\${m}`).replace(/\n/g, "\\n");
}

export function buildHuAppointmentIcs(params: {
  id: string;
  date: string; // yyyy-MM-dd
  time: string; // HH:MM
}): string {
  const [year, month, day] = params.date.split("-").map(Number);
  const [hour, minute] = params.time.split(":").map(Number);
  const start = zonedTimeToUtc(year, month, day, hour, minute);
  const end = new Date(start.getTime() + HU_CONFIG.durationMinutes * 60 * 1000);
  const now = new Date();

  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Kfz-Meisterbetrieb Hettich//HU Termin//DE",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:${params.id}@kfz-hettich.de`,
    `DTSTAMP:${toIcsDate(now)}`,
    `DTSTART:${toIcsDate(start)}`,
    `DTEND:${toIcsDate(end)}`,
    `SUMMARY:${escapeIcs("Hauptuntersuchung – " + company.legalName)}`,
    `LOCATION:${escapeIcs(`${company.street}, ${company.zip} ${company.place}`)}`,
    `DESCRIPTION:${escapeIcs(`HU-Termin bei ${company.legalName}. Telefon: ${company.phoneDisplay}`)}`,
    "STATUS:CONFIRMED",
    "END:VEVENT",
    "END:VCALENDAR",
  ];

  return lines.join("\r\n");
}
