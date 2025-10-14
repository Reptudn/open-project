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
import { getFoodDataByBarcode } from "@/lib/api/calories";
import { Product } from "@/types/FoodData";

export default function CalorieTrackerScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const [showScanner, setShowScanner] = useState(false);
  const [searchText, setSearchText] = useState("");

  const [products, setProducts] = useState<Product | null>(null);

  const handleBarcodeScanned = async (barcode: string) => {
    console.log("Barcode scanned:", barcode);
    setSearchText(barcode);
    setShowScanner(false);

    setProducts(await getFoodDataByBarcode(barcode));
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
      <ScrollView>
        {products ? (
          <Text
            style={{
              color: isDark ? ThemeColors.dark.text : ThemeColors.light.text,
              fontSize: 18,
              fontWeight: "bold",
              margin: 10,
            }}
          >
            {products.product_name || "Unknown Product"}
          </Text>
        ) : (
          <Text>No products found</Text>
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
                onSubmitEditing={() => handleBarcodeScanned(searchText)}
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
