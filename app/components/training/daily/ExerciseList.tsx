import { View, StyleSheet, Alert } from "react-native";
import ExerciseCard from "./ExerciseCard";
import { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { useBottomSheetContext } from "@/hooks/use-bottomSheet-context";
import SetList from "./SetList";

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
  const mapExercises = new Map<string, Logs[]>([]);
  const { openSheet } = useBottomSheetContext();

  exercises.forEach((item) => {
    const id = item.exercise_id.exercise_id;

    if (!mapExercises.has(id)) mapExercises.set(id, []);
    mapExercises.get(id)?.push(item);
  });

  return (
    <BottomSheetScrollView
      contentContainerStyle={styles.scrollContent}
      style={styles.scrollView}
    >
      {[...mapExercises.entries()].map(([exerciseId, logs]) => (
        <View key={exerciseId}>
          <ExerciseCard
            exercise={logs[0].exercise_id}
            onPress={() => openSheet(<SetList sets={logs}/>)}
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
