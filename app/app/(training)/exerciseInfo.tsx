import {
  TouchableOpacity,
  Text,
  Image,
  View,
  StyleSheet,
  Dimensions,
  Modal,
} from "react-native";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { ThemeColors } from "@/constants/theme";
import { Exercise } from "@/types/Exercise";
import { router, useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Modalize } from "react-native-modalize";
import { useRef, useEffect } from "react";

export default function ExerciseInfo() {
  const modalizeRef = useRef<Modalize>(null);
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const { width, height } = Dimensions.get("window");
  const { name, overview, imageUrl } = useLocalSearchParams();

  useEffect(() => {
    modalizeRef.current?.open();
  }, []);

  return (
    <SafeAreaView>
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
                color: isDark ? ThemeColors.dark.text : ThemeColors.light.text,
                fontWeight: "bold",
                paddingHorizontal: 15,
                fontSize: 20,
              }}
            >
              {name}
            </Text>
            <Image
              source={{
                uri: imageUrl,
              }}
              style={{
                width: 400,
                height: 400,
                borderRadius: 5,
              }}
              resizeMode="contain"
              onError={(error) =>
                console.log("Image load error:", error.nativeEvent.error)
              }
              alt="Exercise GIF"
            />
            <Text
              style={{
                color: isDark ? ThemeColors.dark.text : ThemeColors.light.text,
                paddingHorizontal: 15,
                fontSize: 20,
              }}
            >
              {overview}
            </Text>
          </View>
        </View>
      </Modalize>
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
