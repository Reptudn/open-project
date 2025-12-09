import { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { View, StyleSheet, Alert, TouchableOpacity } from "react-native";
import SetCard from "./SetCard";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useAuthContext } from "@/hooks/use-auth-context";
import { addExerciseLog } from "@/lib/api/workout/workoutInsert";
import { useCallback, useEffect, useState } from "react";
import { updateWorkoutExerciseLogSet } from "@/lib/api/workout/workoutUpdate";

export default function SetListAdd({ info }: { info: WorkoutLog[] }) {
  const [sets, setSets] = useState<WorkoutLog[]>([]);
  const { session } = useAuthContext();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (info[0].set_index) setSets(info);
  }, []);

  const deleteSet = async (id: number) => {
    let updateSet = [...sets];

    const indexDel = updateSet.findIndex((set) => set.id === id);

    updateSet = updateSet.filter((set) => set.id !== id);

    const reinitSets: WorkoutLog[] = [];

    for (let i = 0; i < updateSet.length; i++) {
      const set = updateSet[i];

      let newIndex = set.set_index;

      if (set.set_index > indexDel) {
        newIndex -= 1;

        const { error } = await updateWorkoutExerciseLogSet(
          set.workout_id.id,
          set.exercise_id.exercise_id,
          set.set_index,
          set.created_at,
          { set_index: newIndex }
        );

        if (error) {
          Alert.alert(error);
          return;
        }
      }
      reinitSets.push({ ...set, set_index: newIndex });
    }

    setSets(reinitSets);
  };

  const renderList = useCallback(
    (item: WorkoutLog) => (
      <View key={item.id}>
        <SetCard set={item} onDelete={deleteSet} />
      </View>
    ),
    [sets]
  );

  const addSet = async () => {
    setLoading(true);
    const created_at = new Date().toISOString().split("T")[0];

    const index = sets.length + 1;
    const { data, error } = await addExerciseLog(
      [
        {
          workout_id: info[0].workout_id.id,
          exercise_id: info[0].exercise_id.exercise_id,
          set_index: index,
          reps_completed: 0,
          weight_kg: 0,
          created_at: created_at,
        },
      ],
      session
    );

    if (error) {
      Alert.alert(error);
      setLoading(false);
      return;
    }

    setSets((prev) => [...prev, ...(data ?? [])]);
    setLoading(false);
  };

  return (
    <BottomSheetScrollView>
      {sets.map(renderList)}
      <TouchableOpacity
        style={styles.addButton}
        onPress={addSet}
        disabled={loading}
      >
        <Ionicons name="add" size={28} color="black" />
      </TouchableOpacity>
    </BottomSheetScrollView>
  );
}

const styles = StyleSheet.create({
  addButton: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 12,
    marginVertical: 6,
    marginHorizontal: 16,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },
});
