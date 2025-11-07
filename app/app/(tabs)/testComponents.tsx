import React, { useState, useEffect } from "react";
import { getThemeColor } from "@/constants/theme";
import { useColorScheme, ScrollView, View, Text, Pressable, StyleSheet } from "react-native";
import TableStats from "@/components/ui/TableStats";
import { getDailyStats } from "@/lib/api/stats/weightSelect"; // 🔹 Pfad ggf. anpassen!

export default function TestComponentsScreen() {
  const theme = getThemeColor(useColorScheme());
  const [range, setRange] = useState<"week" | "month" | "threemonths">("week");

  // 🔹 Gewichtsdaten aus Supabase
  const [weightData, setWeightData] = useState({
    week: [] as { x: string; y: number }[],
    month: [] as { x: string; y: number }[],
    threemonths: [] as { x: string; y: number }[],
  });

  // 🔹 Supabase-Test beim Mount
  useEffect(() => {
    const testFetch = async () => {
      console.log("📡 Lade daily_stats-Daten aus Supabase...");
      const result = await getDailyStats();
  
      if (result.error) {
        console.error("❌ Fehler beim Laden der daily_stats:", result.error);
        return;
      }
  
      const data = result.data || [];
  
      // Sortiere nach Datum absteigend (neueste zuerst)
      const sortedData = data.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      );
  
      // --- 🔹 WEEK: letzte 7 Einträge
      const last7 = sortedData.slice(0, 7).reverse();
      const weekData = last7.map((row) => {
        const d = new Date(row.date);
        const formattedDate = `${d.getDate().toString().padStart(2, "0")}.${(d.getMonth() + 1)
          .toString()
          .padStart(2, "0")}`;
        return { x: formattedDate, y: row.weight_kg };
      });
  
      // --- 🔹 MONTH: letzte 28 Einträge, 4 Blöcke à 7 Tage
      const last28 = sortedData.slice(0, 28).reverse();
      const weekChunks = [
        last28.slice(0, 7),
        last28.slice(7, 14),
        last28.slice(14, 21),
        last28.slice(21, 28),
      ];
      const monthData = weekChunks
      .map((chunk, i) => {
        if (chunk.length === 0) return null;
        const avg = chunk.reduce((sum, r) => sum + r.weight_kg, 0) / chunk.length;
        return { x: `W${i + 1}`, y: parseFloat(avg.toFixed(1)) };
      })
      .filter(Boolean) as { x: string; y: number }[];
    
  
      // --- 🔹 3MONTHS: letzte 84 Einträge, 3 Blöcke à 28 Tage
      const last84 = sortedData.slice(0, 84).reverse();
      const monthChunks = [
        last84.slice(0, 28),
        last84.slice(28, 56),
        last84.slice(56, 84),
      ];
      const threeMonthsData = monthChunks
      .map((chunk, i) => {
        if (chunk.length === 0) return null;
        const avg = chunk.reduce((sum, r) => sum + r.weight_kg, 0) / chunk.length;
        return { x: `M${i + 1}`, y: parseFloat(avg.toFixed(1)) };
      })
      .filter(Boolean) as { x: string; y: number }[];
    
      // --- 🔹 Alle Werte in State übernehmen
      setWeightData({
        week: weekData,
        month: monthData,
        threemonths: threeMonthsData,
      });
  
      console.log("✅ Woche:", weekData);
      console.log("✅ Monat:", monthData);
      console.log("✅ 3 Monate:", threeMonthsData);
    };
  
    testFetch();
  }, []);
  

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
    threemonths: [
      { x: "Aug", y: 82 },
      { x: "Sep", y: 85 },
      { x: "Okt", y: 88 },
    ],
  };

  const labels = {
    week: "Letzte Woche",
    month: "Letzter Monat",
    threemonths: "Letzte 3 Monate",
  };

  return (
    <ScrollView style={{ backgroundColor: theme.background, padding: 20 }}>
      <View style={styles.buttonContainer}>
        {(["week", "month", "threemonths"] as const).map((key) => (
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

      <TableStats title="Körpergewicht" range={range || "week"} data={weightData} />
      {/* <TableStats title="Bankdrücken" range={range} data={benchData} /> */}
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
