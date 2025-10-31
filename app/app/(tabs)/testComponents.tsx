import { ThemeColors } from "@/constants/theme";
import { useAuthContext } from "@/hooks/use-auth-context";
import { deleteWorkout, removeExercise, removeExerciseSet } from "@/lib/api/workout/workoutDelete";
import { addExercise, createWorkout } from "@/lib/api/workout/workoutInsert";
import { useState } from "react";
import {
  GymButtonFullLarge,
  GymButtonFullMedium,
  GymButtonFullWidth,
  GymButtonSmall,
} from "@/components/ui/Button";
import { GymHomeStats } from "@/components/ui/Statistics";
import { GymTitle, GymHeader, GymText } from "@/components/ui/Text";
import { getThemeColor } from "@/constants/theme";
import { useColorScheme, View, Text } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Test } from "@/components/ui/BodyMetrics";

export default function TestComponentsScreen() {
  const [name, setName] = useState("");
  const [discription, setDiscription] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState(false);
  const colorScheme = useColorScheme();
  const styles = getStyles(colorScheme === "dark");
  const { session } = useAuthContext();

  const deleteWorkoutButton = async () => {
    setLoading(true);
    const { data, error } = await removeExerciseSet(22, "exr_41n2ha5iPFpN3hEJ", 1);

    if (error) return Alert.alert(error);

    if (data) Alert.alert("Lets Go");
  };

  const createWorkoutButton = async () => {
    setLoading(true);
    const { data, error } = await createWorkout(
      {
        name: name,
        description: discription,
      },
      session
    );

    if (error) return Alert.alert(error);

    if (data) {
      addExercise(
        [
          {
            workout_id: data.id,
            exercise_id: "exr_41n2ha5iPFpN3hEJ",
            order_index: 0,
            set_index: 1,
            reps_target: 8,
            rest_seconds: 120,
          },
          {
            workout_id: data.id,
            exercise_id: "exr_41n2ha5iPFpN3hEJ",
            order_index: 0,
            set_index: 2,
            reps_target: 10,
            rest_seconds: 120,
          },
          {
            workout_id: data.id,
            exercise_id: "exr_41n2ha5iPFpN3hEJ",
            order_index: 0,
            set_index: 3,
            reps_target: 12,
            rest_seconds: 120,
          },
        ],
        session
      );
    }
    setLoading(false);
  };

  return (
    <ScrollView
      style={{ backgroundColor: theme.background }}
      contentContainerStyle={{ padding: 20, alignItems: "flex-start" }}
    >
      <GymTitle>Title</GymTitle>
      <GymBr />
      <GymHeader>Header</GymHeader>
      <GymBr />
      <GymText>Text</GymText>
      <GymBr />
      <GymButtonFullWidth onPress={() => alert("add function")}>
        ButtonFullWidth
      </GymButtonFullWidth>
      <GymBr />
      <GymButtonSmall onPress={() => alert("add function")}>
        Small
      </GymButtonSmall>
      <GymBr />
      <GymButtonFullMedium onPress={() => alert("add function")}>
        Medium
      </GymButtonFullMedium>
      <GymBr />
      <GymButtonFullLarge onPress={() => alert("add function")}>
        Large
      </GymButtonFullLarge>
      <GymBr />
      <GymHomeStats
        header="Calories"
        iconName={"contrast-outline"}
        value={799}
        type="kcal"
        backgroundColor="#38B6FF"
        onPress={() => alert("add function")}
      ></GymHomeStats>
      <GymBr />
      {/* <GymBodyMetric
        min={140}
        max={250}
        step={1}
        unit="cm"
        onValueChange={onValueChange}
        title="Enter your Height"
      ></GymBodyMetric> */}
      <GymBr />
      <GymBr />
      <Test />
    </ScrollView>
  );
}
