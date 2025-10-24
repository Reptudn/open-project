/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import { Platform } from "react-native";
import { useColorScheme } from "react-native";

const tintColorLight = "#0a7ea4";
const tintColorDark = "#fff";

export const ThemeColors = {
  light: {
    text: "#242c40",
    background: "#fff",
    button: "#f0f0f0",
    tint: tintColorLight,
    icon: "#687076",
    tabIconDefault: "#687076",
    tabIconSelected: tintColorLight,
    tabBarActiveTintColor: "#242c40",
    tabBarInactiveTintColor: "#666666",
    borderTopColor: "#b0b0a0",
    headerTintColor: "#242c40",
    light: "#c0c0b0",
  },
  dark: {
    text: "#d0d0c0",
    background: "#151718",
    button: "#404040",
    tint: tintColorDark,
    icon: "#9BA1A6",
    tabIconDefault: "#9BA1A6",
    tabIconSelected: tintColorDark,
    tabBarActiveTintColor: "#d0d0c0",
    tabBarInactiveTintColor: "#8a8a8a",
    borderTopColor: "#404040",
    headerTintColor: "#d0d0c0",
    dark: "#4a5568",
  },
  red: {
    // accent red theme — light background with red accents
    text: "#2a0b0b",
    background: "#fff",
    button: "#fff2f2",
    tint: "#FF3333",
    icon: "#8a1f1f",
    tabIconDefault: "#8a1f1f",
    tabIconSelected: "#FF3333",
    tabBarActiveTintColor: "#2a0b0b",
    tabBarInactiveTintColor: "#8a8a8a",
    borderTopColor: "#f2b7b7",
    headerTintColor: "#2a0b0b",
    dark: "#7a1a1a",
  },
  blue: {
    // accent blue theme
    text: "#062533",
    background: "#fff",
    button: "#eaf6ff",
    tint: "#3399FF",
    icon: "#0a628f",
    tabIconDefault: "#0a628f",
    tabIconSelected: "#3399FF",
    tabBarActiveTintColor: "#062533",
    tabBarInactiveTintColor: "#8a8a8a",
    borderTopColor: "#bfe6ff",
    headerTintColor: "#062533",
    dark: "#0f567a",
  },
  green: {
    // accent green theme
    text: "#08321a",
    background: "#fff",
    button: "#f2fff4",
    tint: "#4BB543",
    icon: "#2e7a3d",
    tabIconDefault: "#2e7a3d",
    tabIconSelected: "#4BB543",
    tabBarActiveTintColor: "#08321a",
    tabBarInactiveTintColor: "#8a8a8a",
    borderTopColor: "#cfefd7",
    headerTintColor: "#08321a",
    dark: "#256534",
  },
  yellow: {
    // accent yellow theme
    text: "#3a2a00",
    background: "#fff",
    button: "#fff9e6",
    tint: "#FFAA00",
    icon: "#8a6a00",
    tabIconDefault: "#8a6a00",
    tabIconSelected: "#FFAA00",
    tabBarActiveTintColor: "#3a2a00",
    tabBarInactiveTintColor: "#8a8a8a",
    borderTopColor: "#ffe7b3",
    headerTintColor: "#3a2a00",
    dark: "#a06f00",
  },
  orange: {
    // accent orange theme
    text: "#3a1200",
    background: "#fff",
    button: "#fff4ea",
    tint: "#FF8800",
    icon: "#8a3f00",
    tabIconDefault: "#8a3f00",
    tabIconSelected: "#FF8800",
    tabBarActiveTintColor: "#3a1200",
    tabBarInactiveTintColor: "#8a8a8a",
    borderTopColor: "#ffd6b3",
    headerTintColor: "#3a1200",
    dark: "#9a4f00",
  },
  ok: "#4BB543",
  error: "#FF3333",
  warning: "#FFAA00",
  info: "#3399FF",
  success: "#4BB543",
};

export function getThemeColor(colorScheme = useColorScheme()) {
  switch (colorScheme) {
    case "light":
      return ThemeColors.light;
    case "dark":
      return ThemeColors.dark;
    // case "red":
    //   return ThemeColors.red;
    // case "blue":
    //   return ThemeColors.blue;
    // case "green":
    //   return ThemeColors.green;
    // case "yellow":
    //   return ThemeColors.yellow;
    // case "orange":
    //   return ThemeColors.orange;
    default:
      return ThemeColors.dark;
  }
}

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: "system-ui",
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: "ui-serif",
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: "ui-rounded",
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: "ui-monospace",
  },
  default: {
    sans: "normal",
    serif: "serif",
    rounded: "normal",
    mono: "monospace",
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded:
      "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
