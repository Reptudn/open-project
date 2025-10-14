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

export default function CalorieTrackerScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const [showScanner, setShowScanner] = useState(false);
  const [searchText, setSearchText] = useState("");

  const [products, setProducts] = useState<Product[] | null>(null);

  const handleBarcodeScanned = async (barcode: string) => {
    console.log("Barcode scanned:", barcode);
    setSearchText(barcode);
    setShowScanner(false);

    const product = await getFoodDataByBarcode(barcode);
    setProducts(product ? [product] : []);
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
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ padding: 10 }}>
        {products ? (
          products.map((product) => (
            <Text
              key={product.code}
              style={{
                color: isDark ? ThemeColors.dark.text : ThemeColors.light.text,
                fontSize: 18,
                fontWeight: "bold",
                margin: 10,
                borderBottomColor: isDark ? "#444" : "#ddd",
                borderBottomWidth: 1,
                paddingBottom: 10,
              }}
            >
              Name: {product.product_name || "Unknown Product"}
              {"\n"}
              Brand: {product.brands || "Unknown Brand"}
              {"\n"}
              Quantity: {product.quantity || "Unknown Quantity"}
              {"\n"}
              Nutri-Score: {product.nutriscore_grade || "N/A"}
              {"\n"}
              Calories per 100g:{" "}
              {product.nutriments?.["energy-kcal_100g"] || "N/A"}kcal
              {"\n"}
              Categories:{" "}
              {product.categories_tags?.join(", ") || "Unknown Category"}
            </Text>
          ))
        ) : (
          <Text
            style={{
              color: isDark ? ThemeColors.dark.text : ThemeColors.light.text,
              fontSize: 18,
              fontWeight: "bold",
              margin: 10,
            }}
          >
            No products found
          </Text>
        )}
      </ScrollView>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
        >
          <KeyboardAvoidingView
            style={{
              flex: 1,
              padding: 20,
              justifyContent: "flex-end",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                backgroundColor: isDark
                  ? ThemeColors.dark.button
                  : ThemeColors.light.button,
                borderRadius: 10,
                paddingRight: 15,
              }}
            >
              <TextInput
                placeholder="Search food or enter barcode"
                value={searchText}
                onChangeText={setSearchText}
                style={{
                  flex: 1,
                  padding: 15,
                  color: isDark
                    ? ThemeColors.dark.text
                    : ThemeColors.light.text,
                }}
                onSubmitEditing={async () => {
                  if (!searchText.trim()) {
                    setProducts(null);
                    return;
                  }
                  // do loading on
                  setProducts(await searchFood(searchText));
                  // do loading off
                }}
              />
              <TouchableOpacity onPress={openScanner}>
                <Ionicons
                  name="barcode-outline"
                  size={24}
                  color={
                    isDark ? ThemeColors.dark.text : ThemeColors.light.text
                  }
                />
              </TouchableOpacity>
            </View>

            <BarcodeScanner
              isVisible={showScanner}
              onClose={() => setShowScanner(false)}
              onBarcodeScanned={handleBarcodeScanned}
            />
          </KeyboardAvoidingView>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
