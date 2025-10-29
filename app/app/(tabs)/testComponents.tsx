import { ThemeColors } from "@/constants/theme";
import { useAuthContext } from "@/hooks/use-auth-context";
import { deleteWorkout, removeExercise, removeExerciseSet } from "@/lib/api/workout/workoutDelete";
import { addExercise, createWorkout } from "@/lib/api/workout/workoutInsert";
import { useState } from "react";
import {
  StyleSheet,
  Text,
  Keyboard,
  KeyboardAvoidingView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  useColorScheme,
  View,
  Alert,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";

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
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.topContainer}>
          <KeyboardAvoidingView style={{ gap: 10 }}>
            <Text style={styles.infoText}>Enter Name of Workout</Text>
            <TextInput
              style={styles.input}
              placeholder="example@wtf.com"
              value={name}
              onChangeText={setName}
            />
          </KeyboardAvoidingView>
          <KeyboardAvoidingView style={{ gap: 10 }}>
            <Text style={styles.infoText}>Enter a Discription</Text>
            <TextInput
              style={styles.input}
              placeholder="starwars"
              value={discription}
              onChangeText={setDiscription}
            />
          </KeyboardAvoidingView>
          <TouchableOpacity
            style={styles.button}
            disabled={loading}
            onPress={createWorkoutButton}
            activeOpacity={0.7}
          >
            <Text style={styles.loginText}>Create Workout</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            disabled={loading}
            onPress={deleteWorkoutButton}
            activeOpacity={0.7}
          >
            <Text style={styles.loginText}>Delete Workout</Text>
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
}

const getStyles = (isDark: boolean) =>
  StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      gap: 10,
    },
    topContainer: {
      marginTop: "50%",
      gap: 15,
    },
    bottomContainer: {
      gap: 10,
    },
    input: {
      width: 352,
      height: 56.32,
      borderRadius: 17.6,
      borderWidth: 1,
      textAlign: "center",
      borderColor: isDark
        ? ThemeColors.dark.borderTopColor
        : ThemeColors.light.borderTopColor,
      color: isDark
        ? ThemeColors.dark.borderTopColor
        : ThemeColors.light.borderTopColor,
    },
    button: {
      backgroundColor: isDark
        ? ThemeColors.dark.button
        : ThemeColors.light.button,
      width: 352,
      height: 56.32,
      borderRadius: 17.6,
      alignItems: "center",
      justifyContent: "center",
    },
    infoText: {
      color: isDark ? ThemeColors.dark.text : ThemeColors.light.text,
    },
    loginText: {
      color: isDark ? ThemeColors.dark.text : ThemeColors.light.text,
      fontWeight: "bold",
      fontSize: 16,
    },
  });
