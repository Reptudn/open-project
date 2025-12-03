import { supabase } from "@/lib/supabase";
import { toDbDateString } from "@/utils/database";
// import { getMealsByDate } from "./food_tracking";

// interface CalorieDayTracking {
//   calories_consumed: number;
//   calories_burned: number;
//   protein: number;
//   carbs: number;
//   fats: number;
// }

// interface WorkoutSession {
//   id: string;
// }

// interface DayData {
//   id: number;
//   userId: string;
//   weight: number;
//   workout_session_id: WorkoutSession | null;
//   calorie_data: CalorieDayTracking[] | null;
//   date: Date;
// }

// export async function getDayData(date: Date): Promise<DayData | null> {
//   const { data, error } = await supabase
//     .from("daily_stats")
//     .select("*, workout_session_id(*)")
//     .eq("date", date)
//     .single();
//   if (error) {
//     console.error("Error fetching day data:", error);
//     return null;
//   }

//   let meals;
//   try {
//     meals = await getMealsByDate(date);
//   } catch (error) {
//     console.error("Error fetching meals:", error);
//     meals = null;
//   }

//   const dayData: DayData = {
//     id: data.id,
//     userId: data.userId,
//     weight: data.weight,
//     workout_session_id: data.workout_session_id
//       ? null
//       : data.workout_session_id,
//     date: data.date,
//     calorie_data: meals,
//   };

//   return dayData;
// }

export async function getWeightByDate(date: Date): Promise<number | null> {
  // First try to get weight for the exact date
  const { data, error } = await supabase
    .from("daily stats")
    .select("weight_kg")
    .eq("date", toDbDateString(date))
    .single();

  if (!error && data?.weight_kg) {
    return data.weight_kg;
  }

  // If no weight found for exact date, get the most recent weight before that date
  const { data: previousData, error: previousError } = await supabase
    .from("daily stats")
    .select("weight_kg")
    .lt("date", toDbDateString(date))
    .not("weight_kg", "is", null)
    .order("date", { ascending: false })
    .limit(1)
    .single();

  if (previousError) {
    console.error("Error fetching previous weight:", previousError);
    return null;
  }

  return previousData?.weight_kg || null;
}

export async function updateWeightByDate(newWeightInKg: number, date: Date) {
  const { error } = await supabase
    .from("daily stats")
    .update({ weight_kg: newWeightInKg })
    .eq("date", toDbDateString(date));

  if (error) {
    console.error("Error updating weight:", error);
    throw new Error(`Error updating weight: ${error.message}`);
  }
}

export async function getWorkoutSessionByDate(
  date: Date
): Promise<string | null> {
  const { data, error } = await supabase
    .from("daily stats")
    .select("workout_session_id")
    .eq("date", toDbDateString(date))
    .single();

  if (error) {
    console.error("Error fetching workout session:", error);
    return null;
  }

  return data.workout_session_id;
}

export async function addWorkoutSession(workoutId: string, date: Date) {
  const { error } = await supabase
    .from("daily stats")
    .update({
      workout_session_id: workoutId,
    })
    .eq("date", toDbDateString(date));

  if (error) {
    console.error("Error adding workout session:", error);
    throw new Error(`Error adding workout session: ${error.message}`);
  }
}

export async function removeWorkoutSession(date: Date) {
  const { error } = await supabase
    .from("daily stats")
    .update({
      workout_session_id: null,
    })
    .eq("date", toDbDateString(date));

  if (error) {
    console.error("Error removing workout session:", error);
    throw new Error(`Error removing workout session: ${error.message}`);
  }
}
