import { Dimensions, TextInput, View } from "react-native";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { SafeAreaView } from "react-native-safe-area-context";
import { getThemeColor } from "@/constants/theme";
import React, { useEffect, useRef, useState } from "react";
import { Modalize } from "react-native-modalize";
import { router } from "expo-router";
import { GymHeader, GymText } from "@/components/ui/Text";
import GymView from "@/components/ui/GymView";
import { GymButtonMedium } from "@/components/ui/Button";

export default function TrainingScreen() {
  const modalizeRef = useRef<Modalize>(null);
  const theme = getThemeColor(useColorScheme());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { height, width } = Dimensions.get("window");

  const [workoutName, setWorkoutName] = useState("");
  const [workoutDescription, setWorkoutDescription] = useState("");

  useEffect(() => {
    modalizeRef.current?.open();
    setIsModalOpen(true);
  }, []);

  const handleModalClose = () => {
    setIsModalOpen(false);
    router.push("/(tabs)/training");
  };

  const handleButtonPress = () => {
    console.log("WorkoutName: ", workoutName);
    console.log("WorkoutDescription: ", workoutDescription);

    router.push("/(training)/trainingOverview");
  };

  return (
    <SafeAreaView
      style={[
        {
          backgroundColor: theme.background,
        },
      ]}
    >
      <GymView>
        <Modalize
          ref={modalizeRef}
          onClose={handleModalClose}
          modalHeight={height}
          modalStyle={{ backgroundColor: theme.background }}
        >
          <View
            style={{
              flex: 1,
              backgroundColor: theme.background,
              padding: 50,
            }}
          >
            <GymHeader style={{ color: theme.text, marginBottom: 20 }}>
              Build your workout
            </GymHeader>
            <View
              style={{
                padding: 10,
                borderColor: theme.text,
                borderWidth: 1,
                borderRadius: 5,
                marginBottom: 20,
              }}
            >
              <GymText>Workout Name</GymText>
              <TextInput
                placeholder="Name..."
                placeholderTextColor={theme.icon}
                style={{ color: theme.text }}
                value={workoutName}
                onChangeText={(workoutName) => setWorkoutName(workoutName)}
              ></TextInput>
            </View>
            <View
              style={{
                borderColor: theme.text,
                borderWidth: 1,
                marginBottom: 20,
                borderRadius: 5,
                padding: 10,
              }}
            >
              <GymText>Workout Description</GymText>
              <TextInput
                placeholder="Description..."
                placeholderTextColor={theme.icon}
                style={{ color: theme.text }}
                value={workoutDescription}
                onChangeText={(workoutDescription) =>
                  setWorkoutDescription(workoutDescription)
                }
              ></TextInput>
            </View>
            <GymButtonMedium onPress={handleButtonPress}>
              Add Exercise
            </GymButtonMedium>
          </View>
        </Modalize>
      </GymView>
    </SafeAreaView>
  );
}
