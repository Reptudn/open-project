import { TouchableOpacity, useColorScheme, Text } from "react-native";
import { ThemeColors } from "@/constants/theme";

export default function AddExcersizeFull(props: { name: string }) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  return (
    <TouchableOpacity
      style={{
        backgroundColor: ThemeColors.ok,
        padding: 12,
        borderRadius: 8,
        alignItems: "center",
        marginVertical: 12,
      }}
    >
      <Text
        style={{
          color: isDark ? ThemeColors.dark.text : ThemeColors.light.text,
          fontWeight: "bold",
        }}
      >
        Add Excersize
      </Text>
    </TouchableOpacity>
  );
}

export function AddExcersizeSmall(props: { excersizeId: string }) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  return (
    <TouchableOpacity
      style={{
        backgroundColor: ThemeColors.info,
        padding: 12,
        borderRadius: "50%",
        alignItems: "center",
        marginVertical: 12,
      }}
    >
      <Text
        style={{
          color: isDark ? ThemeColors.dark.text : ThemeColors.light.text,
          fontWeight: "bold",
        }}
      >
        + ({props.excersizeId})
      </Text>
    </TouchableOpacity>
  );
}
