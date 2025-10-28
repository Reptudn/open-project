import { supabase } from "@/lib/supabase";
import { Result } from "@/types/ErrorHandling";

export async function getWorkouts(): Promise<Result<Workout[]>> {
  const { data, error } = await supabase.from("workouts").select("*");

  if (error) return { data: null, error: error.message };

  return { data: data as Workout[], error: null };
}

export async function getWorkoutExercises(
  workoutId: number
): Promise<Result<WorkoutExercise[]>> {
  const { data, error } = await supabase
    .from("workout_exercises")
    .select("*")
    .eq("workout_id", workoutId);

  if (error) {
    return { data: null, error: error.message };
  }
  return { data: data, error: null };
}

export async function getWorkoutLogs(
  workoutId: number,
  sessionId: WorkoutSession
): Promise<Result<WorkoutLog[]>> {
  const { data, error } = await supabase
    .from("workout_logs")
    .select("*")
    .eq("workout_id", workoutId)
    .eq("session_id", sessionId);

  if (error) return { data: null, error: error.message };

  return { data: data, error: null };
}
