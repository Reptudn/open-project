import BarcodeScanner from "@/components/calorie-tracking/BarcodeScanner";
import ProductItem from "@/components/calorie-tracking/ProductItem";
import { getThemeColor } from "@/constants/theme";
import { getFoodDataByBarcode, searchFood } from "@/lib/api/daily/food_data";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useLocalSearchParams, router } from "expo-router";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  StyleSheet,
  useColorScheme,
  View,
  TouchableOpacity,
  Text,
  SafeAreaView,
  RefreshControl,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import BottomSheet, {
  BottomSheetScrollView,
  BottomSheetTextInput,
} from "@gorhom/bottom-sheet";
import { getMealsByType } from "@/lib/api/daily/food_tracking";
import MealEntry from "@/components/calorie-tracking/MealEntry";
import { MealType, Product } from "@/types/FoodData.d";
import { DBProduct, FoodsTableEntry } from "@/types/Meals.d";

import { GymHeader, GymTitle } from "@/components/ui/Text";
import { ScrollView } from "react-native-gesture-handler";
import { SemiCircleChart } from "@tubinex/react-native-charts";

function AddMeal({
  visible,
  mealType,
  date,
  onRefresh,
}: {
  visible: boolean;
  mealType: MealType;
  date: Date;
  onRefresh: () => Promise<void>;
}) {
  const theme = getThemeColor(useColorScheme());
  const insets = useSafeAreaInsets();
  const [showScanner, setShowScanner] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [products, setProducts] = useState<DBProduct[]>([]);

  const openScanner = () => {
    setShowScanner(true);
  };

  const sheetRef = useRef<BottomSheet>(null);
  const handleSheetChange = useCallback((index: number) => {
    console.log("handleSheetChange", index);
  }, []);

  const snapPoints = useMemo(() => ["13%", "100%"], []);

  const handleBarcodeScanned = async (barcode: string) => {
    console.log("Barcode scanned:", barcode);
    setSearchText(barcode);
    setShowScanner(false);

    try {
      const result = await getFoodDataByBarcode(barcode);
      if (result) {
        setProducts([result]);
      } else {
        setProducts([]);
      }
    } catch (error) {
      console.error("Barcode scan failed:", error);
    }
  };

  return (
    <BottomSheet
      ref={sheetRef}
      index={visible ? 1 : 0}
      snapPoints={snapPoints}
      enableDynamicSizing={false}
      onChange={handleSheetChange}
      topInset={insets.top}
      android_keyboardInputMode="adjustResize"
      handleIndicatorStyle={{ backgroundColor: theme.text }}
      backgroundStyle={{ backgroundColor: theme.background }}
      enablePanDownToClose={false}
      enableHandlePanningGesture={true}
      enableContentPanningGesture={false}
    >
      {/* Enhanced Search Container */}
      <View
        style={[styles.searchContainer, { backgroundColor: theme.background }]}
      >
        <View
          style={[
            styles.searchInputContainer,
            { backgroundColor: theme.button },
          ]}
        >
          <Ionicons
            name="search"
            size={18}
            color={theme.text}
            style={{ marginLeft: 12, opacity: 0.6 }}
          />
          <BottomSheetTextInput
            placeholder="Search food or enter barcode..."
            placeholderTextColor={`${theme.text}80`}
            value={searchText}
            onChangeText={setSearchText}
            style={[styles.searchInput, { color: theme.text }]}
            onSubmitEditing={async () => {
              if (!searchText.trim()) {
                setProducts([]);
                return;
              }
              try {
                // const result = await searchFood(searchText);
                // setProducts(result || []);
              } catch (error) {
                console.error("Search failed:", error);
                setProducts([]);
              }
            }}
          />
          <TouchableOpacity onPress={openScanner} style={styles.barcodeButton}>
            <Ionicons name="barcode-outline" size={20} color={theme.tint} />
          </TouchableOpacity>
        </View>
      </View>

      <BarcodeScanner
        isVisible={showScanner}
        onClose={() => setShowScanner(false)}
        onBarcodeScanned={handleBarcodeScanned}
      />

      <BottomSheetScrollView
        contentContainerStyle={[
          {
            paddingBottom: insets.bottom + 20,
            backgroundColor: theme.background,
          },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {products.length > 0 ? (
          <View style={styles.resultsContainer}>
            <Text style={[styles.resultsHeader, { color: theme.text }]}>
              Found {products.length} result{products.length !== 1 ? "s" : ""}
            </Text>
            {products.map((prod) => {
              return (
                <ProductItem
                  key={prod.barcode}
                  product={prod}
                  date={date}
                  mealType={mealType}
                  onAdd={async (success: boolean) => {
                    if (!success) return;
                    sheetRef.current?.close();
                    await onRefresh();
                  }}
                />
              );
            })}
          </View>
        ) : searchText.trim() ? (
          // No results for search
          <View style={styles.emptyStateContainer}>
            <View
              style={[
                styles.emptyStateIcon,
                { backgroundColor: `${theme.tint}20` },
              ]}
            >
              <Ionicons name="search" size={32} color={theme.tint} />
            </View>
            <Text style={[styles.emptyStateTitle, { color: theme.text }]}>
              No results found
            </Text>
            <Text style={[styles.emptyStateText, { color: theme.text }]}>
              Try searching for &ldquo;{searchText}&rdquo; with different
              keywords or scan a barcode
            </Text>
            <TouchableOpacity
              style={[styles.scanButton, { backgroundColor: theme.tint }]}
              onPress={openScanner}
            >
              <Ionicons name="barcode-outline" size={18} color="#fff" />
              <Text style={styles.scanButtonText}>Scan Barcode</Text>
            </TouchableOpacity>
          </View>
        ) : (
          // Initial empty state
          <View style={styles.emptyStateContainer}>
            <View
              style={[
                styles.emptyStateIcon,
                { backgroundColor: `${theme.tint}15` },
              ]}
            >
              <Ionicons name="restaurant" size={32} color={theme.tint} />
            </View>
            <Text style={[styles.emptyStateTitle, { color: theme.text }]}>
              Find Your Food
            </Text>
            <Text style={[styles.emptyStateText, { color: theme.text }]}>
              Search by name or scan a barcode to add food to your{" "}
              {mealType?.toLowerCase()} meal
            </Text>

            <View style={styles.quickActions}>
              <TouchableOpacity
                style={[
                  styles.quickActionButton,
                  { backgroundColor: theme.tint },
                ]}
                onPress={openScanner}
              >
                <Ionicons name="barcode-outline" size={18} color="#fff" />
                <Text style={styles.quickActionText}>Scan Barcode</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.quickActionButton,
                  {
                    backgroundColor: "transparent",
                    borderColor: theme.tint,
                    borderWidth: 1,
                  },
                ]}
                onPress={() => {
                  // You can add popular foods functionality here
                }}
              >
                <Ionicons name="star-outline" size={18} color={theme.tint} />
                <Text style={[styles.quickActionText, { color: theme.tint }]}>
                  Popular Foods
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </BottomSheetScrollView>
    </BottomSheet>
  );
}

export default function Meal() {
  const theme = getThemeColor(useColorScheme());
  const { mealType, openSearch, date } = useLocalSearchParams<{
    mealType?: string;
    openSearch?: string;
    date?: string;
  }>();

  const [addedMeals, setAddedMeals] = useState<FoodsTableEntry[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const actualDate = useMemo(() => {
    if (date) {
      return new Date(date);
    }
    return new Date();
  }, [date]);

  const mealTypeEnum = useMemo(() => {
    switch (mealType) {
      case "Breakfast":
      case "breakfast":
      case "BREAKFAST":
        return MealType.BREAKFAST;
      case "Lunch":
      case "lunch":
      case "LUNCH":
        return MealType.LUNCH;
      case "Dinner":
      case "dinner":
      case "DINNER":
        return MealType.DINNER;
      default:
        return MealType.SNACK;
    }
  }, [mealType]);

  const fetchMeals = useCallback(async () => {
    let meals: FoodsTableEntry[] = [];
    try {
      meals = await getMealsByType(mealTypeEnum, actualDate);
    } catch (error) {
      console.error("Failed to fetch added meals:", error);
      meals = [];
    }
    setAddedMeals(meals);
  }, [mealTypeEnum, actualDate]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchMeals();
    setRefreshing(false);
  }, [fetchMeals]);

  useEffect(() => {
    fetchMeals();
  }, [fetchMeals, mealTypeEnum, actualDate]);

  return (
    <View style={{ flex: 1, backgroundColor: theme.background }}>
      <SafeAreaView
        style={{
          backgroundColor: theme.background,
          flex: 1,
        }}
      >
        <View
          style={{ flexDirection: "row", alignItems: "center", padding: 16 }}
        >
          <TouchableOpacity
            onPress={() => router.back()}
            style={{ marginRight: 12 }}
          >
            <Ionicons name="arrow-back" size={24} color={theme.text} />
          </TouchableOpacity>
          <GymTitle style={{ color: theme.text }}>{mealType}</GymTitle>
        </View>
        <SemiCircleChart
          segments={addedMeals.map((meal) => ({
            value: meal.barcode_id.nutriments?.["energy-kcal_100g"] || 0,
            color:
              meal.barcode_id.nutriments?.["energy-kcal_100g"]! > 500
                ? "#FF5C5C"
                : meal.barcode_id.nutriments?.["energy-kcal_100g"]! > 300
                  ? "#FFB800"
                  : "#7ED957",
            label: meal.barcode_id.name,
          }))}
          size={250}
          strokeWidth={30}
          segmentGap={2}
          centerContent={
            <View style={{ alignItems: "center" }}>
              <GymHeader style={{ fontSize: 14, color: theme.text }}>
                Total Calories (kcal)
              </GymHeader>
              <GymTitle
                style={{ fontSize: 36, fontWeight: "700", color: theme.tint }}
              >
                {addedMeals.reduce(
                  (total, meal) =>
                    total +
                    (meal.barcode_id.nutriments?.["energy-kcal_100g"] || 0),
                  0
                )}
              </GymTitle>
            </View>
          }
          contentAlignment="flex-end"
        />
        <ScrollView
          style={{ flex: 1, gap: 12 }}
          contentContainerStyle={{ flexGrow: 1, gap: 12 }}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor={theme.text}
              colors={[theme.text]}
            />
          }
        >
          {addedMeals.length === 0 ? (
            <GymHeader style={{ color: theme.text, paddingHorizontal: 16 }}>
              No meals added yet.
            </GymHeader>
          ) : (
            addedMeals.map((meal, index) => (
              <MealEntry key={index} entry={meal} mealType={mealTypeEnum} />
            ))
          )}
        </ScrollView>
      </SafeAreaView>
      <AddMeal
        visible={openSearch === "true"}
        mealType={mealTypeEnum}
        date={actualDate}
        onRefresh={onRefresh}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
  },
  sheetHeader: {
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0, 0, 0, 0.1)",
    paddingBottom: 12,
  },
  headerContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  headerTitleSection: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
  },
  closeButton: {
    padding: 8,
    borderRadius: 16,
    backgroundColor: "rgba(0, 0, 0, 0.05)",
  },
  header: {
    alignItems: "center",
    padding: 16,
  },
  dateText: {
    fontSize: 16,
    fontWeight: "bold",
    justifyContent: "flex-start",
    textAlign: "center",
  },
  contentContainer: {
    flexGrow: 1,
    padding: 16,
  },
  searchContainer: {
    padding: 16,
    paddingBottom: 12,
  },
  searchInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 12,
    paddingRight: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  searchInput: {
    flex: 1,
    padding: 14,
    fontSize: 16,
  },
  barcodeButton: {
    padding: 10,
    marginLeft: 8,
    borderRadius: 8,
    backgroundColor: "rgba(0, 0, 0, 0.05)",
  },
  resultsContainer: {
    paddingHorizontal: 8,
  },
  resultsHeader: {
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 12,
    marginLeft: 8,
    opacity: 0.8,
  },
  emptyStateContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 32,
    paddingVertical: 48,
    minHeight: 400,
  },
  emptyStateIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
  },
  emptyStateTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 12,
    textAlign: "center",
  },
  emptyStateText: {
    fontSize: 16,
    textAlign: "center",
    opacity: 0.7,
    lineHeight: 24,
    marginBottom: 32,
  },
  scanButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    gap: 8,
  },
  scanButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  quickActions: {
    flexDirection: "row",
    gap: 12,
    marginTop: 8,
  },
  quickActionButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    gap: 6,
  },
  quickActionText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#fff",
  },
});
