import { z } from "zod";

const licensePlateRegex = /^[A-ZÄÖÜ]{1,3}[- ][A-Z]{1,2}[- ]?\d{1,4}[EH]?$/i;

export const huBookingSchema = z.object({
  service: z.enum(["HU", "AU"]),
  licensePlate: z
    .string()
    .trim()
    .min(4, "Bitte Kennzeichen angeben")
    .max(12)
    .regex(licensePlateRegex, "Kennzeichen wirkt ungültig, bitte prüfen"),
  make: z.string().trim().max(60).optional().or(z.literal("")),
  model: z.string().trim().max(60).optional().or(z.literal("")),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Ungültiges Datum"),
  time: z.string().regex(/^\d{2}:\d{2}$/, "Ungültige Uhrzeit"),
  name: z.string().trim().min(2, "Bitte Namen angeben").max(100),
  email: z.string().trim().email("Ungültige E-Mail-Adresse"),
  phone: z.string().trim().min(5, "Bitte Telefonnummer angeben").max(30),
  privacyAccepted: z.literal(true, {
    message: "Bitte Datenschutzerklärung akzeptieren",
  }),
});

export type HuBookingInput = z.infer<typeof huBookingSchema>;

export const huReminderSchema = z.object({
  licensePlate: z.string().trim().min(4).max(12),
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().email(),
  huMonth: z.coerce.number().int().min(1).max(12),
  huYear: z.coerce.number().int().min(new Date().getFullYear()).max(new Date().getFullYear() + 1),
  privacyAccepted: z.literal(true, {
    message: "Bitte Datenschutzerklärung akzeptieren",
  }),
});

export type HuReminderInput = z.infer<typeof huReminderSchema>;

export const contactRequestSchema = z.object({
  topic: z.enum(["Inspektion", "HU", "Reifen", "Reparatur", "Unfall", "Sonstiges"]),
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().email(),
  phone: z.string().trim().max(30).optional().or(z.literal("")),
  message: z.string().trim().min(5, "Bitte kurze Nachricht angeben").max(2000),
  privacyAccepted: z.literal(true, {
    message: "Bitte Datenschutzerklärung akzeptieren",
  }),
  // Honeypot-Feld gegen einfache Spam-Bots - muss leer bleiben.
  website: z.string().max(0).optional().or(z.literal("")),
});

export type ContactRequestInput = z.infer<typeof contactRequestSchema>;
