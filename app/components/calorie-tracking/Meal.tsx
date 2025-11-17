import { getThemeColor } from "@/constants/theme";
import { MealType } from "@/types/FoodData.d";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import {
  StyleSheet,
  View,
  Text,
  useColorScheme,
  TouchableOpacity,
} from "react-native";

function MealItem({
  title,
  eaten,
  toEat,
  date,
}: {
  title: "Breakfast" | "Lunch" | "Dinner" | "Snacks";
  eaten: number;
  toEat: number;
  date: Date;
}) {
  const colorScheme = useColorScheme();
  const theme = getThemeColor(colorScheme);
  const progress = Math.min(eaten / toEat, 1);
  const isComplete = eaten >= toEat;
  const remaining = Math.max(toEat - eaten, 0);

  const mealTypeEnum: MealType = (() => {
    switch (title) {
      case "Breakfast":
        return MealType.BREAKFAST;
      case "Lunch":
        return MealType.LUNCH;
      case "Dinner":
        return MealType.DINNER;
      case "Snacks":
        return MealType.SNACK;
      default:
        return MealType.SNACK;
    }
  })();

  const getMealIcon = (mealTitle: string) => {
    switch (mealTitle) {
      case "Breakfast":
        return "sunny";
      case "Lunch":
        return "restaurant";
      case "Dinner":
        return "moon";
      case "Snacks":
        return "fast-food";
      default:
        return "restaurant";
    }
  };

  const getProgressColor = () => {
    if (isComplete) return "#4CAF50";
    if (progress > 0.7) return "#FF9800";
    if (progress > 0.3) return theme.tint;
    return "#E0E0E0";
  };

  return (
    <TouchableOpacity
      style={[styles.mealItem, { backgroundColor: theme.background }]}
      onPress={() => {
        router.push({
          pathname: "/(meal)/meal",
          params: {
            mealType: mealTypeEnum,
            openSearch: "false",
            date: date.toISOString(),
          },
        });
      }}
      activeOpacity={0.7}
      delayPressIn={100}
      delayPressOut={50}
    >
      {/* Background Progress */}
      <View
        style={[
          styles.progressBackground,
          {
            backgroundColor: `${getProgressColor()}15`,
            width: `${progress * 100}%`,
          },
        ]}
      />

      {/* Content Container */}
      <View style={styles.contentContainer}>
        {/* Left Section - Icon and Title */}
        <View style={styles.leftSection}>
          <View
            style={[
              styles.iconContainer,
              { backgroundColor: `${getProgressColor()}20` },
            ]}
          >
            <Ionicons
              name={getMealIcon(title) as any}
              size={20}
              color={getProgressColor()}
            />
          </View>
          <View style={styles.titleContainer}>
            <Text style={[styles.mealTitle, { color: theme.text }]}>
              {title}
            </Text>
            <Text style={[styles.progressText, { color: theme.text }]}>
              {eaten} / {toEat} kcal
            </Text>
          </View>
        </View>

        {/* Right Section - Progress and Add Button */}
        <View style={styles.rightSection}>
          <View style={styles.progressInfo}>
            <View
              style={[
                styles.progressBar,
                { backgroundColor: `${theme.text}20` },
              ]}
            >
              <View
                style={[
                  styles.progressFill,
                  {
                    backgroundColor: getProgressColor(),
                    width: `${progress * 100}%`,
                  },
                ]}
              />
            </View>
            <Text style={[styles.remainingText, { color: theme.text }]}>
              {isComplete ? "Complete!" : `${remaining} left`}
            </Text>
          </View>

          <TouchableOpacity
            style={[
              styles.addButton,
              {
                backgroundColor: isComplete
                  ? `${getProgressColor()}20`
                  : theme.tint,
              },
            ]}
            onPress={() => {
              router.push({
                pathname: "/(meal)/meal",
                params: {
                  mealType: title,
                  openSearch: "true",
                  date: date.toISOString(),
                },
              });
            }}
          >
            <Ionicons
              name={isComplete ? "checkmark" : "add"}
              size={18}
              color={
                isComplete
                  ? getProgressColor()
                  : colorScheme === "dark"
                    ? "#000000"
                    : "#ffffff"
              }
            />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default function Meals() {
  const colorScheme = useColorScheme();
  const theme = getThemeColor(colorScheme);

  const date = new Date();

  // Mock data - in a real app, this would come from your database
  const meals = [
    { title: "Breakfast" as const, eaten: 320, toEat: 500 },
    { title: "Lunch" as const, eaten: 580, toEat: 600 },
    { title: "Dinner" as const, eaten: 450, toEat: 700 },
    { title: "Snacks" as const, eaten: 180, toEat: 300 },
  ];

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Meal Items */}
      <View style={styles.mealsContainer}>
        {meals.map((meal, index) => (
          <View key={meal.title}>
            <MealItem
              title={meal.title}
              eaten={meal.eaten}
              toEat={meal.toEat}
              date={date}
            />
            {index < meals.length - 1 && (
              <View
                style={[
                  styles.separator,
                  { backgroundColor: `${theme.text}10` },
                ]}
              />
            )}
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(0, 0, 0, 0.06)",
  },

  mealsContainer: {
    backgroundColor: "transparent",
  },
  mealItem: {
    position: "relative",
    overflow: "hidden",
  },
  progressBackground: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    borderRadius: 0,
  },
  contentContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 16,
    position: "relative",
    zIndex: 1,
  },
  leftSection: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  titleContainer: {
    flex: 1,
  },
  mealTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 2,
  },
  progressText: {
    fontSize: 12,
    opacity: 0.7,
    fontWeight: "500",
  },
  rightSection: {
    alignItems: "flex-end",
    minWidth: 100,
  },
  progressInfo: {
    alignItems: "flex-end",
    marginBottom: 8,
  },
  progressBar: {
    width: 80,
    height: 4,
    borderRadius: 2,
    marginBottom: 4,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    borderRadius: 2,
  },
  remainingText: {
    fontSize: 10,
    opacity: 0.6,
    fontWeight: "500",
  },
  addButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  separator: {
    height: 1,
    marginHorizontal: 20,
  },
  horizontalLine: {
    width: "100%",
    height: 1,
  },
});
