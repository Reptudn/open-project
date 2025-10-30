import React, { useState } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { VictoryChart, VictoryLine, VictoryAxis, VictoryTheme } from "victory-native";

type DataPoint = { x: string; y: number };

export default function StatsScreen({title}: {title:string}) {
  const [range, setRange] = useState<"week" | "month" | "3months">("week");

  const dataWeek: DataPoint[] = [
    { x: "Mo", y: 70 },
    { x: "Di", y: 70.4 },
    { x: "Mi", y: 70.1 },
    { x: "Do", y: 70.3 },
    { x: "Fr", y: 70.0 },
    { x: "Sa", y: 69.8 },
    { x: "So", y: 69.7 },
  ];

  const dataMonth: DataPoint[] = [
    { x: "W1", y: 71 },
    { x: "W2", y: 70.6 },
    { x: "W3", y: 70.3 },
    { x: "W4", y: 69.9 },
  ];

  const data3Months: DataPoint[] = [
    { x: "Aug", y: 72 },
    { x: "Sep", y: 70.8 },
    { x: "Okt", y: 69.8 },
  ];

  const dataMap = {
    week: dataWeek,
    month: dataMonth,
    "3months": data3Months,
  };

  const labels = {
    week: "Letzte Woche",
    month: "Letzter Monat",
    "3months": "Letzte 3 Monate",
  };

  const data = dataMap[range];
  const percentageChange = parseFloat(
    (((data[data.length - 1].y - data[0].y) / data[0].y) * 100).toFixed(1)
  );
  const numberColor = percentageChange <= 0 ? "#39FF14" : "#FF4C4C";

  return (
    <View style={styles.screen}>
      <Text style={styles.header}>{title}</Text>

      {/* Buttons */}
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

      {/* Chart */}
      <View style={styles.chartContainer}>
        <Text style={styles.title}>{labels[range]}</Text>
        <Text style={[styles.number, { color: numberColor }]}>{percentageChange}%</Text>

        <VictoryChart theme={VictoryTheme.material} width={350} height={200}>
          <VictoryAxis
            label="Datum"
            tickFormat={data.map((d) => d.x)}
            style={{
              axisLabel: { padding: 30, fill: "#FFFFFF" },
              tickLabels: { fontSize: 10, fill: "#FFFFFF" },
            }}
          />
          <VictoryAxis
            dependentAxis
            label="Gewicht (kg)"
            style={{
              axisLabel: { padding: 38, fill: "#FFFFFF" },
              tickLabels: { fontSize: 8, fill: "#FFFFFF" },
            }}
          />
          <VictoryLine
            data={data}
            interpolation="monotoneX"
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
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#222",
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  buttonActive: {
    backgroundColor: "#38B6FF",
  },
  buttonText: {
    color: "#fff",
    fontSize: 12,
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
});
