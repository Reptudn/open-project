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
import { useEffect, useState } from "react";
import { getAllWorkoutLogsByDate } from "@/lib/api/workout/workoutSelect";

export default function DailyTraining() {
  const [workout, setWorkout] = useState<
    { workoutId: number; workoutName: string | undefined }[]
  >([]);
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
      console.log("data =", data);
      if (data) {
        const uniqueWorkouts = Array.from(
          new Map(data.map((item) => [item.workout_id.id, item])).values()
        ).map((item) => ({
          workoutId: item.workout_id.id,
          workoutName: item.workout_id.name,
        }));
        console.log("test map", uniqueWorkouts);
        setWorkout(uniqueWorkouts);
      }
    };
    getWorkouts();
  }, []);

  return (
    <View>
      <Text style={styles.text}>Workouts:</Text>
      <View style={styles.container}>
        <ScrollView>
          {workout.map((item) => (
            <View key={item.workoutId} style={styles.list}>
              <TouchableOpacity style={styles.card} onPress={() => {}}>
                <Text style={styles.cardText}>{item.workoutName}</Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
        <TouchableOpacity onPress={() => openSheet(<WorkoutSheet />)}>
          <TouchableOpacity
            style={styles.floatingButton}
            onPress={() => openSheet(<WorkoutSheet />)}
          >
            <Ionicons name="add" size={32} color="white" />
          </TouchableOpacity>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
    flexDirection: "row",
    borderRadius: 10,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#dddddd51",
    justifyContent: "center",
  },
  text: {
    color: "#ffffffff",
    fontFamily: "system-ui",
    fontSize: 20,
  },
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
  floatingButton: {
    position: "absolute",
    bottom: 20,
    alignSelf: "center",
    backgroundColor: "#333",
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5, // Android shadow
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
});
