import { ThemeColors } from "@/constants/theme";
import { MealType } from "@/types/FoodData.d";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import {
  StyleSheet,
  View,
  Text,
  useColorScheme,
  TouchableOpacity,
} from "react-native";

function MealItem({
  title,
  eaten,
  toEat,
}: {
  title: "Breakfast" | "Lunch" | "Dinner" | "Snacks";
  eaten: number;
  toEat: number;
}) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const progress = Math.min(eaten / toEat, 1);
  const isComplete = eaten >= toEat;

  const mealTypeEnum: MealType = (() => {
    switch (title) {
      case "Breakfast":
        return MealType.BREAKFAST;
      case "Lunch":
        return MealType.LUNCH;
      case "Dinner":
        return MealType.DINNER;
      case "Snacks":
        return MealType.SNACK;
      default:
        return MealType.SNACK;
    }
  })();

  return (
    <TouchableOpacity
      style={{
        padding: 16,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}
      onPress={() => {
        router.push({
          pathname: "/(meal)/meal",
          params: {
            mealType: mealTypeEnum,
            openSearch: "false",
          },
        });
      }}
    >
      <Ionicons
        name="restaurant"
        size={24}
        color={isDark ? "white" : "black"}
        style={{
          marginRight: 8,
          justifyContent: "flex-start",
          padding: 5,
        }}
      />
      <Text style={{ fontWeight: "bold", color: isDark ? "white" : "black" }}>
        {title}{" "}
      </Text>
      <Text style={{ color: isDark ? "white" : "black" }}>
        {eaten} / {toEat} calories eaten
      </Text>
      <TouchableOpacity
        onPress={() => {
          router.push({
            pathname: "/(meal)/meal",
            params: {
              mealType: title,
              openSearch: "true",
            },
          });
        }}
      >
        {!isComplete ? (
          <Ionicons
            name="add-circle-outline"
            size={24}
            color={isDark ? "white" : "black"}
            style={{
              marginLeft: 8,
              justifyContent: "flex-end",
            }}
          />
        ) : (
          <Ionicons
            name="checkmark-circle-outline"
            size={24}
            color={isDark ? "white" : "black"}
            style={{
              marginLeft: 8,
              justifyContent: "flex-end",
            }}
          />
        )}
      </TouchableOpacity>
      <View
        style={{
          position: "absolute",
          left: 0,
          height: "200%",
          borderRadius: 10,
          backgroundColor: "rgba(68, 211, 236, 0.2)",
          width: `${progress * 100}%`,
        }}
      />
    </TouchableOpacity>
  );
}

export default function Meals() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: isDark
          ? ThemeColors.dark.background
          : ThemeColors.light.background,
        borderRadius: 10,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: isDark ? "#444" : "#ddd",
        padding: 0,
      }}
    >
      <MealItem title="Breakfast" eaten={300} toEat={500} />
      <View
        style={{
          ...styles.horizontalLine,
          backgroundColor: isDark ? "#444" : "#ddd",
        }}
      />
      <MealItem title="Lunch" eaten={400} toEat={600} />
      <View
        style={{
          ...styles.horizontalLine,
          backgroundColor: isDark ? "#444" : "#ddd",
        }}
      />
      <MealItem title="Dinner" eaten={500} toEat={700} />
      <View
        style={{
          ...styles.horizontalLine,
          backgroundColor: isDark ? "#444" : "#ddd",
        }}
      />
      <MealItem title="Snacks" eaten={200} toEat={300} />
    </View>
  );
}

const styles = StyleSheet.create({
  horizontalLine: {
    width: "100%",
    height: 1,
  },
});
