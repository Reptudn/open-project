import { supabase } from "@/lib/supabase";
import { Result } from "@/types/ErrorHandling";

export async function getWorkouts(): Promise<Result<Workout[]>> {
  const { data, error } = await supabase.from("workouts").select("*");

  if (error) return { data: null, error: error.message };

  return { data: data as Workout[], error: null };
}

export async function getWorkout(workoutid: number): Promise<Result<Workout>> {
  const { data, error } = await supabase.from("workouts").select("*").eq("id", workoutid).single();

  if (error) return { data: null, error: error.message };

  return { data: data as Workout, error: null };
}

export async function getWorkoutExercises(
  workoutId: number
): Promise<Result<WorkoutExercise[]>> {
  const { data, error } = await supabase
    .from("workout_exercises")
    .select("*, exercise_id(*), workout_id(*)")
    .eq("workout_id", workoutId);

  if (error) {
    return { data: null, error: error.message };
  }
  return { data: data, error: null };
}

export async function getWorkoutLogs(
  workoutId: number,
  date: string
): Promise<Result<WorkoutLog[]>> {
  const { data, error } = await supabase
    .from("workout_logs")
    .select("*, exercise_id(*), workout_id(*)")
    .eq("workout_id", workoutId)
    .eq("created_at", date);

  if (error) return { data: null, error: error.message };

  return { data: data, error: null };
}
