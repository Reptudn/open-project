import {
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
  View,
  Text,
  ScrollView,
} from "react-native";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemeColors } from "@/constants/theme";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useState } from "react";
import BarcodeScanner from "@/components/calorie-tracking/BarcodeScanner";
import { getFoodDataByBarcode, searchFood } from "@/lib/api/calories_tracking";
import { Product } from "@/types/FoodData";
import ProductItem from "@/components/calorie-tracking/ProductItem";

export default function CalorieTrackerScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const [showScanner, setShowScanner] = useState(false);
  const [searchText, setSearchText] = useState("");

  const [products, setProducts] = useState<Product[]>([]);

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

  return (
    <SafeAreaView
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
          <ScrollView
            style={styles.contentContainer}
            contentContainerStyle={styles.scrollContent}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
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
                    ? "No products found"
                    : "Search for food products or scan a barcode"}
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
                  isDark
                    ? ThemeColors.dark.text + "80"
                    : ThemeColors.light.text + "80"
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  },
  searchInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 12,
    paddingRight: 12,
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
