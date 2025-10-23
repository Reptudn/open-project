import { ThemeColors } from "@/constants/theme";
import Ionicons from "@expo/vector-icons/Ionicons";
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
  return (
    <View
      style={{
        padding: 16,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
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
          // borderRadius: 50,
          // borderWidth: 5,
          // borderColor: "rgba(34, 183, 209, 1)",
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
          /* Handle add food action */
        }}
      >
        <Ionicons
          name="add-circle-outline"
          size={24}
          color={isDark ? "white" : "black"}
          style={{
            marginLeft: 8,
            justifyContent: "flex-end",
          }}
        />
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
    </View>
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
