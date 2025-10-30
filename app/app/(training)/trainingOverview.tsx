import { Dimensions } from "react-native";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { SafeAreaView } from "react-native-safe-area-context";
import { getThemeColor } from "@/constants/theme";
import React, { useEffect, useRef, useState } from "react";
import ExerciseList from "@/components/training/exercises/ExerciseList";
import { Modalize } from "react-native-modalize";
import { router, useLocalSearchParams } from "expo-router";
import { GymHeader } from "@/components/ui/Text";
import GymView from "@/components/ui/GymView";

export default function TrainingScreen() {
  const modalizeRef = useRef<Modalize>(null);
  const theme = getThemeColor(useColorScheme());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {workoutId} = useLocalSearchParams();

  console.log("WorkoutId ", workoutId);

  useEffect(() => {
    modalizeRef.current?.open();
    setIsModalOpen(true);
  }, []);

  const handleModalClose = () => {
    setIsModalOpen(false);
    router.push("/(tabs)/training");
  };

  const Training = () => {
    return (
      <SafeAreaView>
        <Modalize ref={modalizeRef} onClose={handleModalClose}>
          <GymView style={{ backgroundColor: theme.background }}>
            <GymHeader style={{margin: 10, color: theme.text}}>Build your workout</GymHeader>
            <ExerciseList workoutId={workoutId as string} />
          </GymView>
        </Modalize>
      </SafeAreaView>
    );
  };
  return (
    <SafeAreaView
      style={[
        {
          backgroundColor: theme.background,
        },
      ]}
    >
      <Training />
    </SafeAreaView>
  );
}
