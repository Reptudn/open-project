import { Alert } from "react-native";
import { supabase } from "../supabase";
import { PropsFilter } from "react-native-reanimated/lib/typescript/createAnimatedComponent/PropsFilter";
import { useAuthContext } from "@/hooks/use-auth-context";
import { Session } from "@supabase/supabase-js";
import { Exercise } from "@/types/Exercise";

export interface Profile {
  id?: string;
  username?: string;
  full_name?: string;
  gender?: string;
  birth_date?: Date;
  height_cm?: number;
  weight_kg?: number;
  created_at?: string;
  updated_at?: string;
}

interface Workout {
  id?: number;
  user_id: string;
  name: string;
  description?: string;
  created_at?: string;
}

interface WorkoutExercise {
  id?: number;
  workout_id: number;
  exercise_id: string;
  set_index?: number;
  reps_target?: number;
  rest_seconds?: number;
  order_index: number;
  created_at?: string;
}

interface WorkoutLog {
  id?: number;
  workout_id: number;
  exercise_id: string;
  set_index: number;
  reps_completed: number;
  weight_kg: number;
  created_at?: string;
}

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
  profile: Profile
): Promise<Profile | null> {
  const { session } = useAuthContext();
  if (!session) return null;
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

  const data = await response.json();

  if (data.message) {
    Alert.alert(data.message);
    return null;
  }
  return data.data as Profile;
}

export async function createWorkout(
  workout: Workout,
  session: Session | null
): Promise<Workout | null> {
  if (!session) return null; //TODO Error handling
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

  const data = await response.json();

  if (data.message) {
    return null; //TODO Error handling
  }
  return data.data as Workout;
}

export async function addExercise(
  exercises: WorkoutExercise[],
  session: Session | null
): Promise<WorkoutExercise[] | null> {
  if (!session || exercises.length === 0) return null; //TODO Error handling
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

  const data = await response.json();

  if (data.message) {
    //TODO Error handling
    Alert.alert(data.message);
    return null;
  }
  return data.data as WorkoutExercise[];
}
