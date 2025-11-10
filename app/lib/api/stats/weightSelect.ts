import { supabase } from "@/lib/supabase";
import { Result } from "@/types/ErrorHandling";

// Typ für die Gewichtsdaten
export interface DailyStat {
  date: string;
  weight_kg: number;
}

export async function getDailyStats(): Promise<Result<DailyStat[]>> {
const { data, error } = await supabase
  .from("daily stats")
  .select("date, weight_kg")
  .order("date", { ascending: true });

  if (error) {
    return { data: null, error: error.message };
  }

  return { data: data as DailyStat[], error: null };
}
