import { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { View, StyleSheet } from "react-native";
import SetCard from "./SetCard";

export default function SetList({ sets }: { sets: WorkoutLog[] }) {
  return (
    <BottomSheetScrollView>
      {sets.map((item) => (
        <View key={item.id}>
          <SetCard set={item} />
        </View>
      ))}
    </BottomSheetScrollView>
  );
}

const styles = StyleSheet.create({});
