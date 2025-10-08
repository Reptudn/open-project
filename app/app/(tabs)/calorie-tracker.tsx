import React, { useState } from "react";
import { StyleSheet, Text, TextInput, View, Button, ScrollView } from "react-native";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemeColors } from "@/constants/theme";

export default function CalorieTrackerScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  const [barcode, setBarcode] = useState("");
  const [gramm, setGramm] = useState("100");
  const [productInfo, setProductInfo] = useState(null);
  const [error, setError] = useState("");

  const fetchProductInfo = async () => {
    setError("");
    setProductInfo(null);
    try {
      const response = await fetch(`https://world.openfoodfacts.org/api/v0/product/${barcode}.json`);
      const data = await response.json();
      if (data.status === 1) {
        setProductInfo(data.product);
      } else {
        setError("Produkt nicht gefunden.");
      }
    } catch (err) {
      setError("Fehler beim Abrufen der Daten.");
    }
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
      <ScrollView contentContainerStyle={styles.innerContainer}>
        <TextInput
          style={[
            styles.input,
            {
              backgroundColor: isDark ? "#333" : "#fff",
              color: isDark ? "#fff" : "#000",
              borderColor: isDark ? "#555" : "#ccc",
            },
          ]}
          placeholder="Barcode eingeben"
          placeholderTextColor={isDark ? "#aaa" : "#888"}
          value={barcode}
          onChangeText={setBarcode}
          keyboardType="numeric"
        />
        <Button title="Produkt suchen" onPress={fetchProductInfo} />
        <TextInput
          style={[
            styles.input,
            {
              backgroundColor: isDark ? "#333" : "#fff",
              color: isDark ? "#fff" : "#000",
              borderColor: isDark ? "#555" : "#ccc",
            },
          ]}
          placeholder="Grammzahl eingeben"
          placeholderTextColor={isDark ? "#aaa" : "#888"}
          value={gramm}
          onChangeText={setGramm}
          keyboardType="numeric"
        />
        {error ? <Text style={styles.error}>{error}</Text> : null}
        {productInfo && (
          <View style={styles.productInfo}>
            <Text style={styles.productName}>{productInfo.product_name}</Text>
            <Text>
              Kalorien (pro {gramm}g): {productInfo.nutriments.energy_value ? (productInfo.nutriments.energy_value / 100 * (parseFloat(gramm) || 0)) : "Keine Daten"}
            </Text>
            <Text>
              Proteine (pro {gramm}g): {productInfo.nutriments.proteins_100g ? (productInfo.nutriments.proteins_100g / 100 * (parseFloat(gramm) || 0)).toFixed(1) : "Keine Daten"}
            </Text>
            <Text>
              Fette (pro {gramm}g): {productInfo.nutriments.fat_100g ? (productInfo.nutriments.fat_100g / 100 * (parseFloat(gramm) || 0)).toFixed(1) : "Keine Daten"}
            </Text>
            <Text>
              Kohlenhydrate (pro {gramm}g): {productInfo.nutriments.carbohydrates_100g ? (productInfo.nutriments.carbohydrates_100g / 100 * (parseFloat(gramm) || 0)).toFixed(1) : "Keine Daten"}
            </Text>
            {/* <Text>
              Nährwerte:{" "}
              {productInfo.nutriments
                ? JSON.stringify(productInfo.nutriments, null, 2)
                : "Keine Daten"}
            </Text> */}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    flexGrow: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 8,
    marginBottom: 16,
  },
  error: {
    color: "red",
    marginTop: 8,
  },
  productInfo: {
    marginTop: 16,
    padding: 16,
    backgroundColor: "#fff",
    borderRadius: 4,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  productName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
});