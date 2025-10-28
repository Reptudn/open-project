import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  Modal,
} from "react-native";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemeColors } from "@/constants/theme";
import { getWorkouts } from "@/lib/api/workout/workoutInsert";
import Ionicons from "@expo/vector-icons/Ionicons";
import React, { useRef } from "react";
import ExerciseList from "@/components/training/exercises/ExerciseList";
import { Modalize } from "react-native-modalize";

export default function TrainingScreen() {
  const modalizeRef = useRef<Modalize>(null);
  const exerciseInfo = useRef<Modalize>(null);
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  const onOpen = () => {
    modalizeRef.current?.open();
  };

  const Workouts = async () => {
    return await getWorkouts();
  };

  const Training = () => {
    const { width, height } = Dimensions.get("window");
    if (Workouts.length === 0) {
      return (
        <SafeAreaView>
          <TouchableOpacity
            onPress={() => onOpen()}
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
          <Modalize ref={modalizeRef}>
            <View style={styles.modalBackground}>
              <View
                style={[
                  { width: width, height: height * 0.9 },
                  {
                    backgroundColor: isDark
                      ? ThemeColors.dark.button
                      : ThemeColors.light.button,
                  },
                ]}
              >
                <Text
                  style={{
                    color: isDark
                      ? ThemeColors.dark.text
                      : ThemeColors.light.text,
                    fontWeight: "bold",
                    paddingHorizontal: 15,
                    fontSize: 20,
                  }}
                >
                  Build your workout
                </Text>
                <ExerciseList />
              </View>
            </View>
          </Modalize>
        </SafeAreaView>
      );
    }

    return (
      <View>
        <Text
          style={[
            styles.title,
            { color: isDark ? ThemeColors.dark.text : ThemeColors.light.text },
          ]}
        >
          Hier workouts
        </Text>
      </View>
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
      <Training />
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
  textStyle: {
    color: "white",
    textAlign: "center",
  },
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)", // Semi-transparent background
  },
  modalText: {
    fontSize: 18,
  },
});
