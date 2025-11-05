import { supabase } from "@/lib/supabase";
import { MealType } from "@/types/FoodData";

export async function addMeal(
  barcode: string,
  mealType: MealType,
  date: Date,
  amount_in_g?: number
) {
  const { error } = await supabase.from("meals").insert({
    barcode,
    meal_type: mealType,
    date,
    amount_in_g,
  });

  if (error) {
    throw new Error(`Error adding meal: ${error.message}`);
  }
}

export async function deleteMeal(mealId: number) {
  const { error } = await supabase.from("meals").delete().eq("id", mealId);

  if (error) {
    throw new Error(`Error deleting meal: ${error.message}`);
  }
}

export async function getMealsByDate(date: Date) {
  const { data, error } = await supabase
    .from("meals")
    .select("*")
    .eq("date", date)
    .order("meal_type", { ascending: true });
  if (error) {
    throw new Error(`Error fetching meals: ${error.message}`);
  }

  return data;
}

export async function getMealsByType(type: MealType, date?: Date) {
  const { data, error } = date
    ? await supabase
        .from("meals")
        .select("*")
        .eq("meal_type", type)
        .eq("date", date)
        .order("meal_type", { ascending: true })
    : await supabase
        .from("meals")
        .select("*")
        .eq("meal_type", type)
        .order("meal_type", { ascending: true });

  if (error) {
    throw new Error(`Error fetching meals: ${error.message}`);
  }

  return data;
}

export async function editMeal(
  mealId: number,
  updatedData: Partial<{ amount_in_g: number; meal_type: MealType }>
) {
  const { error } = await supabase
    .from("meals")
    .update(updatedData)
    .eq("id", mealId);

  if (error) {
    throw new Error(`Error editing meal: ${error.message}`);
  }
}
