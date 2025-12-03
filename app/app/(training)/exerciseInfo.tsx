import {
  TouchableOpacity,
  Image,
  View,
  StyleSheet,
  Dimensions,
  ScrollView,
} from "react-native";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { getThemeColor } from "@/constants/theme";
import { router, useLocalSearchParams } from "expo-router";
import { useRef, useEffect, useState, useMemo, useCallback } from "react";
import { GymButtonMedium } from "@/components/ui/Button";
import { GymText } from "@/components/ui/Text";
import { addExercise } from "@/lib/api/workout/workoutInsert";
import { useAuthContext } from "@/hooks/use-auth-context";
import ExerciseFull from "@/components/training/exercises/ExerciseFull";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";

export let excerciseList: string[] = [];

export default function ExerciseInfo() {
  const theme = getThemeColor(useColorScheme());
  const { width, height } = Dimensions.get("window");
  const { name, overview, imageUrl, excerciseId, workoutId, exercise } =
    useLocalSearchParams();
  const exerciseT = JSON.parse(exercise as string) as Exercise;
  const { session } = useAuthContext();
  const bottomSheetRef = useRef<BottomSheet>(null);

  const snapPoints = useMemo(() => ["90%"], []);

  const handleSheetChanges = useCallback((index: number) => {
    if (index === -1) {
      router.push({
        pathname: "/(training)/trainingOverview",
        params: { workoutId: workoutId },
      });
    }
  }, []);

  // Convert params to strings
  const exerciseName = Array.isArray(name) ? name[0] : name || "";
  const exerciseOverview = Array.isArray(overview)
    ? overview[0]
    : overview || "";
  const exerciseImageUrl = Array.isArray(imageUrl)
    ? imageUrl[0]
    : imageUrl || "";

  const workoutIdNumber = Array.isArray(workoutId)
    ? Number(workoutId[0])
    : Number(workoutId);

  const exerciseIdString = Array.isArray(excerciseId)
    ? String(excerciseId[0])
    : String(excerciseId);

  async function handleButtonPress() {
    const { data, error } = await addExercise(
      [
        {
          workout_id: workoutIdNumber,
          exercise_id: exerciseIdString,
          order_index: 0,
        },
      ],
      session
    );
    if (error) alert(`Error in exInfo ${error}`);
    router.push({
      pathname: "/(training)/createWorkout",
      params: { workoutId: workoutId },
    });
  }

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={0}
      snapPoints={snapPoints}
      onChange={handleSheetChanges}
      backgroundStyle={{ backgroundColor: theme.background }}
      enablePanDownToClose={true}
    >
      <BottomSheetScrollView
        contentContainerStyle={{
          flexGrow: 1,
          paddingBottom: 20,
        }}
      >
        <ExerciseFull
          exercise={exerciseT}
          workoutId={workoutId as string}
        ></ExerciseFull>

        {/* Action Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.secondaryButton, { borderColor: theme.text }]}
            onPress={() => bottomSheetRef.current?.close()}
          >
            <GymText style={{ color: theme.text, fontSize: 16 }}>
              Cancel
            </GymText>
          </TouchableOpacity>

          <GymButtonMedium
            style={[styles.primaryButton, { backgroundColor: "#4CAF50" }]}
            onPress={handleButtonPress}
          >
            <GymText
              style={{ color: "white", fontSize: 16, fontWeight: "bold" }}
            >
              Add Exercise
            </GymText>
          </GymButtonMedium>
        </View>
      </BottomSheetScrollView>
    </BottomSheet>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginBottom: 10,
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer: {
    alignItems: "center",
    marginBottom: 25,
  },
  exerciseImage: {
    width: "100%",
    height: 300,
    borderRadius: 15,
    borderWidth: 1,
  },
  descriptionContainer: {
    padding: 20,
    borderRadius: 15,
    marginBottom: 30,
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 15,
    paddingTop: 20,
  },
  secondaryButton: {
    flex: 1,
    paddingVertical: 15,
    borderRadius: 12,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  primaryButton: {
    flex: 1,
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
});
