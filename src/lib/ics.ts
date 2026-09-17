import { company } from "@/data/company";
import { HU_CONFIG } from "./hu-config";

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
  const start = new Date(year, month - 1, day, hour, minute);
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
