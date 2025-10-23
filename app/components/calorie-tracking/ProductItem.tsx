import { ThemeColors } from "@/constants/theme";
import { Product } from "@/types/FoodData";
import Ionicons from "@expo/vector-icons/Ionicons";
import {
  useColorScheme,
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
} from "react-native";

export default function ProductItem({ product }: { product: Product }) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  return (
    <TouchableOpacity
      style={{
        backgroundColor: isDark ? "#333" : "#fff",
        margin: 10,
        ...styles.container,
      }}
    >
      <Text
        style={{
          color: isDark ? ThemeColors.dark.text : ThemeColors.light.text,
          ...styles.title,
        }}
      >
        {product.product_name || "Unknown Product"}
      </Text>
      <View style={{ ...styles.info }}>
        <Text style={{ color: isDark ? "#ccc" : "#555" }}>
          <Ionicons
            name="flame"
            size={24}
            color={isDark ? ThemeColors.dark.text : ThemeColors.light.text}
            style={{ marginRight: 4 }}
          />
          {product.nutriments?.["energy-kcal_100g"]?.toFixed(0) || 0}kcal
        </Text>
        <Text style={{ color: isDark ? "#ccc" : "#555" }}>
          <Ionicons
            name="barbell"
            size={24}
            color={isDark ? ThemeColors.dark.text : ThemeColors.light.text}
            style={{ marginRight: 4 }}
          />
          {product.nutriments?.["proteins_100g"]?.toFixed(0) || 0}g
        </Text>
        <Text style={{ color: isDark ? "#ccc" : "#555" }}>
          <Ionicons
            name="water"
            size={24}
            color={isDark ? ThemeColors.dark.text : ThemeColors.light.text}
            style={{ marginRight: 4 }}
          />
          {product.nutriments?.["carbohydrates_100g"]?.toFixed(0) || 0}g
        </Text>
        <Text style={{ color: isDark ? "#ccc" : "#555" }}>
          <Ionicons
            name="leaf"
            size={24}
            color={isDark ? ThemeColors.dark.text : ThemeColors.light.text}
            style={{ marginRight: 4 }}
          />
          {product.nutriments?.["fat_100g"]?.toFixed(0) || 0}g
        </Text>
      </View>
      <TouchableOpacity style={{ ...styles.addButton }} onPress={() => {}}>
        <Text style={{ color: "#fff", textAlign: "center" }}>Add 100g</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    paddingLeft: 3,
    paddingRight: 3,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  info: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  addButton: {
    alignSelf: "flex-end",
    backgroundColor: "#4CAF50",
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
    width: "100%",
  },
});
