
import Calories from "@/components/profile/calories";
import HeatMap from "@/components/profile/heatmap";
import { ThemeColors } from "@/constants/theme";
import { View, StyleSheet, useColorScheme } from "react-native";

export default function HomeScreen() {
  const colorScheme = useColorScheme();
  const styles = setStyles(colorScheme === "dark");
  return (
    <View style={styles.container}>
      <HeatMap />
      <Calories />
    </View>
  );
}

const setStyles = (isDark: boolean) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDark ? ThemeColors.dark.background : ThemeColors.light.background,
    },
  });
