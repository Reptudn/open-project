import Calories from "@/components/profile/calories";
import HeatMap from "@/components/profile/heatmap";
import { BottomSheetProfile } from "@/components/ui/BottomSheet";
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
      <BottomSheetProfile>
      </BottomSheetProfile>
    </GymView>
  );
}
