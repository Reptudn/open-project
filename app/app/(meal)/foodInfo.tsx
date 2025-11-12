import GymView from "@/components/ui/GymView";
import { GymText, GymTitle } from "@/components/ui/Text";
import { getThemeColor } from "@/constants/theme";
import { FoodsTableEntry } from "@/types/Meals";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router, useLocalSearchParams } from "expo-router";
import { TouchableOpacity, useColorScheme } from "react-native";

export default function FoodInfo() {
  const theme = getThemeColor(useColorScheme());
  const { props } = useLocalSearchParams();

  const product: FoodsTableEntry = JSON.parse(props as string);

  return (
    <GymView>
      <TouchableOpacity onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={24} color={theme.text} />
      </TouchableOpacity>
      <GymTitle>{product.barcode_id.name ?? "Unknown"}</GymTitle>
      <GymText>{product.barcode_id.brand ?? "N/A"}</GymText>
      <GymText>Amount: {product.amount_in_g} g</GymText>
      <GymText>
        Calories:{" "}
        {product.barcode_id.nutriments?.["energy-kcal_100g"]
          ? (
              (product.barcode_id.nutriments["energy-kcal_100g"] *
                product.amount_in_g) /
              100
            ).toFixed(0)
          : "N/A"}{" "}
        kcal
      </GymText>
    </GymView>
  );
}
