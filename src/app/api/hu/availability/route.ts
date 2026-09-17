import { NextRequest, NextResponse } from "next/server";
import { checkHuDate, getAvailableSlots } from "@/lib/hu-availability";

export async function GET(request: NextRequest) {
  const date = request.nextUrl.searchParams.get("date");

  if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return NextResponse.json({ error: "Ungültiges Datum" }, { status: 400 });
  }

  const check = checkHuDate(date);
  if (!check.valid) {
    return NextResponse.json({ valid: false, reason: check.reason, slots: [] });
  }

  try {
    const slots = await getAvailableSlots(date);
    return NextResponse.json({ valid: true, slots });
  } catch (error) {
    console.error("Fehler beim Laden der Verfügbarkeit:", error);
    return NextResponse.json({ error: "Interner Fehler" }, { status: 500 });
  }
}
