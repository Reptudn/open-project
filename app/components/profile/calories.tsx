import { ThemeColors } from "@/constants/theme";
import { Dimensions, useColorScheme, StyleSheet, View } from "react-native";
import { ProgressChart } from "react-native-chart-kit";

const data = {
  labels: ["Swim", "Bike", "Run"], // optional
  data: [0.4, 0.5, 0.8],
};

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

export default function Calories() {
  const screenWidth = Dimensions.get("window").width;
  const colorScheme = useColorScheme();
  const chartConfig = setChartConfig(colorScheme === "dark");
  const styles = setStyles(colorScheme === "dark");

  return (
    <View style={styles.calories}>
      <ProgressChart
        data={data}
        width={screenWidth - 20}
        height={200}
        strokeWidth={16}
        radius={32}
        chartConfig={chartConfig}
        hideLegend={false}
      />
    </View>
  );
}

const setStyles = (isDark: boolean) =>
  StyleSheet.create({
    calories: {
      alignSelf: "center",
      marginVertical: 10,
      borderWidth: 2,
      borderColor: "#00ff99",
      borderRadius: 16,
      overflow: "hidden",
    },
  });
