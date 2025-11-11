import React, { useState } from "react";
import { ScrollView, View, StyleSheet, Modal, TouchableOpacity, Text } from "react-native";
import { getThemeColor } from "@/constants/theme";
import { useColorScheme } from "react-native";
import { Plus } from "lucide-react-native"; // schöner Plus-Icon
import TableStatsBodyWeight from "@/components/ui/TableStatsBodyWeight";

export default function TestComponentsScreen() {
  const theme = getThemeColor(useColorScheme());
  const [modalVisible, setModalVisible] = useState(false);

  const exercises = ["Bankdrücken", "Kniebeugen", "Kreuzheben", "Schulterdrücken"];

  const handleSelectExercise = (exercise: string) => {
    console.log("Übung ausgewählt:", exercise);
    setModalVisible(false);
    // später: hier Übung zu State hinzufügen → neue Tabelle anzeigen
  };

  return (
    <ScrollView style={{ backgroundColor: theme.background, padding: 20 }}>
      <View style={styles.container}>
        <TableStatsBodyWeight />

        {/* Plus-Button */}
        <TouchableOpacity
          style={[styles.plusButton, { backgroundColor: theme.button }]} // Changed from theme.primary to theme.button
          onPress={() => setModalVisible(true)}
        >
          <Plus color={theme.text} size={28} />
        </TouchableOpacity>

        {/* Übungsauswahl-Modal */}
        <Modal
          visible={modalVisible}
          transparent
          animationType="slide"
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalBackdrop}>
            <View style={[styles.modalContent, { backgroundColor: theme.card }]}>
              <Text style={[styles.modalTitle, { color: theme.text }]}>Übung auswählen</Text>
              {exercises.map((ex) => (
                <TouchableOpacity
                  key={ex}
                  style={styles.exerciseItem}
                  onPress={() => handleSelectExercise(ex)}
                >
                  <Text style={[styles.exerciseText, { color: theme.text }]}>{ex}</Text>
                </TouchableOpacity>
              ))}
              <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.cancelButton}>
                <Text style={[styles.cancelText, { color: theme.text }]}>Abbrechen</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  plusButton: {
    marginTop: 24,
    borderRadius: 50,
    width: 56,
    height: 56,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 4,
  },
  modalBackdrop: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  modalContent: {
    padding: 20,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
  },
  exerciseItem: {
    paddingVertical: 12,
  },
  exerciseText: {
    fontSize: 16,
  },
  cancelText: {
    textAlign: "center",
    marginTop: 16,
    fontWeight: "600",
    marginBottom: 16,
  },
  cancelButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    backgroundColor: '#ff4d4d', // Example color for the cancel button
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 16,
  },
});
