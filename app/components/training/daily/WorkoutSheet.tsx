import { useBottomSheetContext } from "@/hooks/use-bottomSheet-context";
import {
  getWorkoutExercises,
  getWorkouts,
} from "@/lib/api/workout/workoutSelect";
import { BottomSheetView } from "@gorhom/bottom-sheet";
import { useCallback, useEffect, useState } from "react";
import { Alert, TouchableOpacity, View, Text, StyleSheet } from "react-native";
import ExerciseSheet from "./ExerciseSheet";

export default function WorkoutSheet() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const { openSheet } = useBottomSheetContext();

  useEffect(() => {
    const getItems = async () => {
      const { data, error } = await getWorkouts();
      if (error) {
        Alert.alert(error);
        return;
      }
      setWorkouts(data ?? []);
    };
    getItems();
  }, []);

  const handleExercisePress = useCallback((item: WorkoutExercise) => {
    openSheet(<ExerciseSheet exercise={item} />);
  }, []);

  const handleWorkoutPress = useCallback(
    async (item: Workout) => {
      const { data, error } = await getWorkoutExercises(item.id);

      if (error) {
        Alert.alert(error);
        return;
      }

      const workoutExercises = data ?? [];
      openSheet(
        <View style={styles.exerciseSheet}>
          <Text style={styles.exerciseTitle}>{item.name}</Text>
          <BottomSheetView>
            {workoutExercises.length > 0 ? (
              workoutExercises.map((exercise) => (
                <View key={exercise.id} style={styles.list}>
                  <TouchableOpacity
                    style={styles.card}
                    onPress={() => handleExercisePress(exercise)}
                  >
                    <Text style={styles.cardText}>
                      {exercise.exercise_id.name}
                    </Text>
                  </TouchableOpacity>
                </View>
              ))
            ) : (
              <Text style={styles.exerciseDescription}>
                No exercises found for this workout
              </Text>
            )}
          </BottomSheetView>
        </View>
      );
    },
    [openSheet]
  );

  const renderWorkouts = useCallback(
    (item: Workout) => (
      <View key={item.id} style={styles.list}>
        <TouchableOpacity
          style={styles.card}
          onPress={() => handleWorkoutPress(item)}
        >
          <Text style={styles.cardText}>{item.name}</Text>
        </TouchableOpacity>
      </View>
    ),
    [handleWorkoutPress]
  );

  return <BottomSheetView>{workouts.map(renderWorkouts)}</BottomSheetView>;
}

const styles = StyleSheet.create({
  list: {
    padding: 2,
  },
  card: {
    height: 48,
    width: "100%",
    maxWidth: 350,
    borderWidth: 2,
    borderColor: "#333",
    borderRadius: 8,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
  cardText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  exerciseSheet: {
    padding: 20,
  },
  exerciseTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  exerciseDescription: {
    alignSelf: "center",
    fontSize: 14,
    color: "#666",
  },
});
