import React, { useState } from "react";
import { StyleSheet, Text, TextInput, View, Button, ScrollView } from "react-native";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemeColors } from "@/constants/theme";

interface Product {
  name: string,
}

export default function CalorieTrackerScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  const [barcode, setBarcode] = useState("");
  const [gramm, setGramm] = useState("100");
  const [productInfo, setProductInfo] = useState(null);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

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

  const saveProductToDatabase = async () => {
    if (!productInfo) {
      setError("Keine Produktinformationen verfügbar.");
      return;
    }

    const productData = {
      barcode: productInfo.code,
      name: productInfo.product_name,
      brand: productInfo.brands,
      nutriments: {
        energy: productInfo.nutriments.energy_value,
        proteins: productInfo.nutriments.proteins_100g,
        fat: productInfo.nutriments.fat_100g,
        carbohydrates: productInfo.nutriments.carbohydrates_100g,
      },
    };

    try {
      const response = await fetch("https://tegfwlejpnjfcyyppogf.supabase.co/functions/v1/food", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRlZ2Z3bGVqcG5qZmN5eXBwb2dmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk4ODAwNzcsImV4cCI6MjA3NTQ1NjA3N30.8irNDJq0x6sYUYusnyfWpj4puv59utsikJoOsdK3SwA`, // Ersetze mit deinem API-Schlüssel
        },
        body: JSON.stringify(productData),
      });

      if (response.ok) {
        setSuccessMessage("Produkt erfolgreich gespeichert!");
        setError("");
      } else {
        const errorData = await response.json();
        setError(`Fehler beim Speichern: ${errorData.message}`);
      }
    } catch (err) {
      setError("Netzwerkfehler beim Speichern des Produkts.");
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
              backgroundColor: isDark
                ? ThemeColors.dark.inputBackground
                : ThemeColors.light.inputBackground,
              color: isDark ? "#fff" : "#000", // Changed text color to white for dark mode
            },
          ]}
          placeholder="Barcode eingeben"
          value={barcode}
          onChangeText={setBarcode}
        />
        <Button title="Produkt suchen" onPress={fetchProductInfo} />
        <TextInput
          style={[
            styles.input,
            {
              backgroundColor: isDark ? "#333" : "#fff",
              color: isDark ? "#fff" : "#000", // Changed text color to white for dark mode
              borderColor: isDark ? "#555" : "#ccc",
            },
          ]}
          placeholder="Grammzahl eingeben"
          placeholderTextColor={isDark ? "#aaa" : "#888"}
          value={gramm}
          onChangeText={setGramm}
          keyboardType="numeric"
        />
        {error ? <Text style={[styles.error, { color: isDark ? "#fff" : "red" }]}>{error}</Text> : null}
        {successMessage ? <Text style={[styles.success, { color: isDark ? "#fff" : "green" }]}>{successMessage}</Text> : null}
        {productInfo && (
          <View style={styles.productInfo}>
            <Text style={[styles.productName, { color: isDark ? "#fff" : "#000" }]}>{productInfo.product_name} pro 100g</Text>
            <Text style={{ color: isDark ? "#fff" : "#000" }}>Marke: {productInfo.brands}</Text>
            <Text style={{ color: isDark ? "#fff" : "#000" }}>Kalorien: {productInfo.nutriments.energy_value} kcal</Text>
            <Text style={{ color: isDark ? "#fff" : "#000" }}>Proteine: {productInfo.nutriments.proteins_100g} g</Text>
            <Text style={{ color: isDark ? "#fff" : "#000" }}>Fett: {productInfo.nutriments.fat_100g} g</Text>
            <Text style={{ color: isDark ? "#fff" : "#000" }}>Kohlenhydrate: {productInfo.nutriments.carbohydrates_100g} g</Text>
            <Text style={[styles.productName, { color: isDark ? "#fff" : "#000" }]}>{productInfo.product_name} pro {gramm}g</Text>
            <Text style={{ color: isDark ? "#fff" : "#000" }}>
              Kalorien (pro {gramm}g): {productInfo.nutriments.energy_value ? (productInfo.nutriments.energy_value / 100 * (parseFloat(gramm) || 0)) : "Keine Daten"}
            </Text>
            <Text style={{ color: isDark ? "#fff" : "#000" }}>
              Proteine (pro {gramm}g): {productInfo.nutriments.proteins_100g ? (productInfo.nutriments.proteins_100g / 100 * (parseFloat(gramm) || 0)).toFixed(1) : "Keine Daten"}
            </Text>
            <Text style={{ color: isDark ? "#fff" : "#000" }}>
              Fette (pro {gramm}g): {productInfo.nutriments.fat_100g ? (productInfo.nutriments.fat_100g / 100 * (parseFloat(gramm) || 0)).toFixed(1) : "Keine Daten"}
            </Text>
            <Text style={{ color: isDark ? "#fff" : "#000" }}>
              Kohlenhydrate (pro {gramm}g): {productInfo.nutriments.carbohydrates_100g ? (productInfo.nutriments.carbohydrates_100g / 100 * (parseFloat(gramm) || 0)).toFixed(1) : "Keine Daten"}
            </Text>
            <Button title="Produkt speichern" onPress={saveProductToDatabase} />
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
    padding: 16,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 8,
    marginBottom: 16,
  },
  productInfo: {
    marginTop: 16,
  },
  productName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  error: {
    color: "red",
    marginTop: 8,
  },
  success: {
    color: "green",
    marginTop: 8,
  },
});