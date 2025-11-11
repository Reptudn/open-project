import { ThemeColors } from "@/constants/theme";
import { addMeal } from "@/lib/api/daily/food_tracking";
import { MealType, Product } from "@/types/FoodData";
import Ionicons from "@expo/vector-icons/Ionicons";
import {
  useColorScheme,
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
} from "react-native";

export default function ProductItem({
  product,
  date,
  mealType,
}: {
  product: Product;
  date?: Date;
  mealType?: MealType;
}) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  return (
    <TouchableOpacity
      style={{
        backgroundColor: isDark ? "#333" : "#fff",
        margin: 10,
        ...styles.container,
      }}
    >
      <Text
        style={{
          color: isDark ? ThemeColors.dark.text : ThemeColors.light.text,
          ...styles.title,
        }}
      >
        {product.product_name || "Unknown Product"}
      </Text>
      <View style={{ ...styles.info }}>
        <Text style={{ color: isDark ? "#ccc" : "#555" }}>
          <Ionicons
            name="flame"
            size={24}
            color={isDark ? ThemeColors.dark.text : ThemeColors.light.text}
            style={{ marginRight: 4 }}
          />
          {(product.nutriments?.["energy-kcal_100g"] ?? 0).toFixed(0)}kcal
        </Text>
        <Text style={{ color: isDark ? "#ccc" : "#555" }}>
          <Ionicons
            name="barbell"
            size={24}
            color={isDark ? ThemeColors.dark.text : ThemeColors.light.text}
            style={{ marginRight: 4 }}
          />
          {(product.nutriments?.["proteins_100g"] ?? 0).toFixed(0)}g
        </Text>
        <Text style={{ color: isDark ? "#ccc" : "#555" }}>
          <Ionicons
            name="water"
            size={24}
            color={isDark ? ThemeColors.dark.text : ThemeColors.light.text}
            style={{ marginRight: 4 }}
          />
          {(product.nutriments?.["carbohydrates_100g"] ?? 0).toFixed(0)}g
        </Text>
        <Text style={{ color: isDark ? "#ccc" : "#555" }}>
          <Ionicons
            name="leaf"
            size={24}
            color={isDark ? ThemeColors.dark.text : ThemeColors.light.text}
            style={{ marginRight: 4 }}
          />
          {(product.nutriments?.["fat_100g"] ?? 0).toFixed(0)}g
        </Text>
      </View>
      <TouchableOpacity
        style={{ ...styles.addButton }}
        onPress={async () => {
          // add the product to meals with 100g as default
          if (date === undefined || mealType === undefined) return;
          try {
            await addMeal(product.code, mealType, date, 100);
          } catch (error) {
            console.error("Failed to add meal:", error);
          }
        }}
      >
        <Text style={{ color: "#fff", textAlign: "center" }}>Add 100g</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
}

// this is going to be the full page of the product if you want more information
export function ProductItemFull({ product }: { product: Product }) {
  return <ProductItem product={product} />;
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    paddingLeft: 3,
    paddingRight: 3,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  info: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  addButton: {
    alignSelf: "flex-end",
    backgroundColor: "#4CAF50",
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
    width: "100%",
  },
});
