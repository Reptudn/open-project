import { getWorkoutExercises, getWorkouts } from "@/lib/api/workout/workoutSelect";
import { BottomSheetView } from "@gorhom/bottom-sheet";
import { useCallback, useEffect, useState } from "react";
import { Alert, View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useBottomSheetContext } from "../../../hooks/use-bottomSheet-context";

export default function DailyTrainingList() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [exercises, setExercises] = useState<WorkoutExercise[]>([]);
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

  const handleWorkoutPress = useCallback(
    (item: Workout) => {
      const getItems = async () => {
        const {data, error} = await getWorkoutExercises(item.id);
        if (error) {
          Alert.alert(error);
          return;
        }
        setExercises(data ?? []);
      }
      getItems();
      openSheet(
        <View style={styles.exerciseSheet}>
          <Text style={styles.exerciseTitle}>{item.name}</Text>
          <BottomSheetView>{exercises.map(renderExercises)}</BottomSheetView>
        </View>
      );
    },
    [openSheet]
  );

  const handleExercisePress = useCallback(
    (item: WorkoutExercise) => {
      openSheet(
        <View style={styles.exerciseSheet}>
          <Text style={styles.exerciseTitle}>{item.name}</Text>
          <Text style={styles.exerciseDescription}>
            Exercises for this workout will appear here
          </Text>
        </View>
      );
    },
    [openSheet]
  );

  const renderExercises = useCallback(
    (item: WorkoutExercise) => (
      <View key={item.id} style={styles.list}>
        <TouchableOpacity
          style={styles.card}
          onPress={() => handleExercisePress(item)}
        >
          <Text style={styles.cardText}>{item.exercise_id.name}</Text>
        </TouchableOpacity>
      </View>
    ),
    [handleExercisePress]
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

  return <BottomSheetView> {workouts.map(renderWorkouts)}</BottomSheetView>;
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
    fontSize: 14,
    color: "#666",
  },
});
