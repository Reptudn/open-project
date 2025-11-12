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
  BottomSheetFooterContainer,
  BottomSheetScrollView,
  BottomSheetTextInput,
} from "@gorhom/bottom-sheet";
import { getMealsByType } from "@/lib/api/daily/food_tracking";
import MealEntry from "@/components/calorie-tracking/MealEntry";
import { MealType, Product } from "@/types/FoodData.d";
import { FoodsTableEntry } from "@/types/Meals.d";
import { GymButtonFullWidth } from "@/components/ui/Button";
import { GymHeader, GymTitle } from "@/components/ui/Text";
import { ScrollView } from "react-native-gesture-handler";
import { SemiCircleChart } from "@tubinex/react-native-charts";

function AddMeal({ visible }: { visible: boolean }) {
  const theme = getThemeColor(useColorScheme());
  const insets = useSafeAreaInsets();
  const [showScanner, setShowScanner] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [products, setProducts] = useState<Product[]>([]);

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
    >
      <View
        style={[
          styles.searchContainer,
          {
            backgroundColor: theme.background,
          },
        ]}
      >
        <View
          style={[
            styles.searchInputContainer,
            {
              backgroundColor: theme.button,
            },
          ]}
        >
          <BottomSheetTextInput
            placeholder="Search food or enter barcode"
            placeholderTextColor={theme.text}
            value={searchText}
            onChangeText={setSearchText}
            style={[
              styles.searchInput,
              {
                color: theme.text,
              },
            ]}
            onSubmitEditing={async () => {
              if (!searchText.trim()) {
                setProducts([]);
                return;
              }
              try {
                const result = await searchFood(searchText);
                setProducts(result || []);
              } catch (error) {
                console.error("Search failed:", error);
                setProducts([]);
              }
            }}
          />
          <TouchableOpacity onPress={openScanner} style={styles.barcodeButton}>
            <Ionicons name="barcode-outline" size={24} color={theme.text} />
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
      >
        {products.length > 0 ? (
          products.map((prod) => {
            return (
              <ProductItem
                key={prod.code}
                product={prod}
                date={new Date()}
                mealType={MealType.BREAKFAST}
              />
            ); // pass actual date later
          })
        ) : (
          <View
            style={[
              styles.header,
              {
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: 500,
              },
            ]}
          >
            <GymTitle style={{ color: theme.text, marginTop: 8 }}>
              Search for products
            </GymTitle>
            <GymHeader style={{ color: theme.text }}>
              by name or barcode
            </GymHeader>
            <Ionicons
              name="search-outline"
              size={64}
              color={theme.text}
              style={{ alignSelf: "center", marginTop: 20 }}
            />
          </View>
        )}
      </BottomSheetScrollView>
      <BottomSheetFooterContainer
        footerComponent={() => (
          <GymButtonFullWidth
            onPress={() => {
              sheetRef.current?.collapse();
            }}
          >
            <Text style={{ color: theme.text }}>Close</Text>
          </GymButtonFullWidth>
        )}
      />
    </BottomSheet>
  );
}

export default function Meal() {
  const theme = getThemeColor(useColorScheme());
  const { mealType, openSearch } = useLocalSearchParams();

  const [addedMeals, setAddedMeals] = useState<FoodsTableEntry[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const mealTypeEnum = useMemo(() => {
    switch (mealType) {
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
  }, [mealType]);

  const fetchMeals = useCallback(async () => {
    let meals: FoodsTableEntry[] = [];
    try {
      meals = await getMealsByType(
        mealTypeEnum,
        new Date().toISOString().split("T")[0]
      ); // replace with the actual date of that day later
    } catch (error) {
      console.error("Failed to fetch added meals:", error);
      meals = [];
    }
    setAddedMeals(meals);
  }, [mealTypeEnum]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchMeals();
    setRefreshing(false);
  }, [fetchMeals]);

  useEffect(() => {
    fetchMeals();
  }, [fetchMeals]);

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
            addedMeals.map((meal, index) => <MealEntry key={index} {...meal} />)
          )}
        </ScrollView>
      </SafeAreaView>
      <AddMeal visible={openSearch === "true"} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
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
    // padding: 16,
    paddingBottom: 8,
    borderTopWidth: 1,
    borderTopColor: "#00000010",
    width: "100%",
  },
  searchInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 12,
    paddingRight: 12,
    justifyContent: "flex-end",
  },
  searchInput: {
    flex: 1,
    padding: 16,
    fontSize: 16,
  },
  barcodeButton: {
    padding: 8,
  },
});
