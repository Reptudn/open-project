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
import { getWorkouts } from "@/lib/api/workoutTableUtils";
import Ionicons from "@expo/vector-icons/Ionicons";
import React from "react";
import ExerciseList from "@/components/training/exercises/ExerciseList";
import { red } from "react-native-reanimated/lib/typescript/Colors";

export default function TrainingScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  const Workouts = async () => {
    return await getWorkouts();
  };

  const Training = () => {
    const [modalVisible, setModalVisible] = React.useState(false);

    const { width, height } = Dimensions.get("window");
    if (Workouts.length === 0) {
      return (
        <SafeAreaView>
          <TouchableOpacity
            onPress={() => setModalVisible(true)}
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
            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => setModalVisible(false)}
            >
              <View style={styles.modalBackground}>
                <View
                  style={[
                    styles.modalView,
                    { width: width, height: height * 0.9 },
                    {
                      backgroundColor: isDark
                        ? ThemeColors.dark.button
                        : ThemeColors.light.button,
                    },
                  ]}
                >
                  <TouchableOpacity
                    style={{
                      position: "absolute",
                      right: 15,
                      marginTop: 20,
                      zIndex: 1000,
                      width: 30,
                      height: 30,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                    onPress={() => setModalVisible(false)}
                  >
                    <Ionicons
                      name={isDark ? "close-circle-outline" : "close-circle"}
                      size={30}
                      color="red"
                    />
                  </TouchableOpacity>
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
            </Modal>
          </TouchableOpacity>
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
  modalView: {
    borderRadius: 20,
    paddingTop: 20,
    elevation: 5, // Shadow for Android
    shadowColor: "#000", // Shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  modalText: {
    fontSize: 18,
  },
});
