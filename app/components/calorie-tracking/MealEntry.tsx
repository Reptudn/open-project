import { FoodsTableEntry } from "@/types/Meals";
import {
  View,
  Text,
  useColorScheme,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { ThemeColors } from "@/constants/theme";
import { router } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { MealType } from "@/types/FoodData";

export default function MealEntry({
  entry,
  mealType,
  onLongPress,
  editMeal,
}: {
  entry: FoodsTableEntry;
  mealType: MealType;
  onLongPress: () => void;
  editMeal?: boolean;
}) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  const product = entry.barcode_id;
  if (product == null) {
    return (
      <View
        style={[
          styles.container,
          styles.errorContainer,
          { backgroundColor: isDark ? "#2a2a2a" : "#ffffff" },
        ]}
      >
        <Ionicons name="alert-circle" size={24} color="#ff6b35" />
        <Text
          style={[
            styles.errorText,
            { color: isDark ? ThemeColors.dark.text : ThemeColors.light.text },
          ]}
        >
          Unknown Meal
        </Text>
      </View>
    );
  }

  // Calculate scaled nutrients based on amount
  const scaleFactor = (entry.amount_in_g || 100) / 100;
  const scaledCalories = product.nutriments?.["energy-kcal_100g"]
    ? (product.nutriments["energy-kcal_100g"] * scaleFactor).toFixed(0)
    : "0";
  const scaledProtein = product.nutriments?.["proteins_100g"]
    ? (product.nutriments["proteins_100g"] * scaleFactor).toFixed(1)
    : "0";
  const scaledCarbs = product.nutriments?.["carbohydrates_100g"]
    ? (product.nutriments["carbohydrates_100g"] * scaleFactor).toFixed(1)
    : "0";
  const scaledFat = product.nutriments?.["fat_100g"]
    ? (product.nutriments["fat_100g"] * scaleFactor).toFixed(1)
    : "0";

  return (
    <TouchableOpacity
      style={[
        styles.container,
        {
          backgroundColor: isDark ? "#2a2a2a" : "#ffffff",
          borderColor: isDark ? "#404040" : "#e0e0e0",
        },
      ]}
      onPress={() => {
        router.push({
          pathname: "/(meal)/foodInfo",
          params: {
            product: JSON.stringify(entry),
            mealType: mealType,
            edit: editMeal ? "true" : "false",
          },
        });
      }}
      onLongPress={onLongPress}
    >
      {/* Header with inline calories */}
      <View style={styles.header}>
        <View style={styles.productInfo}>
          <Text
            style={[
              styles.title,
              {
                color: isDark ? ThemeColors.dark.text : ThemeColors.light.text,
              },
            ]}
          >
            {product.name || "Unknown Food Item"}
          </Text>
          {product.brand && (
            <Text style={[styles.brand, { color: isDark ? "#888" : "#666" }]}>
              {product.brand}
            </Text>
          )}
        </View>
        <View style={styles.rightSection}>
          <View style={styles.amountContainer}>
            <Text
              style={[
                styles.amount,
                {
                  color: isDark
                    ? ThemeColors.dark.text
                    : ThemeColors.light.text,
                },
              ]}
            >
              {entry.amount_in_g}g
            </Text>
          </View>
          <View style={styles.caloriesContainer}>
            <Ionicons name="flame" size={14} color="#ff6b35" />
            <Text
              style={[
                styles.calories,
                {
                  color: isDark
                    ? ThemeColors.dark.text
                    : ThemeColors.light.text,
                },
              ]}
            >
              {scaledCalories}
            </Text>
            <Text
              style={[styles.caloriesUnit, { color: isDark ? "#888" : "#666" }]}
            >
              kcal
            </Text>
          </View>
        </View>
      </View>

      {/* Compact Macros Row */}
      <View style={styles.macrosRow}>
        <View style={styles.macroItem}>
          <Ionicons name="fitness" size={12} color="#4CAF50" />
          <Text
            style={[
              styles.macroValue,
              {
                color: isDark ? ThemeColors.dark.text : ThemeColors.light.text,
              },
            ]}
          >
            {scaledProtein}g
          </Text>
        </View>

        <View style={styles.macroItem}>
          <Ionicons name="leaf" size={12} color="#FF9800" />
          <Text
            style={[
              styles.macroValue,
              {
                color: isDark ? ThemeColors.dark.text : ThemeColors.light.text,
              },
            ]}
          >
            {scaledCarbs}g
          </Text>
        </View>

        <View style={styles.macroItem}>
          <Ionicons name="water" size={12} color="#2196F3" />
          <Text
            style={[
              styles.macroValue,
              {
                color: isDark ? ThemeColors.dark.text : ThemeColors.light.text,
              },
            ]}
          >
            {scaledFat}g
          </Text>
        </View>

        <View style={styles.macroItem}>
          <Ionicons
            name="chevron-forward"
            size={14}
            color={isDark ? "#888" : "#666"}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 6,
    marginHorizontal: 12,
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 2,
  },
  errorContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },
  errorText: {
    fontSize: 14,
    fontWeight: "500",
    marginLeft: 8,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 8,
  },
  productInfo: {
    flex: 1,
    marginRight: 8,
  },
  title: {
    fontSize: 14,
    fontWeight: "600",
    lineHeight: 18,
    marginBottom: 2,
  },
  brand: {
    fontSize: 12,
    fontStyle: "italic",
  },
  rightSection: {
    alignItems: "flex-end",
    gap: 4,
  },
  amountContainer: {
    backgroundColor: "rgba(108, 117, 125, 0.1)",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  amount: {
    fontSize: 12,
    fontWeight: "600",
  },
  caloriesContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
  },
  calories: {
    fontSize: 14,
    fontWeight: "bold",
  },
  caloriesUnit: {
    fontSize: 12,
  },
  macrosRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 6,
    borderTopWidth: 1,
    borderTopColor: "rgba(0, 0, 0, 0.05)",
  },
  macroItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
  },
  macroValue: {
    fontSize: 12,
    fontWeight: "500",
  },
});
