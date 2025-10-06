import React, { useState } from "react";
import { StyleSheet, Text, TextInput, View, Button, ScrollView } from "react-native";

export default function CalorieTrackerScreen() {
  const [barcode, setBarcode] = useState("");
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
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Calorie Tracker</Text>
      <TextInput
        style={styles.input}
        placeholder="Barcode eingeben"
        value={barcode}
        onChangeText={setBarcode}
        keyboardType="numeric"
      />
      <Button title="Produkt suchen" onPress={fetchProductInfo} />
      {error ? <Text style={styles.error}>{error}</Text> : null}
      {productInfo && (
        <View style={styles.productInfo}>
          <Text style={styles.productName}>{productInfo.product_name}</Text>
          <Text>Marke: {productInfo.brands}</Text>
          <Text>Kategorie: {productInfo.categories}</Text>
          <Text>Nährwerte: {productInfo.nutriments ? JSON.stringify(productInfo.nutriments, null, 2) : "Keine Daten"}</Text>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 8,
    marginBottom: 16,
    backgroundColor: "#fff",
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