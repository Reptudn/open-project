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
import {
  updateWorkoutExerciseLogSet,
} from "@/lib/api/workout/workoutUpdate";
import { removeWorkoutLogSet } from "@/lib/api/workout/workoutDelete";

export default function SetCard({
  set,
  onDelete,
}: {
  set: WorkoutLog;
  onDelete: (id: number) => void;
}) {
  const [edit, setEdit] = useState(false);
  const [reps, setReps] = useState<string | undefined>(
    set.reps_completed?.toString()
  );
  const [weight, setWeight] = useState<string | undefined>(
    set.weight_kg?.toString()
  );

  const openEdit = () => setEdit(true);
  const closeEdit = () => setEdit(false);

  const deletSet = async () => {
    const { error } = await removeWorkoutLogSet(
      set.workout_id.id,
      set.exercise_id.exercise_id,
      set.set_index,
      set.created_at
    );

    if (error) {
      Alert.alert(error);
      return;
    }

    onDelete(set.id);
  };

  const saveChanges = async () => {
    set.reps_completed = reps != undefined ? Number(reps) : set.reps_completed;
    set.weight_kg = weight != undefined ? Number(weight) : set.weight_kg;

    console.log("set = ", set);

    const { error } = await updateWorkoutExerciseLogSet({
      workout_id: set.workout_id.id,
      exercise_id: set.exercise_id.exercise_id,
      set_index: set.set_index,
      reps_completed: set.reps_completed,
      weight_kg: set.weight_kg,
      created_at: set.created_at,
    });

    setReps(undefined);
    setWeight(undefined);

    if (error) {
      Alert.alert(error);
    }
    closeEdit();
  };

  return (
    <TouchableOpacity onLongPress={openEdit} activeOpacity={edit ? 1 : 0.7}>
      <View style={styles.card}>
        {!edit && (
          <>
            <View style={styles.headerRow}>
              <Text style={styles.setIndex}>Set {set.set_index}</Text>

              <TouchableOpacity onPress={deletSet}>
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
