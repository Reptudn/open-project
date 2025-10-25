import React from "react";
import { View, Text } from "react-native";
import { interpolate, withDecay } from "react-native-reanimated";
import type { SharedValue } from "react-native-reanimated";
import Carousel, { TAnimationStyle } from "react-native-reanimated-carousel";
import { Dimensions } from "react-native";
import { getThemeColor } from "@/constants/theme";
import { GymButtonFullMedium, GymButtonSmall } from "./Button";
import { GymText, GymTitle } from "./Text";
import { useThemeColor } from "@/hooks/use-theme-color";

const { width: PAGE_WIDTH } = Dimensions.get("window");

// Create your data array for numbers
const generateNumberData = (min: number, max: number, step: number) => {
  const data = [];
  for (let i = min; i <= max; i += step) {
    data.push(i);
  }
  return data;
};

interface NumberPickerProps {
  min: number;
  max: number;
  step: number;
  unit: string;
  title: string;
  onValueChange: (value: number) => void;
  formatValue?: (value: number) => string;
}

export function GymBodyMetric({
  min,
  max,
  step,
  unit,
  title,
  onValueChange,
  formatValue = (val) => val.toString(),
}: NumberPickerProps) {
  const data = generateNumberData(min, max, step);
  const itemWidth = PAGE_WIDTH / 3;
  const theme = getThemeColor();

  return (
    <View style={{ height: 200, width: "100%" }}>
      <GymTitle
        style={{ marginBottom: 40, textAlign: "center", color: theme.text }}
      >
        {title}
      </GymTitle>

      <Carousel
        width={itemWidth}
        height={100}
        style={{
          width: PAGE_WIDTH,
          height: 100,
        }}
        data={data}
        scrollAnimationDuration={300}
        onSnapToItem={(index) => {
          console.log("Selected value:", data[index + 1]);
          onValueChange(data[index + 1]);
        }}
        renderItem={({ item }) => (
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <GymText
              style={{
                fontSize: 24,
                fontWeight: "bold",
                textAlign: "center",
                color: theme.text,
              }}
            >
              {formatValue(item)}
              {unit}
            </GymText>
          </View>
        )}
      />
    </View>
  );
}

const NumberItem: React.FC<{
  value: number;
  unit: string;
  formatValue: (value: number) => string;
  animationValue: SharedValue<number>;
}> = ({ value, unit, formatValue }) => {
  const theme = getThemeColor();
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "transparent",
      }}
    >
      <GymText>
        {formatValue(value)}
        {unit}
      </GymText>
    </View>
  );
};
