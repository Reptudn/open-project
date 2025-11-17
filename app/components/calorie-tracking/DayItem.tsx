import { ThemeColors } from "@/constants/theme";
import Ionicons from "@expo/vector-icons/Ionicons";
import {
  View,
  Text,
  StyleSheet,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  useColorScheme,
} from "react-native";
import DayNutritionOverview from "./DayNutritionOverview";
import Meals from "./Meal";
import WeightEntry from "./WeightEntry";

export default function DayItem({
  date,
  currDate,
  isSelected = false,
  pageIndex,
  goToToday,
  goToDayOffset,
}: {
  date: Date;
  currDate: Date;
  isSelected?: boolean;
  pageIndex?: number;
  goToToday: () => void;
  goToDayOffset: (offset: number) => void;
}) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  return (
    <ScrollView
      contentContainerStyle={[
        {
          backgroundColor: isDark
            ? ThemeColors.dark.background
            : ThemeColors.light.background,
        },
      ]}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          style={styles.container}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
        >
          <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
            <TouchableOpacity onPress={() => goToDayOffset(-1)}>
              <Ionicons
                name="chevron-back-outline"
                size={28}
                color={isDark ? ThemeColors.dark.text : ThemeColors.light.text}
              />
            </TouchableOpacity>
            <Text
              style={[
                styles.dateText,
                {
                  color: isDark
                    ? ThemeColors.dark.text
                    : ThemeColors.light.text,
                  fontWeight: "bold",
                  fontSize: 18,
                },
              ]}
            >
              {date.getDate() === currDate.getDate()
                ? "Today"
                : date.getDate() === currDate.getDate() - 1
                  ? "Yesterday"
                  : date.getDate() === currDate.getDate() + 1
                    ? "Tomorrow"
                    : date.toDateString()}
            </Text>
            <TouchableOpacity onPress={() => goToDayOffset(1)}>
              <Ionicons
                name="chevron-forward-outline"
                size={28}
                color={isDark ? ThemeColors.dark.text : ThemeColors.light.text}
              />
            </TouchableOpacity>
          </View>
          {date.getDate() !== currDate.getDate() && (
            <TouchableOpacity
              onPress={goToToday}
              style={{
                marginBottom: 8,
                alignSelf: "center",
                backgroundColor: "#1b3bec10",
                borderWidth: 1,
                borderColor: "#4860e730",
                padding: 6,
                borderRadius: 6,
              }}
            >
              <Text
                style={{
                  color: isDark
                    ? ThemeColors.dark.text
                    : ThemeColors.light.text,
                  paddingTop: 5,
                }}
              >
                Go to Today
              </Text>
            </TouchableOpacity>
          )}
          <View style={{ width: "100%", paddingHorizontal: 16 }}>
            <DayNutritionOverview eaten={631} burnt={200} toGo={1923} />
            <Meals />
            <WeightEntry date={date} />
          </View>
          {/*  */}

          {/*  */}
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 1,
    width: "100%",
  },
  dateText: {
    fontSize: 16,
    fontWeight: "bold",
    justifyContent: "flex-start",
    textAlign: "center",
  },
  contentContainer: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 16,
    paddingBottom: 20,
  },
  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 16,
    textAlign: "center",
    marginTop: 16,
    opacity: 0.7,
  },
  searchContainer: {
    padding: 16,
    paddingBottom: 8,
    borderTopWidth: 1,
    borderTopColor: "#00000010",
    width: "100%",
  },
  searchInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 12,
    paddingRight: 12,
    justifyContent: "flex-end",
  },
  searchInput: {
    flex: 1,
    padding: 16,
    fontSize: 16,
  },
  barcodeButton: {
    padding: 8,
  },
});
