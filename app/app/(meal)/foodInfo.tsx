import GymView from "@/components/ui/GymView";
import { GymText, GymTitle } from "@/components/ui/Text";
import { getThemeColor } from "@/constants/theme";
import { MealType } from "@/types/FoodData.d";
import { FoodsTableEntry } from "@/types/Meals.d";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router, useLocalSearchParams } from "expo-router";
import {
  TouchableOpacity,
  useColorScheme,
  View,
  Text,
  StyleSheet,
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
import DropDownPicker from "react-native-dropdown-picker";
import { GymBr } from "@/components/ui/Br";

export default function FoodInfo() {
  const theme = getThemeColor(useColorScheme());
  const isDark = useColorScheme() === "dark";
  const { product, mealType, date, edit } = useLocalSearchParams<{
    product?: string;
    mealType?: string;
    date?: string;
    edit?: "true" | "false";
  }>();

  const [amount, setAmount] = useState("100");
  const [unit, setUnit] = useState<"grams" | "portions">("grams");
  const [isAdding, setIsAdding] = useState(false);

  const isEditMode = edit && edit === "true";

  // unit dropdown picker
  const [unitItems, setUnitItems] = useState([
    { label: "Portions", value: "portions" },
    { label: "Grams", value: "grams" },
  ]);
  const [openDropdownPicker, setOpenDropdownPicker] = useState(false);

  const bottomSheetRef = useRef<BottomSheet>(null);

  let nutriments: any;

  const prod = JSON.parse(product as string) as FoodsTableEntry;
  nutriments = prod.barcode_id.nutriments;

  // Helper functions to safely access properties
  const getProductName = () => {
    return prod.barcode_id.name || "Unknown Product";
  };

  const getBrands = () => {
    return prod.barcode_id.brand || "N/A";
  };

  const getQuantity = () => {
    return null;
  };

  const getNutriScore = () => {
    return null;
  };

  const getNovaGroup = () => {
    return null;
  };

  const getCategories = () => {
    return prod.barcode_id.categories?.join(", ");
  };

  const getIngredients = () => {
    return null;
  };

  const getProductCode = () => {
    return prod.barcode_id.barcode;
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
              <Text style={styles.scoreText}>{getNutriScore()!}</Text>
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
                {getCategories()}
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
      </ScrollView>
      {!isEditMode ? (
        <BottomSheet
          ref={bottomSheetRef}
          snapPoints={["13%", "27%"]}
          android_keyboardInputMode="adjustResize"
          enablePanDownToClose={false}
          index={0}
          handleIndicatorStyle={{ backgroundColor: theme.text }}
          backgroundStyle={{ backgroundColor: theme.background }}
        >
          {/* Add Button */}
          <BottomSheetView style={styles.bottomSheetContent}>
            <GymButtonFullWidth onPress={handleAddToMeal} disabled={isAdding}>
              {isAdding ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                <GymText>
                  Add {amount}
                  {unit === "grams" ? "g" : " portions"} to{" "}
                  {mealType?.toLowerCase() || "meal"}
                </GymText>
              )}
            </GymButtonFullWidth>
            {/* Amount Input */}
            <GymBr />
            <View style={styles.bottomSheetRow}>
              <View style={styles.inputRow}>
                <BottomSheetTextInput
                  style={{
                    borderColor: isDark ? "#444" : "#ddd",
                    backgroundColor: isDark ? "#2a2a2a" : "#f8f8f8",
                    color: theme.text,
                  }}
                  value={amount}
                  onChangeText={setAmount}
                  keyboardType="numeric"
                  placeholder="100"
                  placeholderTextColor={isDark ? "#666" : "#999"}
                />
                <DropDownPicker
                  open={openDropdownPicker}
                  value={unit}
                  items={unitItems}
                  setOpen={setOpenDropdownPicker}
                  setValue={setUnit}
                  setItems={setUnitItems}
                  style={{
                    borderColor: isDark ? "#444" : "#ddd",
                    backgroundColor: isDark ? "#2a2a2a" : "#f8f8f8",
                  }}
                  textStyle={{ color: theme.text }}
                  dropDownContainerStyle={{
                    borderColor: isDark ? "#444" : "#ddd",
                    backgroundColor: isDark ? "#2a2a2a" : "#f8f8f8",
                  }}
                />
              </View>
            </View>

            {/* Nutrition Preview */}
            {amount && Number(amount) > 0 && (
              <GymText
                style={{ marginTop: 8, textAlign: "center", color: theme.text }}
              >
                You will add: {calculateNutritionPreview().calories.toFixed(0)}{" "}
                kcal
              </GymText>
            )}
          </BottomSheetView>
        </BottomSheet>
      ) : (
        <BottomSheetView style={{ height: 16 }}>
          {/* In edit mode */}
          <BottomSheetTextInput value="100" />
          <GymButtonFullWidth
            onPress={() => {
              router.back();
            }}
            disabled={isAdding}
          >
            {isAdding ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <GymText>
                Update {amount}
                {unit === "grams" ? "g" : " portions"} to{" "}
                {mealType?.toLowerCase() || "meal"}
              </GymText>
            )}
          </GymButtonFullWidth>
        </BottomSheetView>
      )}
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
    flexDirection: "column",
    marginBottom: 20,
  },
  bottomSheetLabel: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 12,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  bottomSheetInput: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    width: 500,
  },
  dropdownPicker: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 8,
    minHeight: 40,
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
