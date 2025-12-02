import { View, StyleSheet, Alert } from "react-native";
import ExerciseCard from "./ExerciseCard";
import { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { useBottomSheetContext } from "@/hooks/use-bottomSheet-context";
import SetList from "./SetList";
import { getWorkoutLogs } from "@/lib/api/workout/workoutSelect";
import { useEffect, useState } from "react";

interface Logs {
  id: number;
  workout_id: Workout;
  exercise_id: Exercise;
  set_index: number;
  reps?: number;
  rest_seconds?: number;
  weight_kg?: number;
  created_at: string;
}

export default function ExerciseList({
  exercises,
}: {
  exercises: WorkoutExercise[] | WorkoutLog[];
}) {
  const [mapExercises, setMapExercises] = useState<Map<string, Logs[]>>(
    new Map()
  );
  const { openSheet } = useBottomSheetContext();

  function isWorkoutLogArray(
    arr: WorkoutLog[] | WorkoutExercise[]
  ): arr is WorkoutExercise[] {
    return "order_index" in arr[0];
  }

  useEffect(() => {
    const loadLogs = async () => {
      if (isWorkoutLogArray(exercises)) {
        const created_at = new Date().toISOString().split("T")[0];

        const { data, error } = await getWorkoutLogs(
          exercises[0].workout_id.id,
          created_at
        );

        if (error) {
          Alert.alert(error);
          return;
        }

        console.log("data = ", data);
        if (data) {
          const newMap = new Map<string, Logs[]>();

          data.forEach((item) => {
            const id = item.exercise_id.exercise_id;
            if (!newMap.has(id)) newMap.set(id, []);
            newMap.get(id)?.push(item);
          });

          exercises.forEach((item) => {
            const id = item.exercise_id.exercise_id;

            if (!newMap.has(id)) {
              newMap.set(id, []);
              newMap.get(id)?.push(item);
            }
          });
          setMapExercises(newMap);
          return;
        }
      }
      const newMap = new Map<string, Logs[]>();

      exercises.forEach((item) => {
        const id = item.exercise_id.exercise_id;
        if (!newMap.has(id)) newMap.set(id, []);
        newMap.get(id)?.push(item);
      });
      setMapExercises(newMap);
    };
    loadLogs();
  }, []);

  return (
    <BottomSheetScrollView
      contentContainerStyle={styles.scrollContent}
      style={styles.scrollView}
    >
      {[...mapExercises.entries()].map(([exerciseId, logs]) => (
        <View key={exerciseId}>
          <ExerciseCard
            exercise={logs[0].exercise_id}
            onPress={() => openSheet(<SetList info={logs} />)}
          />
        </View>
      ))}
    </BottomSheetScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    width: "100%",
  },
  scrollContent: {
    paddingVertical: 10,
    paddingHorizontal: 8,
    paddingBottom: 20,
  },
});
