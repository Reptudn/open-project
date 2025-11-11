import { StyleSheet, FlatList } from "react-native";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemeColors } from "@/constants/theme";
import DayItem from "@/components/calorie-tracking/DayItem";
import { useEffect, useState, useRef, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";

function DailyWorkout() {}
function DailyCalories() {}

export default function CalorieTrackerScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const currDate = new Date();
  const flatListRef = useRef<FlatList<any>>(null);
  const maxDays = 8;

  const centerIndex = Math.floor(maxDays / 2);
  const [selectedPageIndex, setSelectedPageIndex] =
    useState<number>(centerIndex);

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
    >
      {/*
      <FlatList
        ref={flatListRef}
        data={Array.from({ length: maxDays })}
        keyExtractor={(_, i) => String(i)}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={Keyboard.dismiss}
        initialScrollIndex={centerIndex}
        onScrollToIndexFailed={(info) => {
          // fallback: scroll to offset
          const screenWidth = Dimensions.get("window").width;
          const offset = info.index * screenWidth;
          flatListRef.current?.scrollToOffset({ offset, animated: true });
        }}
        viewabilityConfig={{ itemVisiblePercentThreshold: 50 }}
        onViewableItemsChanged={
          useRef(({ viewableItems }: { viewableItems: ViewToken[] }) => {
            if (viewableItems && viewableItems.length > 0) {
              const idx = viewableItems[0].index ?? 0;
              setSelectedPageIndex(idx);
            }
          }).current
        }
        renderItem={({ index: i }) => {
          const date = new Date();
          date.setDate(date.getDate() + (i - centerIndex));
          const isSelected = selectedPageIndex === i;
          return (
            <DayItem
              key={i}
              date={date}
              currDate={currDate}
              isSelected={isSelected}
              pageIndex={i}
              goToToday={goToToday}
              goToDayOffset={goToDayOffset}
            />
          );
        }}
        getItemLayout={(_, index) => {
          const width = Dimensions.get("window").width;
          return { length: width, offset: width * index, index };
        }}
        style={{ flex: 1 }}
      /> */}
      <DayItem
        // key={i}
        date={currDate}
        currDate={currDate}
        isSelected={true}
        // pageIndex={i}
        goToToday={goToToday}
        goToDayOffset={goToDayOffset}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
    width: "100%",
  },
});
