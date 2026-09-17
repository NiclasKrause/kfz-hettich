import { NextRequest, NextResponse } from "next/server";
import { contactRequestSchema } from "@/lib/validation";
import { getSupabaseAdmin } from "@/lib/supabase";
import { sendEmail } from "@/lib/email";
import { company } from "@/data/company";

export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Ungültige Anfrage" }, { status: 400 });
  }

  const parsed = contactRequestSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validierung fehlgeschlagen", issues: parsed.error.flatten() },
      { status: 422 },
    );
  }

  const input = parsed.data;

  // Honeypot: Bots füllen versteckte Felder aus, echte Nutzer nicht.
  if (input.website) {
    return NextResponse.json({ success: true });
  }

  const supabase = getSupabaseAdmin();
  const { error } = await supabase.from("contact_requests").insert({
    topic: input.topic,
    name: input.name,
    email: input.email,
    phone: input.phone || null,
    message: input.message,
  });

  if (error) {
    console.error("Fehler beim Speichern der Kontaktanfrage:", error);
    return NextResponse.json({ error: "Senden fehlgeschlagen" }, { status: 500 });
  }

  await sendEmail({
    to: company.email,
    subject: `Neue Anfrage: ${input.topic} – ${input.name}`,
    html: `
      <div style="font-family: sans-serif;">
        <p><strong>Thema:</strong> ${input.topic}</p>
        <p><strong>Name:</strong> ${input.name}</p>
        <p><strong>E-Mail:</strong> ${input.email}</p>
        <p><strong>Telefon:</strong> ${input.phone || "—"}</p>
        <p><strong>Nachricht:</strong><br/>${input.message.replace(/\n/g, "<br/>")}</p>
      </div>
    `,
  });

  return NextResponse.json({ success: true });
}
