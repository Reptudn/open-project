import Ionicons from "@expo/vector-icons/Ionicons";
import { GymButtonSmall } from "../ui/Button";
import GymView from "../ui/GymView";
import { GymHeader, GymText } from "../ui/Text";
import { useState } from "react";
import { View } from "react-native";

export default function WeightEntry() {
  const [weight, setWeight] = useState<number>(0);

  return (
    <GymView>
      <GymHeader>Weight Entry Screen</GymHeader>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "row",
        }}
      >
        <GymButtonSmall
          onPress={() => {
            if (weight < 0) setWeight(0);
            if (weight > 0) setWeight(weight - 1);
          }}
          // style={{ alignItems: "flex-start" }}
        >
          <Ionicons name="remove" size={24} color="black" />
        </GymButtonSmall>
        <GymText>{weight}kg</GymText>
        <GymButtonSmall
          onPress={() => {
            if (weight < 999) setWeight(weight + 1);
          }}
          // style={{ alignItems: "flex-end" }}
        >
          <Ionicons name="add" size={24} color="black" />
        </GymButtonSmall>
      </View>
    </GymView>
  );
}
