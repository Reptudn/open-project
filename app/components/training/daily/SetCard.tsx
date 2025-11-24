import { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  TextInput,
  Alert,
} from "react-native";
import { X } from "lucide-react-native";
import { useAuthContext } from "@/hooks/use-auth-context";
import { addExerciseLog } from "@/lib/api/workout/workoutInsert";
import { getWorkoutLogs } from "@/lib/api/workout/workoutSelect";
import { updateWorkoutExerciseLogSet } from "@/lib/api/workout/workoutUpdate";

type SetRow = {
  setNumber: number;
  reps: string;
  weight: string;
};

export default function SetCard({
  set,
  onDelete,
}: {
  set: WorkoutLog;
  onDelete: () => void;
}) {
  const [edit, setEdit] = useState(false);

  const [reps, setReps] = useState(set.reps_completed?.toString());
  const [weight, setWeight] = useState(set.weight_kg?.toString());

  // const [sets, setSets] = useState<SetRow[]>([]);
  // const { session } = useAuthContext();

  // useEffect(() => {
  //   const getSets = async () => {
  //     const newSets: SetRow[] = [];
  //     const { data, error } = await getWorkoutLogs(
  //       test.exercise.workout_id.id,
  //       new Date().toISOString().split("T")[0] // Change later to the corret date
  //     );

  //     if (error) {
  //       Alert.alert(error);
  //       return;
  //     }

  //     if (data) {
  //       data.forEach((set) => {
  //         if (
  //           set.exercise_id.exercise_id ===
  //           test.exercise.exercise_id.exercise_id
  //         )
  //           newSets.push({
  //             setNumber: set.set_index,
  //             reps: set.reps_completed?.toString() ?? "",
  //             weight: set.weight_kg?.toString() ?? "",
  //           });
  //       });
  //     }
  //     setSets((prev) => [...prev, ...newSets]);
  //   };
  //   getSets();
  // }, []);

  // const addSet = async () => {
  //   const created_at = new Date().toISOString().split("T")[0];

  //   setSets((prev) => {
  //     const newSetNumber = prev.length + 1;

  //     const newSet = {
  //       setNumber: newSetNumber,
  //       reps: "",
  //       weight: "",
  //     };

  //     addExerciseLog(
  //       [
  //         {
  //           workout_id: test.exercise.workout_id.id,
  //           exercise_id: test.exercise.exercise_id.exercise_id,
  //           set_index: newSetNumber,
  //           reps_completed: 0,
  //           weight_kg: 0,
  //           created_at,
  //         },
  //       ],
  //       session
  //     ).catch((err) => Alert.alert(err.message));

  //     return [...prev, newSet];
  //   });
  // };

  // const updateSet = async (
  //   index: number,
  //   field: keyof SetRow,
  //   value: string
  // ) => {
  //   setSets((prev) => {
  //     const copy = [...prev];
  //     copy[index - 1] = { ...copy[index - 1], [field]: value };
  //     return copy;
  //   });

  //   console.log(`value = ${value}`);
  //   console.log(`field = ${field}`);
  //   const { error } = await updateWorkoutExerciseLogSet(
  //     field === "reps"
  //       ? {
  //           workout_id: test.exercise.workout_id.id,
  //           exercise_id: test.exercise.exercise_id.exercise_id,
  //           set_index: index,
  //           reps_completed: Number(value),
  //           created_at: new Date().toISOString().split("T")[0],
  //         }
  //       : {
  //           workout_id: test.exercise.workout_id.id,
  //           exercise_id: test.exercise.exercise_id.exercise_id,
  //           set_index: index,
  //           weight_kg: Number(value),
  //           created_at: new Date().toISOString().split("T")[0],
  //         }
  //   );

  //   if (error) {
  //     Alert.alert(error);
  //     return;
  //   }
  // };

  const openEdit = () => setEdit(true);
  const closeEdit = () => setEdit(false);

  const saveChanges = () => {
    set.reps_completed = Number(reps);
    set.weight_kg = Number(weight);
    closeEdit();
  };

  return (
    <TouchableOpacity onLongPress={openEdit} activeOpacity={edit ? 1 : 0.7}>
      <View style={styles.card}>
        {!edit && (
          <>
            <View style={styles.headerRow}>
              <Text style={styles.setIndex}>Set {set.set_index}</Text>

              {/* Delete Button */}
              <TouchableOpacity onPress={onDelete}>
                <X size={20} color="#b00" />
              </TouchableOpacity>
            </View>

            <View style={styles.details}>
              <Text style={styles.detailText}>Reps: {set.reps_completed}</Text>
              <Text style={styles.detailText}>Weight: {set.weight_kg} kg</Text>
            </View>
          </>
        )}

        {edit && (
          <>
            <View style={styles.inputRow}>
              <Text style={styles.inputLabel}>Reps:</Text>
              <TextInput
                style={styles.input}
                keyboardType="numeric"
                value={reps}
                onChangeText={setReps}
              />
            </View>

            <View style={styles.inputRow}>
              <Text style={styles.inputLabel}>Weight:</Text>
              <TextInput
                style={styles.input}
                keyboardType="numeric"
                value={weight}
                onChangeText={setWeight}
              />
              <Text style={styles.unit}>kg</Text>
            </View>

            <View style={styles.editBtns}>
              <TouchableOpacity style={styles.saveBtn} onPress={saveChanges}>
                <Text style={styles.saveText}>Save</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.cancelBtn} onPress={closeEdit}>
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
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

  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  setIndex: {
    fontSize: 16,
    fontWeight: "700",
    color: "#222",
    marginBottom: 6,
  },

  details: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  detailText: {
    fontSize: 14,
    color: "#555",
  },

  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },

  inputLabel: {
    width: 60,
    fontSize: 16,
    color: "#333",
  },

  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 8,
    fontSize: 16,
  },

  unit: {
    marginLeft: 6,
    fontSize: 16,
    color: "#555",
  },

  editBtns: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 8,
  },

  saveBtn: {
    backgroundColor: "#333",
    padding: 10,
    borderRadius: 8,
    marginRight: 10,
  },

  saveText: {
    color: "#fff",
    fontWeight: "600",
  },

  cancelBtn: {
    padding: 10,
  },

  cancelText: {
    color: "red",
  },
});
