import { Alert, Modal, StyleSheet, TouchableOpacity, View } from "react-native";
import { useColorScheme } from "@/hooks/use-color-scheme";
import GymView from "@/components/ui/GymView";
import { GymHeader, GymText } from "@/components/ui/Text";
import { getThemeColor } from "@/constants/theme";
import {
  getWorkoutExercises,
  getWorkouts,
} from "@/lib/api/workout/workoutSelect";
import { ScrollView } from "react-native-gesture-handler";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Modalize } from "react-native-modalize";
import { useAuthContext } from "@/hooks/use-auth-context";
import { deleteWorkout } from "@/lib/api/workout/workoutDelete";
import ExerciseItem, {
  WorkoutExerciseItem,
} from "@/components/training/exercises/ExerciseItem";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { router } from "expo-router";

export default function TrainingScreen() {
  const theme = getThemeColor(useColorScheme());
  const [fullWorkout, setFullWorkout] = useState<Workout[]>([]);
  const [exercises, setExercises] = useState<WorkoutExercise[]>([]);
  const bottomSheetRef = useRef<BottomSheet>(null);

  const snapPoints = useMemo(() => ["100%"], []);

  useEffect(() => {
    const workouts = async () => {
      const { data, error } = await getWorkouts();
      if (error) {
        alert("Didnt get workouts");
      }
      if (data) setFullWorkout(data);
    };
    workouts();
  }, [fullWorkout]);

  const openWorkoutInfo = async (workoutid: number) => {
    const { data, error } = await getWorkoutExercises(workoutid);
    if (error) {
      alert(`Couldn't get workouts: ${error}`);
      return;
    }
    if (data) {
      setExercises(data);
    }
    bottomSheetRef.current?.expand();
  };

  const handleDeleteWorkout = async (workout: Workout) => {
    Alert.alert(
      "Delete Workout",
      `Are you sure you want to delete ${workout.name}?`,
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: async () => {
            const { data, error } = await deleteWorkout(workout.id);
            if (error || !data) return;
            setFullWorkout(fullWorkout.filter((fw) => fw.id !== workout.id));
          },
        },
      ]
    );
  };

  return (
    <GymView>
      <ScrollView>
        {fullWorkout.length > 0 ? (
          fullWorkout.map((workout) => (
            <TouchableOpacity
              key={workout.id}
              onPress={() => openWorkoutInfo(workout.id)}
              onLongPress={() => handleDeleteWorkout(workout)}
              style={{
                marginBottom: 20,
                padding: 5,
                borderRadius: 10,
                flexDirection: "row",
                alignItems: "flex-start",
                gap: 15,
                width: "100%",
                borderColor: theme.text,
                borderWidth: 1,
              }}
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

      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        snapPoints={snapPoints}
        backgroundStyle={{ backgroundColor: theme.background }}
        enablePanDownToClose={true}
      >
        <BottomSheetScrollView
          contentContainerStyle={{
            flexGrow: 1,
            paddingBottom: 20,
          }}
        >
          <View style={{ alignItems: "center" }}>
            <GymHeader style={{ color: theme.text, justifyContent: "center" }}>
              Exercises
            </GymHeader>
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
                <WorkoutExerciseItem
                  exercise={exercise.exercise_id as Exercise}
                  workoutId={String(exercise.workout_id)}
                />
              </View>
            ))}
          </View>
        </BottomSheetScrollView>
      </BottomSheet>
    </GymView>
  );
}
