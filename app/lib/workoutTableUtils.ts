import { Alert } from "react-native";
import { supabase } from "./supabase";

export interface Profile {
  id: string;
  username?: string;
  full_name?: string;
  gender?: string;
  birth_data?: string;
  height_cm?: number;
  weight_kg?: number;
  created_at?: string;
  updated_at?: string;
}

interface Workout {
  id: number;
  user_id: string;
  name: string;
  description: string;
  created_at: string;
}

interface WorkoutExercise {
  id: number;
  workout_id: number;
  exercise_id: number;
  sets: number;
  reps: number;
  rest_seconds: number;
  order_index: number;
  created_at: string;
}

interface WorkoutLog {
  id: number;
  workout_id: number;
  exercise_id: number;
  sets_completed: number;
  reps_completed: number;
  weight_kg: number;
  created_at: string;
}

// Getter Function

export async function getUser(id: string): Promise<Profile | null> {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) {
    console.error("Problem loading User Table", error);
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

export async function registerProfile(id?: string) {
  const response = await fetch(
    "https://tegfwlejpnjfcyyppogf.supabase.co/functions/v1/setProfile",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.EXPO_PUBLIC_KEY || "default"}`,
      },
      body: JSON.stringify({
        id: id,
      }),
    }
  );

  const data = await response.json();

  if (data.message) {
    Alert.alert(data.message);
  }
}

export async function setWorkout(workout: Workout) {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (user) workout.user_id = user.id;

  const { error } = await supabase.from("workouts").insert([workout]);

  if (error) {
    console.error("Problem insert to Workouts Table", error);
  }
}

export async function setWorkoutExercise(workoutExercises: WorkoutExercise) {
  const { error } = await supabase
    .from("workout_exercises")
    .insert([workoutExercises]);

  if (error) {
    console.error("Problem insert to WorkoutsExercises Table", error);
  }
}

export async function setWorkoutLogs(workoutLog: WorkoutLog) {
  const { error } = await supabase.from("workout_logs").insert([workoutLog]);

  if (error) {
    console.error("Problem insert to WorkoutLogs Table", error);
  }
}
