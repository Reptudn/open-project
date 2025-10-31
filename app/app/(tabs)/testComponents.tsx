import React, { useState } from "react";
import { getThemeColor } from "@/constants/theme";
import { useColorScheme, ScrollView, View, Text, Pressable, StyleSheet } from "react-native";
import TableStats from "@/components/ui/TableStats"; // dein angepasstes Chart (ohne eigene Buttons)

export default function TestComponentsScreen() {
  const theme = getThemeColor(useColorScheme());
  const [range, setRange] = useState<"week" | "month" | "3months">("week");

  const labels = {
    week: "Letzte Woche",
    month: "Letzter Monat",
    "3months": "Letzte 3 Monate",
  };

  return (
    <ScrollView style={{ backgroundColor: theme.background, padding: 20 }}>
      {/* 🔹 Buttons oben */}
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

      <TableStats title="Körpergewicht" range={range} />
      <TableStats title="Bankdrücken" range={range} />
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
