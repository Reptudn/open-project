import GymView from "@/components/ui/GymView";
import { GymText, GymTitle } from "@/components/ui/Text";
import { getThemeColor } from "@/constants/theme";
import { Product } from "@/types/FoodData";
import { FoodsTableEntry } from "@/types/Meals";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router, useLocalSearchParams } from "expo-router";
import {
  TouchableOpacity,
  useColorScheme,
  View,
  Text,
  StyleSheet,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";

export default function FoodInfo() {
  const theme = getThemeColor(useColorScheme());
  const isDark = useColorScheme() === "dark";
  const { product } = useLocalSearchParams<{
    product: string;
  }>();

  const prod = JSON.parse(product as string) as Product;
  const nutriments = prod.nutriments;

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
          {prod.product_name || prod.generic_name || "Unknown Product"}
        </GymTitle>
        <GymText style={{ color: theme.text, opacity: 0.7 }}>
          {prod.brands || "N/A"}
        </GymText>
        {prod.quantity && (
          <GymText style={{ color: theme.text, opacity: 0.6 }}>
            Quantity: {prod.quantity}
          </GymText>
        )}
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* Nutrition Score */}
        {prod.nutriscore_grade && (
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
                { backgroundColor: getScoreColor(prod.nutriscore_grade) },
              ]}
            >
              <Text style={styles.scoreText}>
                {prod.nutriscore_grade.toUpperCase()}
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
          {prod.nova_group && (
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
                {prod.nova_group}
              </Text>
            </View>
          )}

          {prod.categories && (
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
                {prod.categories.split(",").slice(0, 3).join(", ")}
              </Text>
            </View>
          )}

          {prod.ingredients_text && (
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
                {prod.ingredients_text}
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
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
});
