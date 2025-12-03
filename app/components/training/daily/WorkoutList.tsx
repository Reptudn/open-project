import { View, StyleSheet, Alert } from "react-native";
import ExerciseCard from "./ExerciseCard";
import { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { useBottomSheetContext } from "@/hooks/use-bottomSheet-context";
import SetList from "./SetList";
import WorkoutCard from "./WorkoutCard";

export default function WorkoutList({ workouts }: { workouts: Workout[] }) {
  return (
    <BottomSheetScrollView
      contentContainerStyle={styles.scrollContent}
      style={styles.scrollView}
    >
      {workouts.map((item) => (
        <View key={item.id}>
          <WorkoutCard workout={item} onPress={} />
        </View>
      ))}
    </BottomSheetScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    width: "100%",
  },
  scrollContent: {
    paddingVertical: 10,
    paddingHorizontal: 8,
    paddingBottom: 20,
  },
});
