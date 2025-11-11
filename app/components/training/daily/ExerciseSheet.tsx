import { useAuthContext } from "@/hooks/use-auth-context";
import { addExerciseLog } from "@/lib/api/workout/workoutInsert";
import { getWorkoutLogs } from "@/lib/api/workout/workoutSelect";
import { updateWorkoutExerciseLogSet } from "@/lib/api/workout/workoutUpdate";
import { useEffect, useState } from "react";
import { View, TextInput, Button, Text, StyleSheet, Alert } from "react-native";
import { setShouldAnimateExitingForTag } from "react-native-reanimated/lib/typescript/core";

type SetRow = {
  setNumber: number;
  reps: string;
  weight: string;
};

export default function ExerciseSheet(test: { exercise: WorkoutExercise }) {
  const [sets, setSets] = useState<SetRow[]>([]);
  const { session } = useAuthContext();

  const addSet = async () => {
    const created_at = new Date().toISOString().split("T")[0];

    setSets((prev) => {
      const newSetNumber = prev.length + 1;

      const newSet = {
        setNumber: newSetNumber,
        reps: "",
        weight: "",
      };

      addExerciseLog(
        [
          {
            workout_id: test.exercise.workout_id.id,
            exercise_id: test.exercise.exercise_id.exercise_id,
            set_index: newSetNumber,
            reps_completed: 0,
            weight_kg: 0,
            created_at,
          },
        ],
        session
      ).catch((err) => Alert.alert(err.message));

      return [...prev, newSet];
    });
  };

  const updateSet = async (
    index: number,
    field: keyof SetRow,
    value: string
  ) => {
    setSets((prev) => {
      const copy = [...prev];
      copy[index - 1] = { ...copy[index - 1], [field]: value };
      return copy;
    });

    const { error } = await updateWorkoutExerciseLogSet({
      workout_id: test.exercise.workout_id.id,
      exercise_id: test.exercise.exercise_id.exercise_id,
      set_index: index,
      reps_completed: Number(sets[index - 1].reps),
      weight_kg: Number(sets[index - 1].weight),
      created_at: new Date().toISOString(),
    });

    if (error) {
      Alert.alert(error);
      return;
    }
  };

  return (
    <View style={styles.exerciseSheet}>
      <Text style={styles.exerciseTitle}>{test.exercise.exercise_id.name}</Text>

      {sets.map((item) => (
        <View key={item.setNumber} style={styles.row}>
          <Text style={styles.label}>Satz {item.setNumber}</Text>

          <Text style={styles.label}> Reps</Text>
          <TextInput
            style={styles.input}
            value={item.reps}
            onChangeText={(value) => updateSet(item.setNumber, "reps", value)}
            keyboardType="numeric"
            placeholder="Reps"
          />

          <Text style={styles.label}> Weight</Text>
          <TextInput
            style={styles.input}
            value={item.weight}
            onChangeText={(value) => updateSet(item.setNumber, "weight", value)}
            keyboardType="numeric"
            placeholder="Gewicht (kg)"
          />
        </View>
      ))}

      <Button onPress={addSet} title="Satz hinzufügen" />
    </View>
  );
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
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    paddingHorizontal: 8,
    fontSize: 16,
  },
  label: { fontSize: 16, width: 60 },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
});
