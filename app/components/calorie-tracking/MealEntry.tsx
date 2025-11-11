import { FoodsTableEntry } from "@/types/Meals";
import { View, Text } from "react-native";

export default function MealEntry(props: FoodsTableEntry) {
  return (
    <View>
      <Text>{props.barcode_id?.name || "Unknown Meal"}</Text>
    </View>
  );
}
