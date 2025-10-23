import { ThemeColors } from "@/constants/theme";
import { useColorScheme, View, Text } from "react-native";

export default function DayNutritionOverview({
  eaten,
  burnt,
  toGo,
}: {
  eaten: number;
  burnt: number;
  toGo: number;
}) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: isDark
          ? ThemeColors.dark.background
          : ThemeColors.light.background,
        padding: 20,
        alignItems: "center",
        borderRadius: 10,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: isDark ? "#444" : "#ddd",
      }}
    >
      <Text
        style={{
          color: isDark ? ThemeColors.dark.text : ThemeColors.light.text,
          fontSize: 18,
          fontWeight: "bold",
          justifyContent: "flex-start",
        }}
      >
        Day Nutrition Overview
      </Text>
      <View
        style={{
          marginTop: 10,
          display: "flex",
          flexDirection: "row",
          gap: 20,
          width: "100%",
          justifyContent: "flex-end",
        }}
      >
        <View style={{ alignItems: "center" }}>
          <Text
            style={{
              color: isDark ? ThemeColors.dark.text : ThemeColors.light.text,
            }}
          >
            Calories eaten
          </Text>
          <Text
            style={{
              color: isDark ? ThemeColors.dark.text : ThemeColors.light.text,
            }}
          >
            {eaten}
          </Text>
        </View>
        <View style={{ alignItems: "center" }}>
          <Text
            style={{
              color: isDark ? ThemeColors.dark.text : ThemeColors.light.text,
            }}
          >
            Calories to go
          </Text>
          <Text
            style={{
              color: isDark ? ThemeColors.dark.text : ThemeColors.light.text,
            }}
          >
            {toGo}
          </Text>
        </View>
        <View style={{ alignItems: "center" }}>
          <Text
            style={{
              color: isDark ? ThemeColors.dark.text : ThemeColors.light.text,
            }}
          >
            Calories burnt
          </Text>
          <Text
            style={{
              color: isDark ? ThemeColors.dark.text : ThemeColors.light.text,
            }}
          >
            {burnt}
          </Text>
        </View>
      </View>
    </View>
  );
}
