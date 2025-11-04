import { Result } from "@/types/ErrorHandling";
import { Session } from "@supabase/supabase-js";

export async function createWorkout(
  workout: InsertWorkout,
  session: Session | null
): Promise<Result<Workout>> {
  if (!session) return { data: null, error: "No Session found" };

  const body = {
    user_id: session.user.id,
    name: workout.name,
    description: workout.description ?? null,
  };

  const response = await fetch(
    "https://tegfwlejpnjfcyyppogf.supabase.co/functions/v1/setWorkout",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.access_token}`,
      },
      body: JSON.stringify(body),
    }
  );

  const json = await response.json();

  if (!response.ok || json.message) {
    return { data: null, error: json.message };
  }
  return { data: json.data as Workout, error: null };
}

export async function addExercise(
  exercises: InsertWorkoutExercise[],
  session: Session | null
): Promise<Result<WorkoutExercise[]>> {
  if (!session) return { data: null, error: "No Session found" };

  if (exercises.length === 0)
    return { data: null, error: "No Exercises added" };

  const body = exercises.map((ex) => ({
    workout_id: ex.workout_id,
    exercise_id: ex.exercise_id,
    set_index: ex.set_index ?? null,
    reps_target: ex.reps_target ?? null,
    rest_seconds: ex.rest_seconds ?? null,
    order_index: ex.order_index,
  }));

  const response = await fetch(
    "https://tegfwlejpnjfcyyppogf.supabase.co/functions/v1/addExercise",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.access_token}`,
      },
      body: JSON.stringify(body),
    }
  );

  const json = await response.json();

  if (!response.ok || json.message) {
    return { data: null, error: json.message };
  }
  return { data: json.data as WorkoutExercise[], error: null };
}

export async function addExerciseLog(
  exerciseLog: InsertWorkoutLog[],
  session: Session | null
): Promise<Result<WorkoutLog[]>> {
  if (!session) return { data: null, error: "No Session found" };

  if (exerciseLog.length === 0)
    return { data: null, error: "No Exercise Logs where added" };

  const response = await fetch(
    "https://tegfwlejpnjfcyyppogf.supabase.co/functions/v1/addExerciseLog",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.access_token}`,
      },
      body: JSON.stringify({
        exercisesLog: exerciseLog.map((ex) => ({
          workout_id: ex.workout_id,
          exercise_id: ex.exercise_id,
          set_index: ex.set_index,
          reps_completed: ex.reps_completed,
          rest_seconds: ex.weight_kg,
          created_at: ex.created_at
        })),
      }),
    }
  );

  const json = await response.json();

  if (!response.ok || json.message) {
    return { data: null, error: json.message };
  }
  return { data: json.data as WorkoutLog[], error: null };
}
