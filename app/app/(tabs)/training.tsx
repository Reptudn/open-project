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
import { SelectList } from "react-native-dropdown-select-list";
import React from "react";
import ExerciseList from "@/components/training/exercises/ExerciseList";

export default function TrainingScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  const Workouts = async () => {
    return await getWorkouts();
  };

  const Training = () => {
    const [selected, setSelected] = React.useState("");
    const [modalVisible, setModalVisible] = React.useState(false);

    const { width, height } = Dimensions.get("window");
    const data = [
      { key: "1", value: "Lucas Arsch" },
      { key: "2", value: "Appliances" },
      { key: "3", value: "Cameras" },
      { key: "4", value: "Computers" },
      { key: "5", value: "Vegetables" },
      { key: "6", value: "Diary Products" },
      { key: "7", value: "Drinks" },
    ];
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
                    { width: width, height: height * 0.8 },
                    {
                      backgroundColor: isDark
                        ? ThemeColors.dark.button
                        : ThemeColors.light.button,
                    },
                    { bottom: -(height * 0.1) },
                  ]}
                >
                  <Text
                    style={{
                      color: isDark
                        ? ThemeColors.dark.text
                        : ThemeColors.light.text,
                      fontWeight: "bold",
                    }}
                  >
                    Build your workout
                  </Text>
                  {/* <SelectList
                    setSelected={(val: string) => setSelected(val)}
                    data={data}
                    save="value"
                    boxStyles={{
                      borderColor: isDark
                        ? ThemeColors.dark.text
                        : ThemeColors.light.text,
                      backgroundColor: isDark
                        ? ThemeColors.dark.background
                        : ThemeColors.light.background,
                    }}
                    inputStyles={{
                      color: isDark
                        ? ThemeColors.dark.text
                        : ThemeColors.light.text,
                    }}
                    dropdownTextStyles={{
                      color: isDark
                        ? ThemeColors.dark.text
                        : ThemeColors.light.text,
                    }}
                    dropdownStyles={{
                      backgroundColor: isDark
                        ? ThemeColors.dark.background
                        : ThemeColors.light.background,
                      borderColor: isDark
                        ? ThemeColors.dark.text
                        : ThemeColors.light.text,
                    }}
                  /> */}
                  <ExerciseList />

                  <TouchableOpacity
                    style={styles.closeButton}
                    onPress={() => setModalVisible(false)}
                  >
                    <Text style={styles.textStyle}>Close</Text>
                  </TouchableOpacity>
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
  closeButton: {
    marginTop: 20,
    backgroundColor: "#f44336",
    padding: 10,
    borderRadius: 10,
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
    alignItems: "center",
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
