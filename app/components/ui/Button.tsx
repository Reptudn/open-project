import {
  TouchableOpacity,
  TouchableOpacityProps,
  useColorScheme,
} from "react-native";
import { getThemeColor } from "@/constants/theme";
import { GymText } from "./Text";

/**
 * Basic themed text component with automatic color theming
 * @param children - The text content to display
 * @param props - Additional Text component props
 * @returns A Button component with theme colors applied
 * @example
 * ```tsx
 * <GymButton>Click me!</GymButton>
 * ```
 */
export function GymButtonFullWidth({
  children,
  ...props
}: TouchableOpacityProps) {
  const theme = getThemeColor(useColorScheme());

  return (
    <TouchableOpacity
      style={{
        backgroundColor: theme.button,
        padding: 12,
        borderRadius: 20,
        alignItems: "center",
        width: "100%",
      }}
      {...props}
    >
      <GymText>{children}</GymText>
    </TouchableOpacity>
  );
}

/**
 * Small button component
 */
export function GymButtonSmall({ children, ...props }: TouchableOpacityProps) {
  const theme = getThemeColor(useColorScheme());

  return (
    <TouchableOpacity
      style={{
        backgroundColor: theme.button,
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 8,
        alignItems: "center",
        minHeight: 36,
      }}
      {...props}
    >
      <GymText>{children}</GymText>
    </TouchableOpacity>
  );
}

/**
 * Medium button component
 */
export function GymButtonFullMedium({
  children,
  ...props
}: TouchableOpacityProps) {
  const theme = getThemeColor(useColorScheme());

  return (
    <TouchableOpacity
      style={{
        backgroundColor: theme.button,
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 8,
        alignItems: "center",
        minHeight: 44,
      }}
      {...props}
    >
      <GymText>{children}</GymText>
    </TouchableOpacity>
  );
}

/**
 * Large button component
 */
export function GymButtonFullLarge({
  children,
  ...props
}: TouchableOpacityProps) {
  const theme = getThemeColor(useColorScheme());

  return (
    <TouchableOpacity
      style={{
        backgroundColor: theme.button,
        paddingVertical: 16,
        paddingHorizontal: 32,
        borderRadius: 8,
        alignItems: "center",
        minHeight: 52,
      }}
      {...props}
    >
      <GymText>{children}</GymText>
    </TouchableOpacity>
  );
}
