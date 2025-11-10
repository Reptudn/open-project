import { getWorkouts } from "@/lib/api/workout/workoutSelect";
import { BottomSheetView } from "@gorhom/bottom-sheet";
import { useCallback, useEffect, useState } from "react";
import { Alert, View, Text, StyleSheet } from "react-native";

export default function DailyTrainingList() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  useEffect(() => {
    const getItems = async () => {
      const { data, error } = await getWorkouts();
      if (error) {
        Alert.alert(error);
        return;
      }
      setWorkouts(data ?? []);
    };
    getItems();
  }, []);

  const renderItems = useCallback(
    (item: Workout) => (
      <View key={item.id} style={styles.list}>
        <Text style={styles.card}>{item.name}</Text>
      </View>
    ),
    [workouts]
  );

  return <BottomSheetView> {workouts.map(renderItems)}</BottomSheetView>;
}

const styles = StyleSheet.create({
  list: {
    flex: 1,
  },
  card: {
    borderWidth: 1,
    borderColor: '#333',
  }
})