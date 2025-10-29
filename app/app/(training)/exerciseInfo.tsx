import {
  TouchableOpacity,
  Image,
  View,
  StyleSheet,
  Dimensions,
  ScrollView,
} from "react-native";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { getThemeColor } from "@/constants/theme";
import { router, useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Modalize } from "react-native-modalize";
import { useRef, useEffect, useState } from "react";
import { GymButtonMedium } from "@/components/ui/Button";
import { GymText, GymHeader } from "@/components/ui/Text";

export default function ExerciseInfo() {
  const modalizeRef = useRef<Modalize>(null);
  const theme = getThemeColor(useColorScheme());
  const { width, height } = Dimensions.get("window");
  const { name, overview, imageUrl, excerciseId } = useLocalSearchParams();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Convert params to strings
  const exerciseName = Array.isArray(name) ? name[0] : name || "";
  const exerciseOverview = Array.isArray(overview)
    ? overview[0]
    : overview || "";
  const exerciseImageUrl = Array.isArray(imageUrl)
    ? imageUrl[0]
    : imageUrl || "";

  useEffect(() => {
    modalizeRef.current?.open();
  }, []);

  const handleModalClose = () => {
    setIsModalOpen(false);
    router.push("/(training)/trainingOverview");
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.background }}>
      <Modalize
        ref={modalizeRef}
        onClose={handleModalClose}
        modalHeight={height}
        modalStyle={{ backgroundColor: theme.background }}
        handleStyle={{ backgroundColor: theme.text }}
        handlePosition="inside"
      >
        <ScrollView
          style={{ flex: 1, backgroundColor: theme.background }}
          contentContainerStyle={{ flexGrow: 1, padding: 20 }}
          showsVerticalScrollIndicator={false}
        >
          <GymHeader
            style={{
              color: theme.text,
              textAlign: "center",
              marginBottom: 20,
              fontSize: 24,
            }}
          >
            {exerciseName}
          </GymHeader>

          <View style={styles.imageContainer}>
            <Image
              source={{ uri: exerciseImageUrl }}
              style={[styles.exerciseImage, { borderColor: theme.text + "30" }]}
              resizeMode="contain"
              onError={(error) =>
                console.log("Image load error:", error.nativeEvent.error)
              }
            />
          </View>

          <View
            style={[
              styles.descriptionContainer,
              { backgroundColor: theme.text + "10" },
            ]}
          >
            <GymText
              style={{
                color: theme.text,
                fontSize: 16,
                lineHeight: 24,
                textAlign: "left",
              }}
            >
              {exerciseOverview}
            </GymText>
          </View>

          {/* Action Buttons */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.secondaryButton, { borderColor: theme.text }]}
              onPress={() => modalizeRef.current?.close()}
            >
              <GymText style={{ color: theme.text, fontSize: 16 }}>
                Cancel
              </GymText>
            </TouchableOpacity>

            <GymButtonMedium
              style={[styles.primaryButton, { backgroundColor: "#4CAF50" }]}
              onPress={() => {
                console.log("Adding exercise:", exerciseName);
                console.log("Id:", excerciseId);
                router.push("/(training)/trainingOverview");
              }}
            >
              <GymText
                style={{ color: "white", fontSize: 16, fontWeight: "bold" }}
              >
                Add Exercise
              </GymText>
            </GymButtonMedium>
          </View>
        </ScrollView>
      </Modalize>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginBottom: 10,
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer: {
    alignItems: "center",
    marginBottom: 25,
  },
  exerciseImage: {
    width: "100%",
    height: 300,
    borderRadius: 15,
    borderWidth: 1,
  },
  descriptionContainer: {
    padding: 20,
    borderRadius: 15,
    marginBottom: 30,
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 15,
    paddingTop: 20,
  },
  secondaryButton: {
    flex: 1,
    paddingVertical: 15,
    borderRadius: 12,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  primaryButton: {
    flex: 1,
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
});
