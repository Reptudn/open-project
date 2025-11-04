interface Workout {
  id: number;
  user_id: string;
  name: string;
  description?: string;
  created_at: string;
}

interface InsertWorkout {
  name: string;
  description?: string;
}

interface WorkoutExercise {
  id: number;
  workout_id: number;
  exercise_id: Exercise;
  set_index?: number;
  reps_target?: number;
  rest_seconds?: number;
  weight?: number;
  order_index: number;
  created_at: string;
}

interface InsertWorkoutExercise {
  workout_id: number;
  exercise_id: string;
  set_index?: number;
  reps_target?: number;
  rest_seconds?: number;
  weight?: number;
  order_index: number;
}

interface WorkoutLog {
  id?: number;
  session_id: string;
  exercise_id: string;
  set_index: number;
  reps_completed: number;
  weight_kg: number;
  created_at?: string;
}

interface WorkoutSession {
  id?: string;
  workout_id: number;
  started_at: string;
  ended_at: string;
}
