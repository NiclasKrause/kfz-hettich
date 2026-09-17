import "server-only";
import { createClient } from "@supabase/supabase-js";

/**
 * Server-only Supabase-Client mit service_role Key.
 * Bypasst RLS bewusst – Zugriffskontrolle passiert in den API-Routen selbst
 * (Zod-Validierung + HU-Konfigurationsprüfung), nicht über Row Level Security.
 * Niemals in Client-Components importieren.
 */
export function getSupabaseAdmin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) {
    throw new Error(
      "Supabase ist nicht konfiguriert. NEXT_PUBLIC_SUPABASE_URL und SUPABASE_SERVICE_ROLE_KEY prüfen.",
    );
  }

  return createClient(url, key, {
    auth: { persistSession: false },
  });
}
