import Calories from "@/components/profile/calories";
import HeatMap from "@/components/profile/heatmap";
import GymView from "@/components/ui/GymView";
import { GymHomeStats } from "@/components/ui/Statistics";
import { GymText } from "@/components/ui/Text";
import { getThemeColor } from "@/constants/theme";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useEffect, useRef } from "react";
import { Dimensions, useColorScheme, View, Image } from "react-native";
import { Modalize } from "react-native-modalize";

export default function HomeScreen() {
  const theme = getThemeColor(useColorScheme());
  const modalizeRef = useRef<Modalize>(null);
  const { height, width } = Dimensions.get("window");

  useEffect(() => {
    modalizeRef.current?.open();
  }, []);

  return (
    <GymView>
      {/* Replace img with actual guy transforming */}
      <Image
        style={{
          width: width,
          height: height,
          position: "absolute",
          top: 0,
          left: 0,
          resizeMode: "cover",
        }}
        source={{
          uri: "https://d.furaffinity.net/art/imafrnin/1625234408/1625234408.imafrnin_shy_guy.jpg",
        }}
      />

      {/* Modal content (Username, Stats etc.) */}
      <Modalize
        ref={modalizeRef}
        modalHeight={height}
        alwaysOpen={300}
        handlePosition="inside"
        handleStyle={{ backgroundColor: theme.text }}
        modalStyle={{ backgroundColor: theme.background }}
      >
        <View style={{ paddingTop: 20, paddingLeft: 40, flexDirection: "row" }}>
          <View
            style={{
              display: "flex",
              width: 100,
              height: 100,
              borderRadius: 50,
              backgroundColor: theme.text,
              justifyContent: "center",
              alignItems: "center",
              alignSelf: "flex-start",
              marginBottom: 20,
            }}
          >
            <Ionicons name="barbell-sharp" size={80} color={theme.icon} />
          </View>
          <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
          >
            <GymText style={{ fontSize: 18, color: theme.text }}>
              Full Name
            </GymText>
            <GymText>@username</GymText>
          </View>
        </View>

        <View
          style={{
            marginTop: 20,
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
      </Modalize>
    </GymView>
  );
}
