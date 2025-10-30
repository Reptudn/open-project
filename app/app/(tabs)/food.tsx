import {
  Keyboard,
  StyleSheet,
  FlatList,
  ViewToken,
  Dimensions,
} from "react-native";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemeColors } from "@/constants/theme";
import DayItem from "@/components/calorie-tracking/DayItem";
import { useEffect, useState, useRef, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";

export default function CalorieTrackerScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const currDate = new Date();
  const flatListRef = useRef<FlatList<any>>(null);
  const maxDays = 8;

  const centerIndex = Math.floor(maxDays / 2);
  const [selectedPageIndex, setSelectedPageIndex] =
    useState<number>(centerIndex);

  // FlatList viewability handler updates selected index (onViewableItemsChanged below)

  const goToToday = useCallback(() => {
    const target = centerIndex;
    setSelectedPageIndex(target);
    flatListRef.current?.scrollToIndex({ index: target, animated: true });
  }, [centerIndex]);

  const goToDayOffset = (offset: number) => {
    const newPageIndex = Math.max(
      0,
      Math.min(maxDays - 1, selectedPageIndex + offset)
    );
    if (newPageIndex >= 0 && newPageIndex < maxDays) {
      setSelectedPageIndex(newPageIndex);
      flatListRef.current?.scrollToIndex({
        index: newPageIndex,
        animated: true,
      });
    }
  };

  useFocusEffect(
    useCallback(() => {
      goToToday();
    }, [goToToday])
  );

  useEffect(() => {
    // ensure we start centered and FlatList is scrolled to center
    setSelectedPageIndex(centerIndex);
    // scroll without animation on mount
    setTimeout(() => {
      flatListRef.current?.scrollToIndex({
        index: centerIndex,
        animated: false,
      });
    }, 0);
  }, [centerIndex]);

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
    ></SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
    width: "100%",
  },
});
