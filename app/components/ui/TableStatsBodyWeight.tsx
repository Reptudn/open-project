import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
} from "react-native";
import {
  VictoryChart,
  VictoryLine,
  VictoryAxis,
  VictoryTheme,
} from "victory-native";
import { getDailyStats } from "@/lib/api/stats/weightSelect";

type DataPoint = { x: string; y: number };
type Range = "week" | "month" | "threemonths";

export default function TableStatsBodyWeight() {
  const [range, setRange] = useState<Range>("week");

  const [weightData, setWeightData] = useState<{
    week: DataPoint[];
    month: DataPoint[];
    threemonths: DataPoint[];
  }>({
    week: [],
    month: [],
    threemonths: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      console.log("📡 Lade daily_stats-Daten aus Supabase...");
      const result = await getDailyStats();

      if (result.error) {
        console.error("❌ Fehler beim Laden der daily_stats:", result.error);
        return;
      }

      const data = result.data || [];
      const sortedData = data.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      );

      // --- WEEK: letzte 7 Einträge
      const last7 = sortedData.slice(0, 7).reverse();
      const weekData = last7.map((row) => {
        const d = new Date(row.date);
        const formattedDate = `${d.getDate().toString().padStart(2, "0")}.${(
          d.getMonth() + 1
        )
          .toString()
          .padStart(2, "0")}`;
        return { x: formattedDate, y: row.weight_kg };
      });

      // --- MONTH: 4 Wochen à 7 Tage
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
          const avg =
            chunk.reduce((sum, r) => sum + r.weight_kg, 0) / chunk.length;
          return { x: `W${i + 1}`, y: parseFloat(avg.toFixed(1)) };
        })
        .filter(Boolean) as DataPoint[];

      // --- 3 MONTHS: 3 Blöcke à 28 Tage
      const last84 = sortedData.slice(0, 84).reverse();
      const monthChunks = [
        last84.slice(0, 28),
        last84.slice(28, 56),
        last84.slice(56, 84),
      ];
      const threeMonthsData = monthChunks
        .map((chunk, i) => {
          if (chunk.length === 0) return null;
          const avg =
            chunk.reduce((sum, r) => sum + r.weight_kg, 0) / chunk.length;
          return { x: `M${i + 1}`, y: parseFloat(avg.toFixed(1)) };
        })
        .filter(Boolean) as DataPoint[];

      setWeightData({
        week: weekData,
        month: monthData,
        threemonths: threeMonthsData,
      });

      console.log("✅ Woche:", weekData);
      console.log("✅ Monat:", monthData);
      console.log("✅ 3 Monate:", threeMonthsData);
    };

    fetchData();
  }, []);

  const labels = {
    week: "Letzte Woche",
    month: "Letzter Monat",
    threemonths: "Letzte 3 Monate",
  };

  const dataForRange = weightData[range] || [];

  let percentageChange: number | null = null;
  let numberColor = "#FFFFFF";

  if (dataForRange.length >= 2) {
    percentageChange = parseFloat(
      (
        ((dataForRange[dataForRange.length - 1].y - dataForRange[0].y) /
          dataForRange[0].y) *
        100
      ).toFixed(1)
    );
    numberColor = percentageChange <= 0 ? "#39FF14" : "#FF4C4C";
  }

  if (dataForRange.length === 0) {
    return (
      <View style={styles.screen}>
        <Text style={styles.header}>Körpergewicht</Text>
        <Text style={{ color: "#fff", textAlign: "center", marginTop: 20 }}>
          Daten werden geladen...
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <Text style={styles.header}>Körpergewicht</Text>

      {/* Buttons */}
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

      {/* Chart */}
      <View style={styles.chartContainer}>
        <Text style={styles.title}>{labels[range]}</Text>
        {percentageChange !== null && (
          <Text style={[styles.number, { color: numberColor }]}>
            {percentageChange >= 0 ? `+${percentageChange}` : percentageChange}%
          </Text>
        )}

        <VictoryChart theme={VictoryTheme.material} width={350} height={250}>
          <VictoryAxis
            label="Datum"
            tickFormat={dataForRange.map((d) => d.x)}
            style={{
              axisLabel: { padding: 30, fill: "#FFFFFF" },
              tickLabels: { fontSize: 10, fill: "#FFFFFF" },
            }}
          />
          <VictoryAxis
            dependentAxis
            label="Wert"
            style={{
              axisLabel: { padding: 38, fill: "#FFFFFF" },
              tickLabels: { fontSize: 8, fill: "#FFFFFF" },
            }}
          />
          <VictoryLine
            data={dataForRange}
            interpolation="linear"
            style={{
              data: { stroke: "#FFFFFF", strokeWidth: 2 },
            }}
          />
        </VictoryChart>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "flex-start",
    marginBottom: 30,
  },
  header: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 15,
  },
  chartContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: "rgba(56, 182, 255, 0.5)",
    borderRadius: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  number: {
    fontSize: 15,
    fontWeight: "bold",
  },
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
