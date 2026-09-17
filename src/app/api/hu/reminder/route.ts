import { NextRequest, NextResponse } from "next/server";
import { huReminderSchema } from "@/lib/validation";
import { getSupabaseAdmin } from "@/lib/supabase";

export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Ungültige Anfrage" }, { status: 400 });
  }

  const parsed = huReminderSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validierung fehlgeschlagen", issues: parsed.error.flatten() },
      { status: 422 },
    );
  }

  const input = parsed.data;
  const supabase = getSupabaseAdmin();

  const { error } = await supabase.from("hu_reminders").insert({
    license_plate: input.licensePlate.toUpperCase(),
    name: input.name,
    email: input.email,
    hu_month: input.huMonth,
    hu_year: input.huYear,
  });

  if (error) {
    console.error("Fehler beim Speichern der HU-Erinnerung:", error);
    return NextResponse.json({ error: "Speichern fehlgeschlagen" }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
