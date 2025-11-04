import { getThemeColor } from "@/constants/theme";
import { TextProps, useColorScheme, View } from "react-native";
import { ReactNode } from "react";

type IGymView = TextProps & {
  children: ReactNode;
};

export default function GymView({children, ...props}: IGymView) {
  const theme = getThemeColor(useColorScheme());
  return <View style={{ backgroundColor: theme.background, flex: 1, padding: 20 }}>
	{children}
  </View>;
}
