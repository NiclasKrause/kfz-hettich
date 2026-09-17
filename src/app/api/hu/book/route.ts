import { NextRequest, NextResponse } from "next/server";
import { format, parseISO } from "date-fns";
import { de } from "date-fns/locale";
import { huBookingSchema } from "@/lib/validation";
import { checkHuDate, isDateClosed } from "@/lib/hu-availability";
import { HU_CONFIG } from "@/lib/hu-config";
import { getSupabaseAdmin } from "@/lib/supabase";
import { company } from "@/data/company";
import { sendEmail, huConfirmationEmail, huInternalNotificationEmail } from "@/lib/email";

const UNIQUE_VIOLATION = "23505";

export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Ungültige Anfrage" }, { status: 400 });
  }

  const parsed = huBookingSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validierung fehlgeschlagen", issues: parsed.error.flatten() },
      { status: 422 },
    );
  }

  const input = parsed.data;

  // Serverseitige Prüfung – niemals nur dem Frontend vertrauen.
  const dateCheck = checkHuDate(input.date);
  if (!dateCheck.valid) {
    return NextResponse.json(
      { error: "Termin nicht verfügbar", reason: dateCheck.reason },
      { status: 409 },
    );
  }

  if (!(HU_CONFIG.slots as readonly string[]).includes(input.time)) {
    return NextResponse.json({ error: "Uhrzeit nicht verfügbar" }, { status: 409 });
  }

  if (await isDateClosed(input.date)) {
    return NextResponse.json({ error: "Termin nicht verfügbar", reason: "closed" }, { status: 409 });
  }

  const supabase = getSupabaseAdmin();
  const vehicle = [input.make, input.model].filter(Boolean).join(" ") || undefined;

  const { data, error } = await supabase
    .from("hu_appointments")
    .insert({
      date: input.date,
      time: input.time,
      service: input.service,
      name: input.name,
      email: input.email,
      phone: input.phone,
      license_plate: input.licensePlate.toUpperCase(),
      vehicle,
      status: "confirmed",
    })
    .select("id")
    .single();

  if (error) {
    if (error.code === UNIQUE_VIOLATION) {
      return NextResponse.json(
        { error: "Dieser Termin wurde gerade eben vergeben. Bitte wählen Sie einen anderen." },
        { status: 409 },
      );
    }
    console.error("Fehler beim Speichern der Buchung:", error);
    return NextResponse.json({ error: "Buchung fehlgeschlagen" }, { status: 500 });
  }

  const dateLabel = format(parseISO(input.date), "EEEE, d. MMMM yyyy", { locale: de });

  await Promise.all([
    sendEmail({
      to: input.email,
      ...huConfirmationEmail({
        name: input.name,
        dateLabel,
        time: input.time,
        licensePlate: input.licensePlate.toUpperCase(),
      }),
    }),
    sendEmail({
      to: company.email,
      ...huInternalNotificationEmail({
        name: input.name,
        email: input.email,
        phone: input.phone,
        licensePlate: input.licensePlate.toUpperCase(),
        vehicle,
        dateLabel,
        time: input.time,
      }),
    }),
  ]);

  return NextResponse.json({
    id: data.id,
    date: input.date,
    dateLabel,
    time: input.time,
  });
}
