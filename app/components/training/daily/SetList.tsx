import { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { View, StyleSheet, Alert, TouchableOpacity } from "react-native";
import SetCard from "./SetCard";
import Ionicons from "@expo/vector-icons/Ionicons";
import WorkoutSheet from "./WorkoutSheet";

export default function SetList({ sets }: { sets: WorkoutLog[] | null }) {
  console.log("workoutlogs = ", sets);
  return (
    <BottomSheetScrollView>
      {sets &&
        sets.map((item) => (
          <View key={item.id}>
            <SetCard set={item} onDelete={() => Alert.alert("Delete Set")} />
          </View>
        ))}
      {!sets && (
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => Alert.alert("Add Set")}
        >
          <Ionicons name="add" size={28} color="white" />
        </TouchableOpacity>
      )}
    </BottomSheetScrollView>
  );
}

const styles = StyleSheet.create({
  addButton: {
    marginTop: 20,
    backgroundColor: "#333",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",

    paddingVertical: 12,
    paddingHorizontal: 18,

    borderRadius: 12,
  },
});
