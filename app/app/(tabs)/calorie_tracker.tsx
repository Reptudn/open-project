import { Keyboard, StyleSheet } from "react-native";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemeColors } from "@/constants/theme";
import PagerView from "react-native-pager-view";
import DayItem from "@/components/calorie-tracking/DayItem";
import { useEffect, useState, useRef, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";

export default function CalorieTrackerScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const currDate = new Date();
  const pagerRef = useRef<PagerView>(null);
  const maxDays = 8;

  const [selectedPageIndex, setSelectedPageIndex] = useState<number>(4);

  const handlePageSelected = (event: any) => {
    const pageIndex = event.nativeEvent.position;
    setSelectedPageIndex(pageIndex);
  };

  const goToToday = () => {
    setSelectedPageIndex(4);
    pagerRef.current?.setPage(4);
  };

  const goToDayOffset = (offset: number) => {
    const newPageIndex = selectedPageIndex + offset;

    if (newPageIndex >= 0 && newPageIndex < maxDays) {
      setSelectedPageIndex(newPageIndex);
      pagerRef.current?.setPage(newPageIndex);
    }
  };

  useFocusEffect(
    useCallback(() => {
      goToToday();
    }, [])
  );

  useEffect(() => {
    setSelectedPageIndex(4);
  }, []);

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
      <PagerView
        ref={pagerRef}
        style={{ height: 100, flex: 1 }}
        initialPage={maxDays / 2 + 1}
        onPageSelected={handlePageSelected}
        onPageScroll={Keyboard.dismiss}
        keyboardDismissMode={"on-drag"}
      >
        {Array.from({ length: maxDays }, (_, i) => {
          const date = new Date();
          date.setDate(date.getDate() + (i - maxDays / 2));
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
        })}
      </PagerView>
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
