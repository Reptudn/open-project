import { supabase } from "@/lib/supabase";
import { Result } from "@/types/ErrorHandling";

export async function deleteWorkout(
  workoutId: number
): Promise<Result<boolean>> {
  const { error } = await supabase
    .from("workouts")
    .delete()
    .eq("id", workoutId);

  if (error && error.message) return { data: null, error: error.message };

  return { data: true, error: null };
}

export async function removeExercise(
  workoutId: number,
  exerciseId: string
): Promise<Result<boolean>> {
  const { error } = await supabase
    .from("workout_exercises")
    .delete()
    .eq("workout_id", workoutId)
    .eq("exercise_id", exerciseId);

  if (error && error.message) return { data: null, error: error.message };

  return { data: true, error: null };
}
