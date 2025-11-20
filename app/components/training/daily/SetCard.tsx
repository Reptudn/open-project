import { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Alert,
  Modal,
  Pressable,
  TextInput,
  KeyboardAvoidingView,
} from "react-native";

export default function SetCard({ set }: { set: WorkoutLog }) {
  const [edit, setEdit] = useState(false);

  // Lokale editierbare Werte
  const [reps, setReps] = useState(set.reps_completed?.toString());
  const [weight, setWeight] = useState(set.weight_kg?.toString());

  const openEdit = () => setEdit(true);
  const closeEdit = () => setEdit(false);

  const saveChanges = () => {
    // Speichern direkt in dieses Set
    set.reps_completed = Number(reps);
    set.weight_kg = Number(weight);
    closeEdit();
  };

  return (
    <TouchableOpacity onLongPress={openEdit} activeOpacity={edit ? 1 : 0.7}>
      <View style={styles.card}>
        {!edit && (
          <>
            <Text style={styles.setIndex}>Set {set.set_index}</Text>

            <View style={styles.details}>
              <Text style={styles.detailText}>Reps: {set.reps_completed}</Text>
              <Text style={styles.detailText}>Weight: {set.weight_kg} kg</Text>
            </View>
          </>
        )}
        {edit && (
          <>
            <BottomSheetScrollView
              automaticallyAdjustKeyboardInsets={true}
            >
              <TextInput
                style={styles.input}
                keyboardType="numeric"
                value={reps}
                onChangeText={setReps}
                placeholder="Reps"
              />
            </BottomSheetScrollView>

            <BottomSheetScrollView
              automaticallyAdjustKeyboardInsets={true}
            >
              <TextInput
                style={styles.input}
                keyboardType="numeric"
                value={weight}
                onChangeText={setWeight}
                placeholder="Weight (kg)"
              />
            </BottomSheetScrollView>

            <TouchableOpacity style={styles.saveBtn} onPress={saveChanges}>
              <Text style={styles.saveText}>Save</Text>
            </TouchableOpacity>
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

    // Shadow iOS
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },

    // Shadow Android
    elevation: 3,
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
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  label: {
    fontSize: 14,
    color: "#555",
  },

  value: {
    fontSize: 14,
    fontWeight: "600",
    color: "#222",
  },

  modalBackdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },

  modal: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
  },

  modalTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 16,
  },

  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 8,
    marginBottom: 12,
    fontSize: 16,
  },

  modalButtons: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },

  cancelBtn: {
    padding: 10,
    marginRight: 10,
  },

  cancelText: {
    color: "red",
  },

  saveBtn: {
    backgroundColor: "#333",
    padding: 10,
    borderRadius: 8,
  },

  saveText: {
    color: "#fff",
    fontWeight: "600",
  },
});
