/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import { Platform } from "react-native";

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
  ok: "#4BB543",
  error: "#FF3333",
  warning: "#FFAA00",
  info: "#3399FF",
  success: "#4BB543",
};

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
