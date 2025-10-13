import { TouchableOpacity, useColorScheme, Text } from "react-native";
import { ThemeColors } from "@/constants/theme";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function AddExerciseFull(props: { name: string }) {
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
        Add Exercise
      </Text>
    </TouchableOpacity>
  );
}

export function AddExerciseSmall(props: { exerciseId: string }) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  return (
    <TouchableOpacity>
      <Ionicons
        name="add-outline"
        size={24}
        color={isDark ? ThemeColors.dark.icon : ThemeColors.light.icon}
      />
    </TouchableOpacity>
  );
}
