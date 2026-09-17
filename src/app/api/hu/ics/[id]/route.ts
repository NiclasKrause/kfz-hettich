import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";
import { buildHuAppointmentIcs } from "@/lib/ics";

export async function GET(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = getSupabaseAdmin();

  const { data, error } = await supabase
    .from("hu_appointments")
    .select("id, date, time, status")
    .eq("id", id)
    .maybeSingle();

  if (error || !data || data.status !== "confirmed") {
    return NextResponse.json({ error: "Termin nicht gefunden" }, { status: 404 });
  }

  const ics = buildHuAppointmentIcs({ id: data.id, date: data.date, time: data.time });

  return new NextResponse(ics, {
    headers: {
      "Content-Type": "text/calendar; charset=utf-8",
      "Content-Disposition": `attachment; filename="hu-termin-hettich.ics"`,
    },
  });
}
