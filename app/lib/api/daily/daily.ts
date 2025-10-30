import { supabase } from "../supabase";

interface CalorieDayTracking {
  calories_consumed: number;
  calories_burned: number;
  protein: number;
  carbs: number;
  fats: number;
}

interface WorkoutTracking {
  duration: number; // in minutes
}

interface DayData {
  date: Date;
  calorie_tracking?: CalorieDayTracking;
  workout_tracking?: WorkoutTracking;
}

export async function getDayData(date: Date): Promise<DayData> {
  // const { data, error } = await supabase
  //   .from("calorie_days")
  //   .select("*")
  //   .eq("date", date);
  // if (error) {
  //   console.error("Error fetching day data:", error);
  //   return null;
  // }
  // return data;
  return {
    date: date,
    calorie_tracking: {
      calories_consumed: 2000,
      calories_burned: 500,
      protein: 150,
      carbs: 250,
      fats: 70,
    },
    workout_tracking: {
      duration: 60,
    },
  };
}
