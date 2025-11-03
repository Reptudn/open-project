import { Modal, StyleSheet, TouchableOpacity, View } from "react-native";
import { useColorScheme } from "@/hooks/use-color-scheme";
import GymView from "@/components/ui/GymView";
import { GymHeader, GymText } from "@/components/ui/Text";
import { getThemeColor } from "@/constants/theme";
import {
  getWorkoutExercises,
  getWorkouts,
} from "@/lib/api/workout/workoutSelect";
import { ScrollView } from "react-native-gesture-handler";
import { useEffect, useRef, useState } from "react";
import { Modalize } from "react-native-modalize";
import { useAuthContext } from "@/hooks/use-auth-context";

export default function TrainingScreen() {
  const theme = getThemeColor(useColorScheme());
  const [fullWorkout, setFullWorkout] = useState<Workout[]>([]);
  const modalizeRef = useRef<Modalize>(null);
  const [exercises, setExercises] = useState<WorkoutExercise[]>([]);
  const { session } = useAuthContext();

  useEffect(() => {
    const workouts = async () => {
      const { data, error } = await getWorkouts();
      if (error) {
        alert("Didnt get workouts");
      }
      if (data) setFullWorkout(data);
    };
    workouts();
  }, []);

  const openWorkoutInfo = async (workoutid: number) => {
    const { data, error } = await getWorkoutExercises(workoutid);
    if (error) {
      alert(`Couldn't get workouts: ${error}`);
      return;
    }
    if (data) {
      setExercises(data);
    }
    modalizeRef.current?.open();
  };

  return (
    <GymView>
      <ScrollView>
        {fullWorkout.length > 0 ? (
          fullWorkout.map((workout) => (
            <TouchableOpacity
              key={workout.id}
              className="border border-r-8 m-2 rounded-lg"
              style={{ borderColor: theme.text }}
              onPress={() => openWorkoutInfo(workout.id)}
            >
              <GymView>
                <GymHeader>{workout.name}</GymHeader>
                <GymText>{workout.description}</GymText>
              </GymView>
            </TouchableOpacity>
          ))
        ) : (
          <View
            style={{
              flex: 1,
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            <GymText>No workouts found.</GymText>
          </View>
        )}
      </ScrollView>

      <Modalize
        ref={modalizeRef}
        modalStyle={{ backgroundColor: theme.background }}
      >
        <ScrollView style={{ padding: 16 }}>
          {exercises.map((exercise) => (
            <View
              key={exercise.id}
              style={{
                padding: 10,
                borderBottomWidth: 1,
                borderColor: theme.text + "20",
                marginBottom: 8,
              }}
            >
              <GymText>Exercise Name: {exercise.exercise_id.name ?? "Untitled"}</GymText>
            </View>
          ))}
        </ScrollView>
      </Modalize>
    </GymView>
  );
}
