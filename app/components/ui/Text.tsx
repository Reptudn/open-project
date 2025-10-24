import { Text, TextProps, useColorScheme } from "react-native";
import type { ReactNode } from "react";
import { getThemeColor } from "@/constants/theme";

type GymTextProps = TextProps & {
  children: ReactNode;
};

/**
 * Basic themed text component with automatic color theming
 * @param children - The text content to display
 * @param props - Additional Text component props
 * @returns A Text component with theme colors applied
 * @example
 * ```tsx
 * <GymText>Hello World</GymText>
 * <GymText className="text-lg">Large text</GymText>
 * ```
 */
export function GymText({ children, ...props }: GymTextProps) {
  const theme = getThemeColor(useColorScheme());

  return (
    <Text style={{ color: theme.text }} className="font-normal text-xl" {...props}>
      {children}
    </Text>
  );
}

/**
 * Title variant of themed text component
 * @param children - The title text to display
 * @param props - Additional Text component props
 * @returns A Text component styled for titles
 */
export function GymTitle({ children, ...props }: GymTextProps) {
  const theme = getThemeColor(useColorScheme());

  return (
    <Text style={{ color: theme.text }} className="font-bold text-4xl" {...props}>
      {children}
    </Text>
  );
}

/**
 * Header variant of themed text component
 * @param children - The header text to display
 * @param props - Additional Text component props
 * @returns A Text component styled for headers
 */
export function GymHeader({ children, ...props }: GymTextProps) {
  const theme = getThemeColor(useColorScheme());

  return (
    <Text style={{ color: theme.text }} className="font-semibold text-2xl" {...props}>
      {children}
    </Text>
  );
}
