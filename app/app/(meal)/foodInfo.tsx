import GymView from "@/components/ui/GymView";
import { GymText, GymTitle } from "@/components/ui/Text";
import { getThemeColor } from "@/constants/theme";
import { Product, MealType } from "@/types/FoodData.d";
import { FoodsTableEntry } from "@/types/Meals.d";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router, useLocalSearchParams } from "expo-router";
import {
  TouchableOpacity,
  useColorScheme,
  View,
  Text,
  StyleSheet,
  TextInput,
  Alert,
  ActivityIndicator,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useRef, useState } from "react";
import { addMeal } from "@/lib/api/daily/food_tracking";
import BottomSheet, {
  BottomSheetTextInput,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { GymButtonFullWidth } from "@/components/ui/Button";

export default function FoodInfo() {
  const theme = getThemeColor(useColorScheme());
  const isDark = useColorScheme() === "dark";
  const { product, dbProduct, mealType, date } = useLocalSearchParams<{
    product?: string;
    dbProduct?: string;
    mealType?: string;
    date?: string;
  }>();

  const [amount, setAmount] = useState("100");
  const [unit, setUnit] = useState<"grams" | "portions">("grams");
  const [isAdding, setIsAdding] = useState(false);

  const bottomSheetRef = useRef<BottomSheet>(null);

  let prod: Product | FoodsTableEntry;
  let nutriments: any;
  let isDbProduct = false;

  if (dbProduct) {
    prod = JSON.parse(dbProduct as string) as FoodsTableEntry;
    nutriments = prod.barcode_id.nutriments;
    isDbProduct = true;
  } else {
    prod = JSON.parse(product as string) as Product;
    nutriments = prod.nutriments;
    isDbProduct = false;
  }

  // Helper functions to safely access properties
  const getProductName = () => {
    if (isDbProduct) {
      const dbProd = prod as FoodsTableEntry;
      return dbProd.barcode_id.name || "Unknown Product";
    } else {
      const apiProd = prod as Product;
      return apiProd.product_name || apiProd.generic_name || "Unknown Product";
    }
  };

  const getBrands = () => {
    if (isDbProduct) {
      const dbProd = prod as FoodsTableEntry;
      return dbProd.barcode_id.brand || "N/A";
    } else {
      const apiProd = prod as Product;
      return apiProd.brands || "N/A";
    }
  };

  const getQuantity = () => {
    if (isDbProduct) {
      return null; // DB products don't have quantity info
    } else {
      const apiProd = prod as Product;
      return apiProd.quantity;
    }
  };

  const getNutriScore = () => {
    if (isDbProduct) {
      return null; // DB products don't have nutriscore in this structure
    } else {
      const apiProd = prod as Product;
      return apiProd.nutriscore_grade;
    }
  };

  const getNovaGroup = () => {
    if (isDbProduct) {
      return null; // DB products don't have nova group in this structure
    } else {
      const apiProd = prod as Product;
      return apiProd.nova_group;
    }
  };

  const getCategories = () => {
    if (isDbProduct) {
      const dbProd = prod as FoodsTableEntry;
      return dbProd.barcode_id.categories?.join(", ");
    } else {
      const apiProd = prod as Product;
      return apiProd.categories;
    }
  };

  const getIngredients = () => {
    if (isDbProduct) {
      return null; // DB products don't have ingredients in this structure
    } else {
      const apiProd = prod as Product;
      return apiProd.ingredients_text;
    }
  };

  const getProductCode = () => {
    if (isDbProduct) {
      const dbProd = prod as FoodsTableEntry;
      return dbProd.barcode_id.barcode;
    } else {
      const apiProd = prod as Product;
      return apiProd.code;
    }
  };

  // Add meal functionality
  const getMealTypeFromParams = (): MealType => {
    switch (mealType) {
      case "BREAKFAST":
        return MealType.BREAKFAST;
      case "LUNCH":
        return MealType.LUNCH;
      case "DINNER":
        return MealType.DINNER;
      case "SNACK":
        return MealType.SNACK;
      default:
        return MealType.SNACK;
    }
  };

  const handleAddToMeal = async () => {
    if (!amount || Number(amount) <= 0) {
      Alert.alert("Invalid Amount", "Please enter a valid amount");
      return;
    }

    setIsAdding(true);
    try {
      const amountInGrams =
        unit === "grams" ? Number(amount) : Number(amount) * 100;
      const targetDate = date ? new Date(date) : new Date();
      const targetMealType = getMealTypeFromParams();
      const productCode = getProductCode();

      console.log("Adding meal with details:", {
        productCode,
        targetMealType,
        targetDate,
        amountInGrams,
      });
      await addMeal(productCode, targetMealType, targetDate, amountInGrams);
      console.log("Added Meal Successfully");

      Alert.alert(
        "Added Successfully",
        `${amount}${unit === "grams" ? "g" : " portions"} of ${getProductName()} added successfully!`,
        [
          {
            text: "OK",
            onPress: () => router.back(),
          },
        ]
      );
    } catch (error) {
      console.error("Failed to add meal:", error);
      Alert.alert("Error", "Failed to add food to meal");
    } finally {
      setIsAdding(false);
    }
  };

  const calculateNutritionPreview = () => {
    const multiplier = unit === "grams" ? Number(amount) / 100 : Number(amount);
    return {
      calories: (nutriments?.["energy-kcal_100g"] || 0) * multiplier,
      protein: (nutriments?.["proteins_100g"] || 0) * multiplier,
      carbs: (nutriments?.["carbohydrates_100g"] || 0) * multiplier,
      fat: (nutriments?.["fat_100g"] || 0) * multiplier,
    };
  };

  const NutrientRow = ({
    label,
    value,
    unit = "g",
    icon,
  }: {
    label: string;
    value: number | undefined;
    unit?: string;
    icon: string;
  }) => {
    if (!value && value !== 0) return null;

    return (
      <View
        style={[
          styles.nutrientRow,
          { borderBottomColor: isDark ? "#333" : "#eee" },
        ]}
      >
        <View style={styles.nutrientLeft}>
          <Ionicons
            name={icon as any}
            size={20}
            color={theme.text}
            style={styles.nutrientIcon}
          />
          <Text style={[styles.nutrientLabel, { color: theme.text }]}>
            {label}
          </Text>
        </View>
        <Text style={[styles.nutrientValue, { color: theme.text }]}>
          {Number(value).toFixed(1)}
          {unit}
        </Text>
      </View>
    );
  };

  const SectionHeader = ({ title }: { title: string }) => (
    <Text style={[styles.sectionHeader, { color: theme.text }]}>{title}</Text>
  );

  return (
    <GymView>
      <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
        <Ionicons name="arrow-back" size={24} color={theme.text} />
      </TouchableOpacity>

      <View style={styles.header}>
        <GymTitle style={{ color: theme.text }}>
          {getProductName()} (adding to{" "}
          {mealType ? mealType.toLowerCase() : "unknown meal"})
        </GymTitle>
        <GymText style={{ color: theme.text, opacity: 0.7 }}>
          {getBrands()}
        </GymText>
        {getQuantity() && (
          <GymText style={{ color: theme.text, opacity: 0.6 }}>
            Quantity: {getQuantity()}
          </GymText>
        )}
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* Nutrition Score */}
        {getNutriScore() && (
          <View
            style={[
              styles.scoreCard,
              { backgroundColor: isDark ? "#2a2a2a" : "#f5f5f5" },
            ]}
          >
            <Text style={[styles.scoreTitle, { color: theme.text }]}>
              Nutri-Score
            </Text>
            <View
              style={[
                styles.scoreBadge,
                { backgroundColor: getScoreColor(getNutriScore()!) },
              ]}
            >
              <Text style={styles.scoreText}>
                {getNutriScore()!.toUpperCase()}
              </Text>
            </View>
          </View>
        )}

        {/* Basic Nutrition - Per 100g */}
        <SectionHeader title="Nutrition Facts (per 100g)" />
        <View
          style={[
            styles.section,
            { backgroundColor: isDark ? "#1e1e1e" : "#fff" },
          ]}
        >
          <NutrientRow
            label="Energy"
            value={nutriments?.["energy-kcal_100g"]}
            unit=" kcal"
            icon="flame"
          />
          <NutrientRow
            label="Proteins"
            value={nutriments?.["proteins_100g"]}
            icon="barbell"
          />
          <NutrientRow
            label="Carbohydrates"
            value={nutriments?.["carbohydrates_100g"]}
            icon="water"
          />
          <NutrientRow
            label="Sugars"
            value={nutriments?.["sugars_100g"]}
            icon="cube"
          />
          <NutrientRow
            label="Fat"
            value={nutriments?.["fat_100g"]}
            icon="leaf"
          />
          <NutrientRow
            label="Saturated Fat"
            value={nutriments?.["saturated-fat_100g"]}
            icon="warning"
          />
          <NutrientRow
            label="Fiber"
            value={nutriments?.["fiber_100g"]}
            icon="git-branch"
          />
          <NutrientRow
            label="Salt"
            value={nutriments?.["salt_100g"]}
            icon="diamond"
          />
          <NutrientRow
            label="Sodium"
            value={nutriments?.["sodium_100g"]}
            unit=" mg"
            icon="diamond-outline"
          />
        </View>

        {/* Vitamins */}
        {(nutriments?.["vitamin-b2_100g"] ||
          nutriments?.["vitamin-b6_100g"] ||
          nutriments?.["vitamin-b12_100g"] ||
          nutriments?.["vitamin-pp_100g"]) && (
          <>
            <SectionHeader title="Vitamins (per 100g)" />
            <View
              style={[
                styles.section,
                { backgroundColor: isDark ? "#1e1e1e" : "#fff" },
              ]}
            >
              <NutrientRow
                label="Vitamin B2 (Riboflavin)"
                value={nutriments?.["vitamin-b2_100g"]}
                unit=" mg"
                icon="medical"
              />
              <NutrientRow
                label="Vitamin B6"
                value={nutriments?.["vitamin-b6_100g"]}
                unit=" mg"
                icon="medical"
              />
              <NutrientRow
                label="Vitamin B12"
                value={nutriments?.["vitamin-b12_100g"]}
                unit=" μg"
                icon="medical"
              />
              <NutrientRow
                label="Vitamin PP (Niacin)"
                value={nutriments?.["vitamin-pp_100g"]}
                unit=" mg"
                icon="medical"
              />
              <NutrientRow
                label="Biotin"
                value={nutriments?.["biotin_100g"]}
                unit=" μg"
                icon="medical"
              />
            </View>
          </>
        )}

        {/* Additional Info */}
        <SectionHeader title="Additional Information" />
        <View
          style={[
            styles.section,
            { backgroundColor: isDark ? "#1e1e1e" : "#fff" },
          ]}
        >
          {getNovaGroup() && (
            <View
              style={[
                styles.nutrientRow,
                { borderBottomColor: isDark ? "#333" : "#eee" },
              ]}
            >
              <Text style={[styles.nutrientLabel, { color: theme.text }]}>
                NOVA Group
              </Text>
              <Text style={[styles.nutrientValue, { color: theme.text }]}>
                {getNovaGroup()}
              </Text>
            </View>
          )}

          {getCategories() && (
            <View
              style={[
                styles.nutrientRow,
                { borderBottomColor: isDark ? "#333" : "#eee" },
              ]}
            >
              <Text style={[styles.nutrientLabel, { color: theme.text }]}>
                Categories
              </Text>
              <Text
                style={[
                  styles.nutrientValue,
                  { color: theme.text, flex: 1, textAlign: "right" },
                ]}
                numberOfLines={2}
              >
                {isDbProduct
                  ? getCategories()
                  : getCategories()?.split(",").slice(0, 3).join(", ")}
              </Text>
            </View>
          )}

          {getIngredients() && (
            <View
              style={[
                styles.ingredientsContainer,
                { borderTopColor: isDark ? "#333" : "#eee" },
              ]}
            >
              <Text style={[styles.ingredientsTitle, { color: theme.text }]}>
                Ingredients
              </Text>
              <Text style={[styles.ingredientsText, { color: theme.text }]}>
                {getIngredients()}
              </Text>
            </View>
          )}
        </View>

        {/* Quantity Selection */}
        {mealType && (
          <>
            <SectionHeader title="Add to Meal" />
            <View
              style={[
                styles.section,
                { backgroundColor: isDark ? "#1e1e1e" : "#fff" },
              ]}
            >
              <View style={styles.amountContainer}>
                <Text style={[styles.amountLabel, { color: theme.text }]}>
                  Amount:
                </Text>
                <View style={styles.inputContainer}>
                  <TextInput
                    style={[
                      styles.amountInput,
                      {
                        borderColor: isDark ? "#444" : "#ddd",
                        backgroundColor: isDark ? "#2a2a2a" : "#f8f8f8",
                        color: theme.text,
                      },
                    ]}
                    value={amount}
                    onChangeText={setAmount}
                    keyboardType="numeric"
                    placeholder="100"
                    placeholderTextColor={isDark ? "#666" : "#999"}
                  />
                  <View style={styles.unitToggle}>
                    <TouchableOpacity
                      style={[
                        styles.unitButton,
                        {
                          backgroundColor:
                            unit === "grams" ? theme.tint : "transparent",
                          borderColor: theme.tint,
                        },
                      ]}
                      onPress={() => setUnit("grams")}
                    >
                      <Text
                        style={[
                          styles.unitButtonText,
                          { color: unit === "grams" ? "#fff" : theme.tint },
                        ]}
                      >
                        g
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[
                        styles.unitButton,
                        {
                          backgroundColor:
                            unit === "portions" ? theme.tint : "transparent",
                          borderColor: theme.tint,
                        },
                      ]}
                      onPress={() => setUnit("portions")}
                    >
                      <Text
                        style={[
                          styles.unitButtonText,
                          { color: unit === "portions" ? "#fff" : theme.tint },
                        ]}
                      >
                        portions
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>

              {/* Nutrition Preview */}
              {amount && Number(amount) > 0 && (
                <View
                  style={[
                    styles.nutritionPreview,
                    { borderTopColor: isDark ? "#333" : "#eee" },
                  ]}
                >
                  <Text style={[styles.previewTitle, { color: theme.text }]}>
                    Nutrition Preview:
                  </Text>
                  <View style={styles.previewGrid}>
                    <View style={styles.previewItem}>
                      <Text
                        style={[styles.previewLabel, { color: theme.text }]}
                      >
                        Calories
                      </Text>
                      <Text
                        style={[styles.previewValue, { color: theme.text }]}
                      >
                        {calculateNutritionPreview().calories.toFixed(0)} kcal
                      </Text>
                    </View>
                    <View style={styles.previewItem}>
                      <Text
                        style={[styles.previewLabel, { color: theme.text }]}
                      >
                        Protein
                      </Text>
                      <Text
                        style={[styles.previewValue, { color: theme.text }]}
                      >
                        {calculateNutritionPreview().protein.toFixed(1)}g
                      </Text>
                    </View>
                    <View style={styles.previewItem}>
                      <Text
                        style={[styles.previewLabel, { color: theme.text }]}
                      >
                        Carbs
                      </Text>
                      <Text
                        style={[styles.previewValue, { color: theme.text }]}
                      >
                        {calculateNutritionPreview().carbs.toFixed(1)}g
                      </Text>
                    </View>
                    <View style={styles.previewItem}>
                      <Text
                        style={[styles.previewLabel, { color: theme.text }]}
                      >
                        Fat
                      </Text>
                      <Text
                        style={[styles.previewValue, { color: theme.text }]}
                      >
                        {calculateNutritionPreview().fat.toFixed(1)}g
                      </Text>
                    </View>
                  </View>
                </View>
              )}

              {/* Add to Meal Button */}
              <TouchableOpacity
                style={[
                  styles.addButton,
                  { backgroundColor: theme.tint },
                  isAdding && { opacity: 0.6 },
                ]}
                onPress={handleAddToMeal}
                disabled={isAdding}
              >
                {isAdding ? (
                  <ActivityIndicator size="small" color="#fff" />
                ) : (
                  <>
                    <Ionicons
                      name="add-circle"
                      size={20}
                      color="#fff"
                      style={{ marginRight: 8 }}
                    />
                    <Text style={[styles.addButtonText, { color: "#fff" }]}>
                      Add {amount}
                      {unit === "grams" ? "g" : " portions"} to{" "}
                      {mealType?.toLowerCase() || "meal"}
                    </Text>
                  </>
                )}
              </TouchableOpacity>
            </View>
          </>
        )}
      </ScrollView>
      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={["25%", "50%"]}
        android_keyboardInputMode="adjustResize"
        enablePanDownToClose={false}
        index={0}
        handleIndicatorStyle={{ backgroundColor: theme.text }}
        backgroundStyle={{ backgroundColor: theme.background }}
      >
        <BottomSheetView style={styles.bottomSheetContent}>
          {/* Header */}
          <View style={styles.bottomSheetHeader}>
            <Text style={[styles.bottomSheetTitle, { color: theme.text }]}>
              Add to {mealType?.toLowerCase() || "meal"}
            </Text>
          </View>

          {/* Amount Input */}
          <View style={styles.bottomSheetRow}>
            <Text style={[styles.bottomSheetLabel, { color: theme.text }]}>
              Amount:
            </Text>
            <BottomSheetTextInput
              style={[
                styles.bottomSheetInput,
                {
                  borderColor: isDark ? "#444" : "#ddd",
                  backgroundColor: isDark ? "#2a2a2a" : "#f8f8f8",
                  color: theme.text,
                },
              ]}
              value={amount}
              onChangeText={setAmount}
              keyboardType="numeric"
              placeholder="100"
              placeholderTextColor={isDark ? "#666" : "#999"}
            />
          </View>

          {/* Unit Toggle */}
          <View style={styles.bottomSheetRow}>
            <Text style={[styles.bottomSheetLabel, { color: theme.text }]}>
              Unit:
            </Text>
            <View style={styles.unitToggleBottomSheet}>
              <TouchableOpacity
                style={[
                  styles.unitButtonBottomSheet,
                  {
                    backgroundColor:
                      unit === "grams" ? theme.tint : "transparent",
                    borderColor: theme.tint,
                  },
                ]}
                onPress={() => setUnit("grams")}
              >
                <Text
                  style={[
                    styles.unitButtonText,
                    { color: unit === "grams" ? "#505050ff" : theme.tint },
                  ]}
                >
                  Grams
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.unitButtonBottomSheet,
                  {
                    backgroundColor:
                      unit === "portions" ? theme.tint : "transparent",
                    borderColor: theme.tint,
                  },
                ]}
                onPress={() => setUnit("portions")}
              >
                <Text
                  style={[
                    styles.unitButtonText,
                    { color: unit === "portions" ? "#505050ff" : theme.tint },
                  ]}
                >
                  Portions
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Nutrition Preview */}
          {amount && Number(amount) > 0 && (
            <View style={styles.nutritionPreviewBottomSheet}>
              <Text style={[styles.previewTitle, { color: theme.text }]}>
                You will add: {calculateNutritionPreview().calories.toFixed(0)}{" "}
                kcal
              </Text>
            </View>
          )}

          {/* Add Button */}
          <GymButtonFullWidth onPress={handleAddToMeal} disabled={isAdding}>
            {isAdding ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Text style={[styles.addButtonText, { color: "#fff" }]}>
                Add {amount}
                {unit === "grams" ? "g" : " portions"} to{" "}
                {mealType?.toLowerCase() || "meal"}
              </Text>
            )}
          </GymButtonFullWidth>
        </BottomSheetView>
      </BottomSheet>
    </GymView>
  );
}

function getScoreColor(grade: string): string {
  switch (grade.toLowerCase()) {
    case "a":
      return "#00AA00";
    case "b":
      return "#79B814";
    case "c":
      return "#FFCC00";
    case "d":
      return "#FF6600";
    case "e":
      return "#FF0000";
    default:
      return "#999999";
  }
}

const styles = StyleSheet.create({
  bottomSheetContent: {
    flex: 1,
    padding: 16,
  },
  bottomSheetHeader: {
    marginBottom: 20,
  },
  bottomSheetTitle: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  bottomSheetRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  bottomSheetLabel: {
    fontSize: 16,
    fontWeight: "600",
    width: 80,
  },
  bottomSheetInput: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    marginLeft: 12,
  },
  unitToggleBottomSheet: {
    flexDirection: "row",
    marginLeft: 12,
    borderRadius: 8,
    overflow: "hidden",
    flex: 1,
  },
  unitButtonBottomSheet: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderWidth: 1,
    alignItems: "center",
    marginLeft: -1,
  },
  nutritionPreviewBottomSheet: {
    backgroundColor: "rgba(0,0,0,0.05)",
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  backButton: {
    marginBottom: 16,
  },
  header: {
    marginBottom: 20,
    paddingBottom: 16,
  },
  scrollView: {
    flex: 1,
  },
  scoreCard: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  scoreTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  scoreBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  scoreText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 12,
  },
  section: {
    borderRadius: 12,
    marginBottom: 16,
    overflow: "hidden",
  },
  nutrientRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
  },
  nutrientLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  nutrientIcon: {
    marginRight: 12,
  },
  nutrientLabel: {
    fontSize: 14,
    flex: 1,
  },
  nutrientValue: {
    fontSize: 14,
    fontWeight: "600",
  },
  ingredientsContainer: {
    padding: 16,
    borderTopWidth: 1,
  },
  ingredientsTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  ingredientsText: {
    fontSize: 14,
    lineHeight: 20,
    opacity: 0.8,
  },
  // Quantity Selection Styles
  amountContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  amountLabel: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 12,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  amountInput: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
  },
  unitToggle: {
    flexDirection: "row",
    borderRadius: 8,
    overflow: "hidden",
  },
  unitButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderWidth: 1,
    marginLeft: -1,
  },
  unitButtonText: {
    fontSize: 14,
    fontWeight: "600",
  },
  nutritionPreview: {
    padding: 16,
    borderTopWidth: 1,
  },
  previewTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 12,
  },
  previewGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  previewItem: {
    alignItems: "center",
    flex: 1,
  },
  previewLabel: {
    fontSize: 12,
    opacity: 0.7,
    marginBottom: 4,
  },
  previewValue: {
    fontSize: 14,
    fontWeight: "600",
  },
  addButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    borderRadius: 12,
    margin: 16,
  },
  addButtonText: {
    fontSize: 16,
    fontWeight: "600",
  },
});
