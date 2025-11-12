import { FoodsTableEntry } from "@/types/Meals";
import { View, Text, useColorScheme } from "react-native";
import GymView from "../ui/GymView";
import { GymHeader, GymText, GymTitle } from "../ui/Text";
import { getThemeColor } from "@/constants/theme";

export default function MealEntry(props: FoodsTableEntry) {
  const theme = getThemeColor(useColorScheme());

  const product = props.barcode_id;

  if (product == null) {
    return (
      <GymView>
        <GymTitle>Unknown Meal</GymTitle>
      </GymView>
    );
  }

  return (
    <View
      style={{
        padding: 15,
        borderRadius: 10,
        backgroundColor: theme.button,
      }}
    >
      <GymHeader>{product.name || "Unknown Food Item"}</GymHeader>
      <GymText>Brand: {product.brand || "N/A"}</GymText>
      <GymText>Amount: {props.amount_in_g} g</GymText>
      <GymText>
        Calories:{" "}
        {product.nutriments?.["energy-kcal_100g"]
          ? (
              (product.nutriments["energy-kcal_100g"] * props.amount_in_g) /
              100
            ).toFixed(0)
          : "N/A"}{" "}
        kcal
      </GymText>
    </View>
  );
}
