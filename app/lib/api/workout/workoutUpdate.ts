import { supabase } from "@/lib/supabase";
import { Result } from "@/types/ErrorHandling";

export async function updateWorkout(
  workoutId: number, update: InsertWorkout
): Promise<Result<Workout>> {
  const upWorkout: any = {};

  if (update.name !== undefined) upWorkout.name = update.name;
  if (update.description !== undefined) upWorkout.discription = update.description;

  const { data, error } = await supabase
    .from("workouts")
    .update(upWorkout)
    .eq("workout_id", workoutId)
    .select()
    .single();

  if (error) return { data: null, error: error.message };

  return { data: data as Workout, error: null };
}

export async function updateWorkoutExercise(
  workoutId: number,
  exerciseId: string,
  set_index: number | null,
  update: {
    order_index?: number;
    rest_seconds?: number;
    reps_target?: number;
    set_index?: number;
  }
): Promise<Result<WorkoutExercise>> {
  const upExercise: any = {};

  if (update.order_index !== undefined)
    upExercise.order_index = update.order_index;
  if (update.rest_seconds !== undefined)
    upExercise.rest_seconds = update.rest_seconds;
  if (update.reps_target !== undefined)
    upExercise.reps_target = update.reps_target;
  if (update.set_index !== undefined) upExercise.set_index = update.set_index;

  const { data, error } = await supabase
    .from("workout_exercises")
    .update(upExercise)
    .eq("workout_id", workoutId)
    .eq("exercise_id", exerciseId)
    .select()
    .single();

  if (error) return { data: null, error: error.message };

  return { data: data as WorkoutExercise, error: null };
}

export async function updateWorkoutLog() {}

//TODO need to check if i want to update all sets or only one set
//TODO for updateing order_index i need to change more than one exercise