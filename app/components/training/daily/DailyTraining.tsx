import { View, Text, StyleSheet, TouchableOpacity, Button } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useBottomSheetContext } from "@/hooks/use-bottomSheet-context";
import DailyTrainingList from "./DailyTrainingList";

export default function DailyTraining() {
  const { openSheet } = useBottomSheetContext();
  return (
    <View>
      <Text style={styles.text}>Workouts:</Text>
      <View style={styles.container}>
        <TouchableOpacity onPress={() => openSheet(<DailyTrainingList />)}>
          <Ionicons
            name="add-circle-outline"
            size={24}
            color={"white"}
            style={{
              marginLeft: 8,
              justifyContent: "flex-end",
            }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    borderRadius: 10,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#dddddd51",
    justifyContent: "center",
  },
  text: {
    color: "#ffffffff",
    fontFamily: "system-ui",
    fontSize: 20,
  },
});
