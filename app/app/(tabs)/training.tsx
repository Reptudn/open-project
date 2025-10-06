import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemeColors } from "@/constants/theme";
import { getWorkouts } from "@/lib/workoutTableUtils";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function TrainingScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  const addWorkout = () => {
    alert("test");
  };

  const Workouts = async () => {
    return await getWorkouts();
  };

  const Training = () => {
    if (Workouts.length === 0) {
      return (
        <SafeAreaView>
          <TouchableOpacity
            onPress={addWorkout}
            style={[
              styles.itemsingle,
              {
                backgroundColor: isDark
                  ? ThemeColors.dark.button
                  : ThemeColors.light.button,
              },
            ]}
          >
            <Ionicons
              name={isDark ? "add-circle-outline" : "add-circle"}
              size={35}
              color={isDark ? ThemeColors.dark.text : ThemeColors.light.text}
            />
            <Text
              style={[
                styles.title,
                {
                  color: isDark
                    ? ThemeColors.dark.text
                    : ThemeColors.light.text,
                },
              ]}
            >
              Workout
            </Text>
          </TouchableOpacity>
        </SafeAreaView>
      );
    }
    return (
      <Text
        style={[
          styles.title,
          { color: isDark ? ThemeColors.dark.text : ThemeColors.light.text },
        ]}
      >
        Hier workouts
      </Text>
    );
  };

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
      <Training></Training>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  icon: {
    width: 32,
    height: 32,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
  text: {
    color: "black",
  },
  header: {
    color: "black",
    fontSize: 40,
    fontWeight: "bold",
    margin: 20,
  },
  item: {
    backgroundColor: "#dadadaff",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  itemsingle: {
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    top: "50%",
    left: "25%",
    width: "50%",
    height: "50%",
  },
  itemIcon: {
    marginRight: 15,
  },
  itemContent: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
  },
  subtitle: {
    fontSize: 14,
    marginTop: 2,
  },
});
