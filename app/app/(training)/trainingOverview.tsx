import { Dimensions } from "react-native";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { SafeAreaView } from "react-native-safe-area-context";
import { getThemeColor } from "@/constants/theme";
import React, { useEffect, useRef, useState } from "react";
import ExerciseList from "@/components/training/exercises/ExerciseList";
import { Modalize } from "react-native-modalize";
import { router } from "expo-router";
import { GymHeader } from "@/components/ui/Text";
import GymView from "@/components/ui/GymView";

export default function TrainingScreen() {
  const modalizeRef = useRef<Modalize>(null);
  const theme = getThemeColor(useColorScheme());
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    modalizeRef.current?.open();
    setIsModalOpen(true);
  }, []);

  const handleModalClose = () => {
    setIsModalOpen(false);
    router.push("/(tabs)/training");
  };

  const Training = () => {
    const { width, height } = Dimensions.get("window");
    return (
      <SafeAreaView>
        <Modalize ref={modalizeRef} onClose={handleModalClose}>
          <GymView style={{ backgroundColor: theme.background }}>
            <GymHeader style={{margin: 10, color: theme.text}}>Build your workout</GymHeader>
            <ExerciseList />
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
