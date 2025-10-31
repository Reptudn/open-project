import { supabase } from "@/lib/supabase";
import { Result } from "@/types/ErrorHandling";

export async function deleteWorkout(
  workoutId: number
): Promise<Result<Workout>> {
  const { data, error } = await supabase
    .from("workouts")
    .delete()
    .eq("id", workoutId)
    .select()
    .single();

  if (error) return { data: null, error: error.message };

  return { data: data as Workout, error: null };
}

export async function removeExercise(
  workoutId: number,
  exerciseId: string
): Promise<Result<WorkoutExercise[]>> {
  const { data, error } = await supabase
    .from("workout_exercises")
    .delete()
    .eq("workout_id", workoutId)
    .eq("exercise_id", exerciseId)
    .select();

  if (error) return { data: null, error: error.message };

  return { data: data as WorkoutExercise[], error: null };
}

export async function removeExerciseSet(
  workoutId: number,
  exerciseId: string,
  setIndex: number
): Promise<Result<WorkoutExercise>> {
  const { data, error } = await supabase
    .from("workout_exercises")
    .delete()
    .eq("workout_id", workoutId)
    .eq("exercise_id", exerciseId)
    .eq("set_index", setIndex)
    .select()
    .single();

  if (error) return { data: null, error: error.message };

  return { data: data as WorkoutExercise, error: null };
}
