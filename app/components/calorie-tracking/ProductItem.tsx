import { ThemeColors } from "@/constants/theme";
import { addMeal } from "@/lib/api/daily/food_tracking";
import { MealType, Product } from "@/types/FoodData";
import { DBProduct } from "@/types/Meals";
import { toDbDateString } from "@/utils/database";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
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
  onAdd,
}: {
  product: DBProduct;
  date?: Date;
  mealType?: MealType;
  onAdd?: (success: boolean) => void;
}) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  const NutrientRow = ({
    label,
    value,
    unit = "g",
    icon,
    color,
  }: {
    label: string;
    value: number | undefined;
    unit?: string;
    icon: string;
    color?: string;
  }) => {
    if (!value && value !== 0) return null;

    return (
      <View style={styles.nutrientRow}>
        <View style={styles.nutrientLeft}>
          <Ionicons
            name={icon as any}
            size={16}
            color={
              color || (isDark ? ThemeColors.dark.text : ThemeColors.light.text)
            }
            style={{ marginRight: 8 }}
          />
          <Text
            style={[styles.nutrientLabel, { color: isDark ? "#ccc" : "#666" }]}
          >
            {label}
          </Text>
        </View>
        <Text
          style={[
            styles.nutrientValue,
            { color: isDark ? ThemeColors.dark.text : ThemeColors.light.text },
          ]}
        >
          {Number(value).toFixed(1)}
          {unit}
        </Text>
      </View>
    );
  };

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
            product: JSON.stringify(product),
            mealType,
            date: date ? toDbDateString(date) : undefined,
          },
        });
      }}
    >
      {/* Header */}
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
            {product.name || "Unknown Product"}
          </Text>
          {product.brand && (
            <Text style={[styles.brand, { color: isDark ? "#888" : "#666" }]}>
              {product.brand}
            </Text>
          )}
        </View>
      </View>

      {/* Main Nutrients */}
      <View style={styles.mainNutrients}>
        <View style={styles.caloriesContainer}>
          <Ionicons
            name="flame"
            size={20}
            color="#ff6b35"
            style={{ marginRight: 6 }}
          />
          <Text
            style={[
              styles.calories,
              {
                color: isDark ? ThemeColors.dark.text : ThemeColors.light.text,
              },
            ]}
          >
            {Number(product.nutriments?.["energy-kcal_100g"] ?? 0).toFixed(0)}
          </Text>
          <Text
            style={[styles.caloriesUnit, { color: isDark ? "#888" : "#666" }]}
          >
            kcal
          </Text>
        </View>

        <View style={styles.macrosGrid}>
          <NutrientRow
            label="Protein"
            value={product.nutriments?.["proteins_100g"]}
            icon="fitness"
            color="#4CAF50"
          />
          <NutrientRow
            label="Carbs"
            value={product.nutriments?.["carbohydrates_100g"]}
            icon="leaf"
            color="#FF9800"
          />
          <NutrientRow
            label="Fat"
            value={product.nutriments?.["fat_100g"]}
            icon="water"
            color="#2196F3"
          />
        </View>
      </View>

      {/* Add Button */}
      <TouchableOpacity
        style={[
          styles.addButton,
          { backgroundColor: isDark ? "#4CAF50" : "#4CAF50" },
        ]}
        onPress={async () => {
          if (date === undefined || mealType === undefined) return;
          console.log("meal type is: " + mealType);
          try {
            await addMeal(product.barcode, mealType, date, 100);
            if (onAdd) onAdd(true);
          } catch (error) {
            console.error("Failed to add meal:", error);
            if (onAdd) onAdd(false);
          }
        }}
      >
        <Ionicons
          name="add"
          size={18}
          color="#fff"
          style={{ marginRight: 6 }}
        />
        <Text style={styles.addButtonText}>Add 100g</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
}

const getNutriscoreColor = (grade: string): string => {
  switch (grade.toLowerCase()) {
    case "a":
      return "#00C851";
    case "b":
      return "#85C441";
    case "c":
      return "#FFBB33";
    case "d":
      return "#FF8800";
    case "e":
      return "#FF4444";
    default:
      return "#6c757d";
  }
};

// this is going to be the full page of the product if you want more information
export function ProductItemFull({ product }: { product: DBProduct }) {
  return <ProductItem product={product} />;
}

const styles = StyleSheet.create({
  container: {
    margin: 12,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  productInfo: {
    flex: 1,
    marginRight: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    lineHeight: 22,
    marginBottom: 4,
  },
  brand: {
    fontSize: 14,
    fontStyle: "italic",
  },
  nutriscoreContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  nutriscoreText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
  mainNutrients: {
    marginBottom: 12,
  },
  caloriesContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: "rgba(255, 107, 53, 0.1)",
    borderRadius: 8,
  },
  calories: {
    fontSize: 18,
    fontWeight: "bold",
  },
  caloriesUnit: {
    fontSize: 14,
    marginLeft: 2,
  },
  macrosGrid: {
    gap: 6,
  },
  additionalNutrients: {
    marginBottom: 12,
    gap: 4,
  },
  nutrientRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 6,
    paddingHorizontal: 8,
  },
  nutrientLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  nutrientLabel: {
    fontSize: 14,
    fontWeight: "500",
  },
  nutrientValue: {
    fontSize: 14,
    fontWeight: "600",
    minWidth: 50,
    textAlign: "right",
  },
  addButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginTop: 8,
  },
  addButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
