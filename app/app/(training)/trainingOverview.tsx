import { useColorScheme } from "@/hooks/use-color-scheme";
import { getThemeColor } from "@/constants/theme";
import { useCallback, useMemo, useRef } from "react";
import ExerciseList from "@/components/training/exercises/ExerciseList";
import { router, useLocalSearchParams } from "expo-router";
import { GymHeader } from "@/components/ui/Text";
import BottomSheet, {
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet";

export default function TrainingScreen() {
  const theme = getThemeColor(useColorScheme());
  const { workoutId } = useLocalSearchParams();
  const bottomSheetRef = useRef<BottomSheet>(null);

  const snapPoints = useMemo(() => ["90%"], []);

  const handleSheetChanges = useCallback((index: number) => {
    if (index === -1) {
      router.push("/(tabs)/training");
    }
  }, []);

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={0}
      snapPoints={snapPoints}
      onChange={handleSheetChanges}
      backgroundStyle={{ backgroundColor: theme.background }}
      enablePanDownToClose={true}
    >
      <BottomSheetScrollView
        contentContainerStyle={{
          flexGrow: 1,
          paddingBottom: 20,
        }}
      >
        <GymHeader style={{ margin: 10, color: theme.text }}>
          Build your workout
        </GymHeader>
        <ExerciseList workoutId={workoutId as string} />
      </BottomSheetScrollView>
    </BottomSheet>
  );
}
