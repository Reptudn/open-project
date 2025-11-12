import { supabase } from "@/lib/supabase";
import { MealType } from "@/types/FoodData";
import { FoodsTableEntry } from "@/types/Meals";

export async function addMeal(
  barcode: string,
  mealType: MealType,
  date: string,
  amount_in_g?: number
) {
  console.info("Adding meal:", { barcode, mealType, date, amount_in_g });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { error } = await supabase.from("user_calorie_stats").insert({
    barcode_id: barcode,
    type: mealType,
    created_at: date,
    amount_in_g,
    profile: user?.id || null,
  });

  if (error) {
    throw new Error(`Error adding meal: ${error.message}`);
  }
}

export async function deleteMeal(mealId: number) {
  const { error } = await supabase
    .from("user_calorie_stats")
    .delete()
    .eq("id", mealId);

  if (error) {
    throw new Error(`Error deleting meal: ${error.message}`);
  }
}

export async function getMealsByDate(date: Date): Promise<FoodsTableEntry[]> {
  const { data, error } = await supabase
    .from("user_calorie_stats")
    .select("*")
    .eq("created_at", date)
    .order("type", { ascending: true });
  if (error) {
    throw new Error(`Error fetching meals: ${error.message}`);
  }

  return data;
}

export async function getMealsByType(
  type: MealType,
  date?: string
): Promise<FoodsTableEntry[]> {
  console.log("Fetching meals by type:", { type, date });
  const { data, error } = date
    ? await supabase
        .from("user_calorie_stats")
        .select("*, barcode_id(*)")
        .eq("type", type)
        .eq("created_at", date)
        .order("type", { ascending: true })
    : await supabase
        .from("user_calorie_stats")
        .select("*, barcode_id(*)")
        .eq("type", type)
        .order("type", { ascending: true });

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
    .from("user_calorie_stats")
    .update(updatedData)
    .eq("id", mealId);

  if (error) {
    throw new Error(`Error editing meal: ${error.message}`);
  }
}
