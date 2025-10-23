import { supabase } from "../supabase";

export async function getDayData(date: Date) {
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
    calories_consumed: 2000,
    calories_burned: 500,
    protein: 150,
    carbs: 250,
    fats: 70,
  };
}
