import { Modal, TouchableOpacity, useColorScheme } from "react-native";
import { ReactNode, useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { ThemeColors } from "@/constants/theme";

interface SwipeDownCloseProps {
  children: ReactNode;
  defaultState: boolean;
}

export function SwipeDownClose({
  children,
  defaultState = false,
}: SwipeDownCloseProps) {
  const [opened, isOpened] = useState(defaultState);
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  return (
    <Modal animationType="slide" transparent={false} visible={opened}>
      <TouchableOpacity
        style={{
          position: "absolute",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Ionicons
          name="remove-outline"
          size={80}
          color={isDark ? ThemeColors.dark.icon : ThemeColors.light.icon}
          onPress={() => isOpened(false)}
        />
      </TouchableOpacity>
      {children}
    </Modal>
  );
}
