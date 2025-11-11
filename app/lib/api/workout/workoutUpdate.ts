import { supabase } from "@/lib/supabase";
import { Result } from "@/types/ErrorHandling";

export async function updateWorkout(
  workoutId: number,
  update: InsertWorkout
): Promise<Result<Workout>> {
  const upWorkout: any = {};

  if (update.name !== undefined) upWorkout.name = update.name;
  if (update.description !== undefined)
    upWorkout.description = update.description;

  const { data, error } = await supabase
    .from("workouts")
    .update(upWorkout)
    .eq("id", workoutId)
    .select()
    .single();

  if (error) return { data: null, error: error.message };

  return { data: data as Workout, error: null };
}

export async function updateWorkoutExerciseSet(
  update: InsertWorkoutExercise
): Promise<Result<WorkoutExercise>> {
  const upExercise: any = {};

  if (update.rest_seconds !== undefined)
    upExercise.rest_seconds = update.rest_seconds;
  if (update.reps_target !== undefined)
    upExercise.reps_target = update.reps_target;
  if (update.weight_kg !== undefined) upExercise.weight_kg = update.weight_kg;

  const { data, error } = await supabase
    .from("workout_exercises")
    .update(upExercise)
    .eq("workout_id", update.workout_id)
    .eq("exercise_id", update.exercise_id)
    .eq("set_indes", update.set_index)
    .select()
    .single();

  if (error) return { data: null, error: error.message };

  return { data: data as WorkoutExercise, error: null };
}

export async function updateWorkoutExerciseLogSet(
  update: InsertWorkoutLog
): Promise<Result<WorkoutLog>> {
  const upExercise: any = {};

  upExercise.workout_id = update.workout_id;
  upExercise.exercise_id = update.exercise_id;
  upExercise.set_index = update.set_index;
  upExercise.created_at = update.created_at;
  if (update.reps_completed !== undefined)
    upExercise.reps_completed = update.reps_completed;
  if (update.weight_kg !== undefined) upExercise.weight_kg = update.weight_kg;

  const { data, error } = await supabase
    .from("workout_logs")
    .update(upExercise)
    .eq("workout_id", update.workout_id)
    .eq("exercise_id", update.exercise_id)
    .eq("created_at", update.created_at)
    .eq("set_index", update.set_index)
    .select()
    .single();

  if (error) return { data: null, error: error.message };

  return { data: data as WorkoutLog, error: null };
}

//TODO need to check if i want to update all sets or only one set
//TODO for updateing order_index i need to change more than one exercise
