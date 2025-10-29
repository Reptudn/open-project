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
import { Test } from "@/components/ui/BodyMetrics";
import TableStats from "@/components/ui/TableStats";



export default function TestComponentsScreen() {
  const theme = getThemeColor(useColorScheme());

  // Main testing page with components
  return (
    <ScrollView
      style={{ backgroundColor: theme.background }}
    >
      <TableStats />
    </ScrollView>
  );
}
