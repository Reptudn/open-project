import { Result } from "@/types/ErrorHandling";
import { supabase } from "../../supabase";
import { Session } from "@supabase/supabase-js";

// Getter Function

export async function getUser(id: string): Promise<Profile | null> {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) {
    console.error("Problem loading User Table", error.message);
    return null;
  }
  return data;
}

export async function getWorkouts(): Promise<Workout[] | null> {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const { data, error } = await supabase
    .from("workouts")
    .select("*")
    .eq("user_id", user?.id);

  if (error) {
    console.log("Problem loading Workouts Table", error);
    return null;
  }
  return data;
}

export async function getExercise(id: number) {
  const { data, error } = await supabase
    .from("exercises")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) {
    console.error("Problem loading Exercises", error);
    return null;
  }
  return data;
}

export async function getWorkoutExercises(
  workoutId: number
): Promise<WorkoutExercise[] | null> {
  const { data, error } = await supabase
    .from("workout_exercises")
    .select("*")
    .eq("workout_id", workoutId);

  if (error) {
    console.error("Problem loading WorkoutExercises Table", error);
    return null;
  }
  return data;
}

export async function getWorkoutLogs(
  workoutId: number
): Promise<WorkoutLog[] | null> {
  const { data, error } = await supabase
    .from("workout_logs")
    .select("*")
    .eq("workout_id", workoutId);

  if (error) {
    console.error("Problem loading WorkoutLogs", error);
    return null;
  }
  return data;
}

// Setter Function

export async function registerProfile(
  profile: Profile,
  session: Session | null
): Promise<Result<Profile>> {
  if (!session) return { data: null, error: "No Session found" };

  const response = await fetch(
    "https://tegfwlejpnjfcyyppogf.supabase.co/functions/v1/setProfile",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.access_token}`,
      },
      body: JSON.stringify({
        id: profile.id,
        username: profile.username,
        full_name: profile.full_name,
        gender: profile.gender,
        birth_date: profile.birth_date,
        height_cm: profile.height_cm,
        weight_kg: profile.weight_kg,
      }),
    }
  );

  const json = await response.json();

  if (!response.ok || json.message) {
    return { data: null, error: json.message };
  }
  return { data: json.data as Profile, error: null };
}

export async function createWorkout(
  workout: Workout,
  session: Session | null
): Promise<Result<Workout>> {
  if (!session) return { data: null, error: "No Session found" };

  const response = await fetch(
    "https://tegfwlejpnjfcyyppogf.supabase.co/functions/v1/setWorkout",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.access_token}`,
      },
      body: JSON.stringify({
        user_id: workout.user_id,
        name: workout.name,
        description: workout.description,
      }),
    }
  );

  const json = await response.json();

  if (!response.ok || json.message) {
    return { data: null, error: json.message };
  }
  return { data: json.data as Workout, error: null };
}

export async function addExercise(
  exercises: WorkoutExercise[],
  session: Session | null
): Promise<Result<WorkoutExercise[]>> {
  if (!session) return { data: null, error: "No Session found" };

  if (exercises.length === 0)
    return { data: null, error: "No Exercises added" };

  const response = await fetch(
    "https://tegfwlejpnjfcyyppogf.supabase.co/functions/v1/addExercise",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.access_token}`,
      },
      body: JSON.stringify({
        exercises: exercises.map((ex) => ({
          workout_id: ex.workout_id,
          exercise_id: ex.exercise_id,
          set_index: ex.set_index,
          reps_target: ex.reps_target,
          rest_seconds: ex.rest_seconds,
          order_index: ex.order_index,
        })),
      }),
    }
  );

  const json = await response.json();

  if (!response.ok || json.message) {
    return { data: null, error: json.message };
  }
  return { data: json.data as WorkoutExercise[], error: null };
}

export async function addExerciseLog(
  exerciseLog: WorkoutLog[],
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

export async function setWorkoutSession(
  workoutSession: WorkoutSession,
  session: Session | null
): Promise<Result<WorkoutSession>> {
  if (!session) return { data: null, error: "No Session found" };

  const response = await fetch(
    "https://tegfwlejpnjfcyyppogf.supabase.co/functions/v1/setSession",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.access_token}`,
      },
      body: JSON.stringify({
        workout_id: workoutSession.workout_id,
      }),
    }
  );

  const json = await response.json();

  if (!response.ok || json.message) {
    return { data: null, error: json.message };
  }
  return { data: json.data as WorkoutSession, error: null };
}
