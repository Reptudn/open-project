import { ThemeColors } from "@/constants/theme";
import {
  getFoodDataByBarcode,
  searchFood,
} from "@/lib/api/calorie_tracking/calories_tracking";
import Ionicons from "@expo/vector-icons/Ionicons";
import {
  View,
  Text,
  StyleSheet,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  useColorScheme,
} from "react-native";
import BarcodeScanner from "./BarcodeScanner";
import ProductItem from "./ProductItem";
import { Product } from "@/types/FoodData";
import { useState, useEffect } from "react";
import DayNutritionOverview from "./DayNutritionOverview";
import Meals from "./Meal";
import WeightEntry from "./WeightEntry";
import { getDayData } from "@/lib/api/daily/daily";

export default function DayItem({
  date,
  currDate,
  isSelected = false,
  pageIndex,
  goToToday,
  goToDayOffset,
}: {
  date: Date;
  currDate: Date;
  isSelected?: boolean;
  pageIndex?: number;
  goToToday: () => void;
  goToDayOffset: (offset: number) => void;
}) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const [showScanner, setShowScanner] = useState(false);
  const [searchText, setSearchText] = useState("");

  const [products, setProducts] = useState<Product[]>([]);
  const [dayData, setDayData] = useState({});

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
      setProducts([]);
    }
  };

  const openScanner = () => {
    setShowScanner(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await getDayData(date);
      setDayData(data);
    };
    fetchData();

    if (isSelected) {
      // load some data here
    } else {
      // unload stuff here
    }
  }, [isSelected, pageIndex, date]);

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: isDark
            ? ThemeColors.dark.background
            : ThemeColors.light.background,
        },
      ]}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          style={styles.container}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
        >
          <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
            <TouchableOpacity onPress={() => goToDayOffset(-1)}>
              <Ionicons
                name="chevron-back-outline"
                size={28}
                color={isDark ? ThemeColors.dark.text : ThemeColors.light.text}
              />
            </TouchableOpacity>
            <Text
              style={[
                styles.dateText,
                {
                  color: isDark
                    ? ThemeColors.dark.text
                    : ThemeColors.light.text,
                  fontWeight: "bold",
                  fontSize: 18,
                },
              ]}
            >
              {date.getDate() === currDate.getDate()
                ? "Today"
                : date.getDate() === currDate.getDate() - 1
                  ? "Yesterday"
                  : date.getDate() === currDate.getDate() + 1
                    ? "Tomorrow"
                    : date.toDateString()}
            </Text>
            <TouchableOpacity onPress={() => goToDayOffset(1)}>
              <Ionicons
                name="chevron-forward-outline"
                size={28}
                color={isDark ? ThemeColors.dark.text : ThemeColors.light.text}
              />
            </TouchableOpacity>
          </View>
          {date.getDate() !== currDate.getDate() && (
            <TouchableOpacity
              onPress={goToToday}
              style={{
                marginBottom: 8,
                alignSelf: "center",
                backgroundColor: "#1b3bec10",
                borderWidth: 1,
                borderColor: "#4860e730",
                padding: 6,
                borderRadius: 6,
              }}
            >
              <Text
                style={{
                  color: isDark
                    ? ThemeColors.dark.text
                    : ThemeColors.light.text,
                  paddingTop: 5,
                }}
              >
                Go to Today
              </Text>
            </TouchableOpacity>
          )}
          <ScrollView
            style={styles.contentContainer}
            contentContainerStyle={styles.scrollContent}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            <DayNutritionOverview eaten={631} burnt={200} toGo={1923} />
            <Meals />
            <WeightEntry date={date} />
            {products && products.length > 0 ? (
              products.map((product) => (
                <ProductItem key={product.code} product={product} />
              ))
            ) : (
              <View style={styles.emptyState}>
                <Ionicons
                  name="search-outline"
                  size={48}
                  color={
                    isDark ? ThemeColors.dark.text : ThemeColors.light.text
                  }
                  style={{ opacity: 0.5 }}
                />
                <Text
                  style={[
                    styles.emptyText,
                    {
                      color: isDark
                        ? ThemeColors.dark.text
                        : ThemeColors.light.text,
                    },
                  ]}
                >
                  {searchText
                    ? "No products found or loading..."
                    : "Nothing added for that day!\nSearch for food products or scan a barcode."}
                </Text>
              </View>
            )}
          </ScrollView>

          <View
            style={[
              styles.searchContainer,
              {
                backgroundColor: isDark
                  ? ThemeColors.dark.background
                  : ThemeColors.light.background,
              },
            ]}
          >
            <View
              style={[
                styles.searchInputContainer,
                {
                  backgroundColor: isDark
                    ? ThemeColors.dark.button
                    : ThemeColors.light.button,
                },
              ]}
            >
              <TextInput
                placeholder="Search food or enter barcode"
                placeholderTextColor={
                  isDark ? ThemeColors.dark.text : ThemeColors.light.text
                }
                value={searchText}
                onChangeText={setSearchText}
                style={[
                  styles.searchInput,
                  {
                    color: isDark
                      ? ThemeColors.dark.text
                      : ThemeColors.light.text,
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
              <TouchableOpacity
                onPress={openScanner}
                style={styles.barcodeButton}
              >
                <Ionicons
                  name="barcode-outline"
                  size={24}
                  color={
                    isDark ? ThemeColors.dark.text : ThemeColors.light.text
                  }
                />
              </TouchableOpacity>
            </View>
          </View>

          <BarcodeScanner
            isVisible={showScanner}
            onClose={() => setShowScanner(false)}
            onBarcodeScanned={handleBarcodeScanned}
          />
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 1,
    width: "100%",
  },
  dateText: {
    fontSize: 16,
    fontWeight: "bold",
    justifyContent: "flex-start",
    textAlign: "center",
  },
  contentContainer: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 16,
    paddingBottom: 20,
  },
  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 16,
    textAlign: "center",
    marginTop: 16,
    opacity: 0.7,
  },
  searchContainer: {
    padding: 16,
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
