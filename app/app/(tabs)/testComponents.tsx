import React, { useState } from "react";
import { GymBr } from "@/components/ui/Br";
import {
  GymButtonFullLarge,
  GymButtonFullMedium,
  GymButtonFullWidth,
  GymButtonSmall,
} from "@/components/ui/Button";
import { GymHomeStats } from "@/components/ui/Statistics";
import { GymTitle, GymHeader, GymText } from "@/components/ui/Text";
import { getThemeColor } from "@/constants/theme";
import { useColorScheme } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

export default function TestComponentsScreen() {
  const theme = getThemeColor(useColorScheme());
  const [height, setHeight] = useState<number>(170);

  const onValueChange = (val: number) => {
    setHeight(val);
  };

  // Main testing page with components
  return (
    <ScrollView
      style={{ backgroundColor: theme.background }}
      contentContainerStyle={{ padding: 20, alignItems: "flex-start" }}
    >
      <GymTitle>Title</GymTitle>
      <GymBr />
      <GymHeader>Header</GymHeader>
      <GymBr />
      <GymText>Text</GymText>
      <GymBr />
      <GymButtonFullWidth onPress={() => alert("add function")}>
        ButtonFullWidth
      </GymButtonFullWidth>
      <GymBr />
      <GymButtonSmall onPress={() => alert("add function")}>
        Small
      </GymButtonSmall>
      <GymBr />
      <GymButtonFullMedium onPress={() => alert("add function")}>
        Medium
      </GymButtonFullMedium>
      <GymBr />
      <GymButtonFullLarge onPress={() => alert("add function")}>
        Large
      </GymButtonFullLarge>
      <GymBr />
      <GymHomeStats
        header="Calories"
        iconName={"contrast-outline"}
        value={799}
        type="kcal"
        backgroundColor="#38B6FF"
        onPress={() => alert("add function")}
      ></GymHomeStats>
      <GymBr />
    </ScrollView>
  );
}
