import { supabase } from "@/lib/supabase";
import { Result } from "@/types/ErrorHandling";

// Typ für die Gewichtsdaten
export interface DailyStat {
  date: string;   // oder Date, je nach DB-Schema
  weight: number;
}

// Funktion: Holt Gewicht + Datum aus der daily_stats Tabelle
export async function getDailyStats(): Promise<Result<DailyStat[]>> {
  const { data, error } = await supabase
    .from("daily_stats")
    .select("date, weight")
    .order("date", { ascending: true }); // optional, aber meist sinnvoll

  if (error) {
    return { data: null, error: error.message };
  }

  return { data: data as DailyStat[], error: null };
}
