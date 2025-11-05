import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { VictoryChart, VictoryLine, VictoryAxis, VictoryTheme } from "victory-native";

type DataPoint = { x: string; y: number };

export default function TableStats({
  title,
  range,
  data,
}: {
  title: string;
  range: "week" | "month" | "3months";
  data: { [key in "week" | "month" | "3months"]: DataPoint[] };
}) {
  const dataForRange = data[range];

  const labels = {
    week: "Letzte Woche",
    month: "Letzter Monat",
    "3months": "Letzte 3 Monate",
  };

  const percentageChange = parseFloat(
    (((dataForRange[dataForRange.length - 1].y - dataForRange[0].y) / dataForRange[0].y) * 100).toFixed(1)
  );
  const numberColor = percentageChange <= 0 ? "#39FF14" : "#FF4C4C";

  return (
    <View style={styles.screen}>
      <Text style={styles.header}>{title}</Text>

      {/* Chart */}
      <View style={styles.chartContainer}>
        <Text style={styles.title}>{labels[range]}</Text>
        <Text style={[styles.number, { color: numberColor }]}>{percentageChange}%</Text>

        <VictoryChart theme={VictoryTheme.material} width={350} height={200}>
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
            label="Gewicht (kg)"
            style={{
              axisLabel: { padding: 38, fill: "#FFFFFF" },
              tickLabels: { fontSize: 8, fill: "#FFFFFF" },
            }}
          />
          <VictoryLine
            data={dataForRange}
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
