import "server-only";
import { Resend } from "resend";
import { company } from "@/data/company";

interface SendEmailParams {
  to: string;
  subject: string;
  html: string;
}

/**
 * Versendet E-Mails über Resend, sofern RESEND_API_KEY gesetzt ist.
 * Ohne Key wird die Mail nur geloggt (Entwicklung / bevor der Maildienst
 * eingerichtet ist) - die Buchung selbst schlägt dadurch NICHT fehl.
 */
export async function sendEmail({ to, subject, html }: SendEmailParams): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    console.log(`[email:skipped – kein RESEND_API_KEY] an ${to}: ${subject}`);
    return;
  }

  const resend = new Resend(apiKey);
  const from = `${company.name} <no-reply@${new URL(company.url).hostname}>`;

  try {
    await resend.emails.send({ from, to, subject, html });
  } catch (error) {
    console.error("E-Mail-Versand fehlgeschlagen:", error);
  }
}

export function huConfirmationEmail(params: {
  name: string;
  dateLabel: string;
  time: string;
  licensePlate: string;
}): { subject: string; html: string } {
  const subject = `Ihr HU-Termin bei ${company.legalName} – ${params.dateLabel}, ${params.time} Uhr`;
  const html = `
    <div style="font-family: sans-serif; color: #171717;">
      <h1 style="font-size: 20px;">Termin bestätigt</h1>
      <p>Hallo ${escapeHtml(params.name)},</p>
      <p>Ihr HU-Termin ist gebucht:</p>
      <p style="font-size: 18px; font-weight: bold;">${params.dateLabel}, ${params.time} Uhr</p>
      <p>Kennzeichen: ${escapeHtml(params.licensePlate)}</p>
      <p>${company.legalName}<br/>${company.street}<br/>${company.zip} ${company.place}<br/>${company.phoneDisplay}</p>
      <p>Bei Fragen erreichen Sie uns telefonisch oder per E-Mail.</p>
    </div>
  `;
  return { subject, html };
}

export function huInternalNotificationEmail(params: {
  name: string;
  email: string;
  phone: string;
  licensePlate: string;
  vehicle?: string;
  dateLabel: string;
  time: string;
}): { subject: string; html: string } {
  const subject = `Neue HU-Buchung: ${params.dateLabel} ${params.time} Uhr – ${params.licensePlate}`;
  const html = `
    <div style="font-family: sans-serif;">
      <h1 style="font-size: 18px;">Neue HU-Terminbuchung</h1>
      <ul>
        <li>Termin: ${params.dateLabel}, ${params.time} Uhr</li>
        <li>Name: ${escapeHtml(params.name)}</li>
        <li>Telefon: ${escapeHtml(params.phone)}</li>
        <li>E-Mail: ${escapeHtml(params.email)}</li>
        <li>Kennzeichen: ${escapeHtml(params.licensePlate)}</li>
        <li>Fahrzeug: ${escapeHtml(params.vehicle || "—")}</li>
      </ul>
    </div>
  `;
  return { subject, html };
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
