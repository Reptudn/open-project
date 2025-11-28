import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useBottomSheetContext } from "@/hooks/use-bottomSheet-context";
import WorkoutSheet from "./WorkoutSheet";
import { useCallback, useEffect, useState } from "react";
import { getAllWorkoutLogsByDate } from "@/lib/api/workout/workoutSelect";
import WorkoutCard from "./WorkoutCard";
import ExerciseList from "./ExerciseList";

export default function DailyTraining() {
  const [workouts, setWorkout] = useState<Map<number, WorkoutLog[]>>(new Map());
  const { openSheet } = useBottomSheetContext();

  useEffect(() => {
    const getWorkouts = async () => {
      const { data, error } = await getAllWorkoutLogsByDate(
        new Date().toISOString().split("T")[0] // change to correct date
      );

      if (error) {
        Alert.alert(error);
        return;
      }
      if (data) {
        const map = new Map<number, WorkoutLog[]>();
        data.forEach((item) => {
          if (!map.has(item.workout_id.id)) map.set(item.workout_id.id, []);
          map.get(item.workout_id.id)?.push(item);
        });
        setWorkout(map);
      }
    };
    getWorkouts();
  }, []); // not good

  const renderList = useCallback(([workoutId, logs]) => (
    <View key={workoutId}>
      <WorkoutCard
        workout={logs[0].workout_id}
        onPress={() => openSheet(<ExerciseList exercises={logs} />)}
      />
    </View>
  ), []);

  return (
    <View>
      <Text style={styles.text}>Workouts:</Text>
      <View style={styles.container}>
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
        >
          {[...workouts.entries()].map(renderList)}
        </ScrollView>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => openSheet(<WorkoutSheet />)}
        >
          <Ionicons name="add" size={28} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    color: "#fff",
    fontSize: 20,
    marginBottom: 10,
  },

  container: {
    width: "100%",
    alignItems: "center",
  },

  scroll: {
    maxHeight: 400,
    width: "100%",
  },

  scrollContent: {
    paddingBottom: 12,
    gap: 10,
  },

  addButton: {
    marginTop: 20,
    backgroundColor: "#333",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",

    paddingVertical: 12,
    paddingHorizontal: 18,

    borderRadius: 12,
  },

  addButtonText: {
    color: "white",
    fontSize: 16,
    marginLeft: 8,
    fontWeight: "600",
  },
});
