import {
  TouchableOpacity,
  useColorScheme,
  Dimensions,
  View,
} from "react-native";
import { getThemeColor } from "@/constants/theme";
import { GymText } from "./Text";
import Ionicons from "@expo/vector-icons/Ionicons";

/**
 * Basic themed Stats component with automatic color theming
 * @param children - The Stats content to display
 * @param props - Additional Stats component props
 * @returns A Stats component with theme colors applied
 * @example
 * <GymHomeStats
        header="Calories"
        iconName={"contrast-outline"}
        value={799}
        type="kcal"
        backgroundColor="#38B6FF"
      ></GymHomeStats>
 * ```
 */
interface IHomeStats {
  header: string;
  iconName: any;
  value: number;
  type: string;
  backgroundColor: string;
}

export function GymHomeStats({
  header,
  iconName,
  value,
  type,
  backgroundColor,
  ...props
}: IHomeStats) {
  const theme = getThemeColor(useColorScheme());
  const width = Dimensions.get("window").width;

  return (
    <TouchableOpacity
      style={{
        display: "flex",
        position: "relative",
        backgroundColor: `${backgroundColor}80`,
        padding: 12,
        borderRadius: 20,
        alignItems: "flex-start",
        width: width * 0.4,
        height: width * 0.4,
      }}
      {...props}
    >
      <GymText
        style={{ position: "absolute", top: 20, left: 12, color: theme.text }}
        className="font-bold text-xl"
      >
        {header}{" "}
      </GymText>
      <View
        style={{
          position: "absolute",
          top: 12,
          right: 12,
          width: 40,
          height: 40,
          borderRadius: 20,
          backgroundColor: backgroundColor,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Ionicons name={iconName} size={24} color={theme.icon} />
      </View>
      <View style={{ position: "absolute", bottom: 20, left: 12 }}>
        <GymText className="font-semibold text-xl">{value}</GymText>
        <GymText className="text-xl">{type}</GymText>
      </View>
    </TouchableOpacity>
  );
}
