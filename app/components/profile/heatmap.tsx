import {
  Dimensions,
  StyleSheet,
  useColorScheme,
  View,
  Text,
  Alert,
} from "react-native";
import { ContributionGraph } from "react-native-chart-kit";
import { ThemeColors } from "@/constants/theme";
import { useState } from "react";

const screenWidth = Dimensions.get("window").width;

const setChartConfig = (isDark: boolean) => ({
  backgroundGradientFrom: isDark
    ? ThemeColors.dark.background
    : ThemeColors.light.background,
  backgroundGradientFromOpacity: 1,
  backgroundGradientTo: isDark
    ? ThemeColors.dark.background
    : ThemeColors.light.background,
  backgroundGradientToOpacity: 1,
  color: (opacity = 1) => `rgba(26, 255, 0, ${opacity})`,
  strokeWidth: 2,
  barPercentage: 0.5,
  useShadowColorFromDataset: false,
});

const commitsData = [
  { date: new Date("2025-08-02"), count: 1 },
  { date: new Date("2025-08-03"), count: 2 },
  { date: new Date("2025-08-04"), count: 3 },
  { date: new Date("2025-08-05"), count: 4 },
  { date: new Date("2025-08-06"), count: 5 },
  { date: new Date("2025-08-30"), count: 2 },
  { date: new Date("2025-08-31"), count: 3 },
  { date: new Date("2025-08-01"), count: 2 },
  { date: new Date("2025-08-02"), count: 4 },
  { date: new Date("2025-10-01"), count: 2 },
  { date: new Date("2025-09-30"), count: 4 },
];

export default function HeatMap() {
  const colorScheme = useColorScheme();
  const styles = setStyles(colorScheme === "dark");
  const chartConfig = setChartConfig(colorScheme === "dark");
  const [tooltip, setTooltip] = useState<{
    x: number;
    y: number;
    date: string;
    count: number;
  } | null>(null);

  const handleDayPress = (day: { date: Date; count: number }) => {
    setTooltip({
      x: 0,
      y: 0,
      date: day.date.toString().slice(0, 10),
      count: day.count,
    });
  };

  return (
    <>
      <ContributionGraph
        style={styles.heatmap}
        values={commitsData}
        endDate={new Date()}
        numDays={80}
        squareSize={25}
        width={screenWidth - 20}
        height={240}
        chartConfig={chartConfig}
        tooltipDataAttrs={() => ({} as any)}
        onDayPress={handleDayPress}
      />
      {tooltip && (
        <View
          style={[
            styles.tooltip,
            { top: tooltip.y, left: tooltip.x + 25 + 5 }, // rechts neben dem Kästchen
          ]}
        >
          <Text style={{ fontWeight: "bold" }}>{tooltip.date}</Text>
          <Text>Count: {tooltip.count}</Text>
        </View>
      )}
    </>
  );
}

const setStyles = (isDark: boolean) =>
  StyleSheet.create({
    heatmap: {
      alignSelf: "center",
      marginVertical: 10,
      borderWidth: 2,
      borderColor: "#00ff99",
      borderRadius: 12,
    },
    tooltip: {
      position: "absolute",
      padding: 6,
      backgroundColor: "#333",
      borderRadius: 6,
      zIndex: 10,
    },
  });
