import Ionicons from "@expo/vector-icons/Ionicons";
import { GymButtonSmall } from "../ui/Button";
import GymView from "../ui/GymView";
import { GymHeader, GymText } from "../ui/Text";
import { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { useColorScheme } from "@/hooks/use-color-scheme.web";
import { ThemeColors } from "@/constants/theme";
import { getWeightByDate, updateWeightByDate } from "@/lib/api/daily/daily";

export default function WeightEntry({ date }: { date: Date }) {
  const [weight, setWeight] = useState<number>(0);
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  useEffect(() => {
    const fetchWeight = async () => {
      try {
        const weight = await getWeightByDate(date);
        setWeight(weight ? weight : 0);
      } catch (error) {
        console.error("Failed to fetch weight:", error);
      }
    };

    fetchWeight();
  }, [date]);

  const clampWeight = (w: number) => {
    const rounded = Math.round(w);
    return Math.max(0, Math.min(500, rounded));
  };

  const updateWeight = async (newWeight: number) => {
    const prev = weight;
    const clapmedWeight = clampWeight(newWeight);
    setWeight(clapmedWeight);
    try {
      await updateWeightByDate(clapmedWeight, date);
      setWeight(clampWeight);
    } catch (error) {
      console.error("Failed to update weight:", error);
      setWeight(prev);
    }
  };
  return (
    <GymView
      style={{
        flex: 1,
        borderRadius: 10,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: isDark ? "#444" : "#ddd",
      }}
    >
      <GymHeader>Weight Entry Screen</GymHeader>
      <View
        style={{
          flex: 1,
          backgroundColor: isDark
            ? ThemeColors.dark.background
            : ThemeColors.light.background,
          padding: 20,
          alignItems: "center",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <GymButtonSmall
          onPress={() => updateWeight(weight - 1)}
          // style={{ alignItems: "flex-start" }}
        >
          <Ionicons name="remove" size={24} color="black" />
        </GymButtonSmall>
        <GymText>
          <Text>{weight}kg </Text>
        </GymText>
        {/* Display weight in kg or pounds depending on user settings */}
        <GymButtonSmall
          onPress={() => updateWeight(weight + 1)}
          // style={{ alignItems: "flex-end" }}
        >
          <Ionicons name="add" size={24} color="black" />
        </GymButtonSmall>
      </View>
    </GymView>
  );
}
