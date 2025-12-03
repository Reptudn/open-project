import { getThemeColor } from "@/constants/theme";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { useRef } from "react";
import { Text } from "react-native-gesture-handler";
import { GymHeader, GymText } from "./Text";
import { GymHomeStats } from "./Statistics";
import { View, StyleSheet, useColorScheme } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Background } from "@react-navigation/elements";
import { router } from "expo-router";
import GymView from "./GymView";
import ExerciseList from "../training/exercises/ExerciseList";

export function BottomSheetProfile() {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const theme = getThemeColor(useColorScheme());

  return (
    <BottomSheet
      ref={bottomSheetRef}
      snapPoints={["20%", "100%"]}
      backgroundStyle={{ backgroundColor: theme.background }}
      index={0}
    >
      <BottomSheetView>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-evenly",
            margin: 20,
          }}
        >
          <View
            style={{
              width: 100,
              height: 100,
              borderRadius: 50,
              backgroundColor: theme.icon,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Ionicons name="barbell-sharp" size={80} color={theme.background} />
          </View>
          <View>
            <GymText style={{ fontSize: 18, color: theme.text }}>
              Full Name
            </GymText>
            <GymText>@username</GymText>
          </View>
        </View>

        <View
          style={{
            marginTop: 30,
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "center",
            alignItems: "center",
            gap: 20,
          }}
        >
          <GymHomeStats
            header="Calories"
            iconName={"power"}
            value={799}
            type="kcal"
            backgroundColor="#38B6FF"
            onPress={() => alert("add function")}
          ></GymHomeStats>
          <GymHomeStats
            header="Steps"
            iconName={"footsteps-sharp"}
            value={12.473}
            type="Steps"
            backgroundColor="#f7c410"
            onPress={() => alert("add function")}
          ></GymHomeStats>
          <GymHomeStats
            header="Sleep"
            iconName={"moon-sharp"}
            value={8}
            type="Hours"
            backgroundColor="#a5193c"
            onPress={() => alert("add function")}
          ></GymHomeStats>
          <GymHomeStats
            header="Water"
            iconName={"water-sharp"}
            value={3.5}
            type="Liter"
            backgroundColor="#0814b9"
            onPress={() => alert("add function")}
          ></GymHomeStats>
        </View>
      </BottomSheetView>
    </BottomSheet>
  );
}