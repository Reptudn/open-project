import { supabase } from "@/lib/supabase";

interface CalorieDayTracking {
  calories_consumed: number;
  calories_burned: number;
  protein: number;
  carbs: number;
  fats: number;
}

interface WorkoutSession {
  id: string;
}

interface DayData {
  id: number;
  userId: string;
  weight: number;
  workout_session_id: WorkoutSession | null;
  calorie_data: CalorieDayTracking[] | null;
  date: Date;
}

export async function getDayData(date: Date): Promise<DayData | null> {
  const { data, error } = await supabase
    .from("daily_stats")
    .select("*, workout_session_id(*)")
    .eq("date", date)
    .single();
  if (error) {
    console.error("Error fetching day data:", error);
    return null;
  }

  const { data: food_data, error: err } = await supabase
    .from("user_calorie_stats")
    .select("*")
    .eq("date", date);

  if (err) {
    console.error("Error fetching food data:", err);
    return null;
  }

  const dayData: DayData = {
    id: data.id,
    userId: data.userId,
    weight: data.weight,
    workout_session_id: data.workout_session_id
      ? null
      : data.workout_session_id,
    date: data.date,
    calorie_data: err ? null : (food_data as CalorieDayTracking[]),
  };

  return dayData;
}
