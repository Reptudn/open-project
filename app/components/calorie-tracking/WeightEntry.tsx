import Ionicons from "@expo/vector-icons/Ionicons";
import { GymButtonSmall } from "../ui/Button";
import GymView from "../ui/GymView";
import { GymHeader, GymText } from "../ui/Text";
import { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { useColorScheme } from "@/hooks/use-color-scheme.web";
import { ThemeColors } from "@/constants/theme";
import { supabase } from "@/lib/supabase";

export default function WeightEntry({ date }: { date: Date }) {
  const [weight, setWeight] = useState<number>(0);
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  useEffect(() => {
    // Fetch weight entry for the given date.
    // If none exists for the date, create a row using the last available weight (or default 75).
    const fetchWeight = async () => {
      const dateStr = date.toISOString().split("T")[0];

      // Try to get today's weight
      const { data: todayData, error: todayError } = await supabase
        .from("user_weights")
        .select("weight")
        .eq("date", dateStr)
        .single();

      if (todayData && !todayError) {
        setWeight(todayData.weight);
        return;
      }

      // No entry for today — find the most recent previous weight
      const { data: lastData, error: lastError } = await supabase
        .from("user_weights")
        .select("weight,date")
        .lt("date", dateStr)
        .order("date", { ascending: false })
        .limit(1)
        .single();

      const initialWeight =
        lastData && !lastError && typeof lastData.weight === "number"
          ? lastData.weight
          : 75;

      // Insert a new row for today's date with the last known weight (or default)
      const { error: insertError } = await supabase
        .from("user_weights")
        .insert({
          date: dateStr,
          weight: initialWeight,
        });

      if (insertError) {
        console.error(
          "Error inserting initial weight for date",
          dateStr,
          insertError
        );
      }

      setWeight(initialWeight);
    };

    fetchWeight();
  }, [date]);

  const clampWeight = (w: number) => {
    const rounded = Math.round(w);
    return Math.max(0, Math.min(500, rounded));
  };

  const updateWeight = async (newWeight: number) => {
    const clamped = clampWeight(newWeight);
    const dateStr = date.toISOString().split("T")[0];

    const { error } = await supabase.from("user_weights").upsert(
      {
        date: dateStr,
        weight: clamped,
      },
      { onConflict: "date" }
    );

    if (error) {
      console.error("Error updating weight:", error);
      return;
    }

    setWeight(clamped);
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
