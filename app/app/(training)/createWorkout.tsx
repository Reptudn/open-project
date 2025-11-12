import { Dimensions, TextInput, View } from "react-native";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { getThemeColor } from "@/constants/theme";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { router, useLocalSearchParams } from "expo-router";
import { GymHeader, GymText, GymTitle } from "@/components/ui/Text";
import { GymButtonMedium } from "@/components/ui/Button";
import { WorkoutExerciseItem } from "@/components/training/exercises/ExerciseItem";
import {
  getWorkout,
  getWorkoutExercises,
} from "@/lib/api/workout/workoutSelect";
import { updateWorkout } from "@/lib/api/workout/workoutUpdate";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { deleteWorkout } from "@/lib/api/workout/workoutDelete";

let name: string;
let description: string;
let id: string;

export default function TrainingScreen() {
  const theme = getThemeColor(useColorScheme());
  const { height, width } = Dimensions.get("window");
  const { workoutId } = useLocalSearchParams();
  const [exercises, setExercises] = useState<WorkoutExercise[]>([]);
  const bottomSheetRef = useRef<BottomSheet>(null);

  const snapPoints = useMemo(() => ["90%"], []);

  const handleSheetChanges = useCallback((index: number) => {
    if (index === -1) {
      router.push("/(tabs)/training");
    }
  }, []);

  const [workoutName, setWorkoutName] = useState("");
  const [workoutDescription, setWorkoutDescription] = useState("");

  useEffect(() => {
    openWorkoutInfo(Number(workoutId));
  }, []);

  useEffect(() => {
    if (id != workoutId) {
      name = "";
      description = "";
    }
    id = workoutId as string;
  }, [workoutId]);

  useEffect(() => {
    const fetchWorkout = async () => {
      const { data, error } = await getWorkout(Number(workoutId));
      if (error) {
        alert(`Error in fetchWorkout: ${error}`);
        return;
      }
      if (data) {
        if (workoutName) name = workoutName;
        if (workoutDescription) description = workoutDescription;
      }
    };
    fetchWorkout();
  }, [workoutName, workoutDescription]);

  const handleButtonPress = async () => {
    const { data, error } = await updateWorkout(
      Number(workoutId),
      name,
      description
    );
    if (error) {
      alert(`Error in update: ${error}`);
    }
    router.push({
      pathname: "/(training)/trainingOverview",
      params: { workoutId: workoutId },
    });
  };

  const handleFinishWorkout = async () => {
    const { data, error } = await updateWorkout(
      Number(workoutId),
      name,
      description
    );
    if (error) {
      alert(`Error in update: ${error}`);
    }
    router.push({
      pathname: "/(tabs)/training",
      // params: { workoutId: workoutId },
    });
  };

  const openWorkoutInfo = async (workoutid: number) => {
    const { data, error } = await getWorkoutExercises(Number(workoutId));
    if (error) {
      alert(`Couldn't get workouts: ${error}`);
      return;
    }
    if (data) {
      setExercises(data);
    }
  };

  const handleSheetClose = async () => {
    const { data, error } = await getWorkout(Number(workoutId));
    if (error) {
      alert(`Error in fetchWorkout: ${error}`);
      return;
    }
    console.log(data);
    if (data) {
      console.log("here");
      if (data.name === "" || data.name === "Untitled") {
        deleteWorkout(Number(workoutId));
        console.log("deleted");
      }
    } else {
      console.log("not here");
    }
  };

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={1}
      snapPoints={snapPoints}
      onChange={handleSheetChanges}
      backgroundStyle={{ backgroundColor: theme.background }}
      enablePanDownToClose={true}
      onClose={handleSheetClose}
    >
      <BottomSheetScrollView
        contentContainerStyle={{
          flexGrow: 1,
          paddingBottom: 20,
        }}
      >
        <View>
          <GymTitle
            style={{ color: theme.text, marginBottom: 20, textAlign: "center" }}
          >
            Build your workout
          </GymTitle>
          <View
            style={{
              padding: 10,
              borderColor: theme.text,
              borderWidth: 1,
              borderRadius: 5,
              margin: 20,
              backgroundColor: theme.secondaryBackground,
            }}
          >
            <GymText>Workout Name</GymText>
            <TextInput
              placeholder={name ? name : "Name..."}
              placeholderTextColor={theme.icon}
              style={{ color: theme.text }}
              value={workoutName}
              onChangeText={(workoutName) => setWorkoutName(workoutName)}
            ></TextInput>
          </View>
          <View
            style={{
              padding: 10,
              borderColor: theme.text,
              borderWidth: 1,
              borderRadius: 5,
              margin: 20,
              backgroundColor: theme.secondaryBackground,
            }}
          >
            <GymText>Workout Description</GymText>
            <TextInput
              placeholder={description ? description : "Description..."}
              placeholderTextColor={theme.icon}
              style={{ color: theme.text }}
              value={workoutDescription}
              onChangeText={(workoutDescription) =>
                setWorkoutDescription(workoutDescription)
              }
            ></TextInput>
          </View>
          <View
            style={{
              padding: 10,
              borderColor: theme.text,
              borderWidth: 1,
              borderRadius: 5,
              margin: 20,
              backgroundColor: theme.secondaryBackground,
            }}
          >
            <GymHeader>Exercises: </GymHeader>
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
          <View style={{ rowGap: 20 }}>
            <GymButtonMedium onPress={handleButtonPress}>
              Add Exercise
            </GymButtonMedium>
            <GymButtonMedium onPress={handleFinishWorkout}>
              Finish Workout
            </GymButtonMedium>
          </View>
        </View>
      </BottomSheetScrollView>
    </BottomSheet>
  );
}
