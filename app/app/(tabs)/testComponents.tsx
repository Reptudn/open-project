import React, { useState } from "react";
import { getThemeColor } from "@/constants/theme";
import { useColorScheme, ScrollView, View, Text, Pressable, StyleSheet } from "react-native";
import TableStats from "@/components/ui/TableStats";

export default function TestComponentsScreen() {
  const theme = getThemeColor(useColorScheme());
  const [range, setRange] = useState<"week" | "month" | "3months">("week");

  const labels = {
    week: "Letzte Woche",
    month: "Letzter Monat",
    "3months": "Letzte 3 Monate",
  };

  // Beispiel-Testdaten
  const weightData = {
    week: [
      { x: "Mo", y: 70 },
      { x: "Di", y: 70.4 },
      { x: "Mi", y: 70.1 },
      { x: "Do", y: 70.3 },
      { x: "Fr", y: 70.0 },
      { x: "Sa", y: 69.8 },
      { x: "So", y: 69.7 },
    ],
    month: [
      { x: "W1", y: 71 },
      { x: "W2", y: 70.6 },
      { x: "W3", y: 70.3 },
      { x: "W4", y: 69.9 },
    ],
    "3months": [
      { x: "Aug", y: 72 },
      { x: "Sep", y: 70.8 },
      { x: "Okt", y: 69.8 },
    ],
  };

  const benchData = {
    week: [
      { x: "Mo", y: 85 },
      { x: "Di", y: 86 },
      { x: "Mi", y: 86.5 },
      { x: "Do", y: 87 },
      { x: "Fr", y: 87.2 },
      { x: "Sa", y: 87.4 },
      { x: "So", y: 88 },
    ],
    month: [
      { x: "W1", y: 84 },
      { x: "W2", y: 85 },
      { x: "W3", y: 86 },
      { x: "W4", y: 88 },
    ],
    "3months": [
      { x: "Aug", y: 82 },
      { x: "Sep", y: 85 },
      { x: "Okt", y: 88 },
    ],
  };

  return (
    <ScrollView style={{ backgroundColor: theme.background, padding: 20 }}>
      <View style={styles.buttonContainer}>
        {(["week", "month", "3months"] as const).map((key) => (
          <Pressable
            key={key}
            onPress={() => setRange(key)}
            style={[
              styles.button,
              range === key && styles.buttonActive,
            ]}
          >
            <Text style={styles.buttonText}>{labels[key]}</Text>
          </Pressable>
        ))}
      </View>

      <TableStats title="Körpergewicht" range={range} data={weightData} />
      <TableStats title="Bankdrücken" range={range} data={benchData} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 15,
  },
  button: {
    backgroundColor: "#222",
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  buttonActive: {
    backgroundColor: "rgba(56, 182, 255, 0.5)",
  },
  buttonText: {
    color: "#fff",
    fontSize: 12,
  },
});
