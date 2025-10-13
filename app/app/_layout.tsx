import { ThemeColors } from "@/constants/theme";
import { useAuthContext } from "@/hooks/use-auth-context";
import AuthProvider from "@/providers/auth-provider";
import { router, Slot } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { ReactNode, useEffect } from "react";
import { StyleSheet, View, useColorScheme } from "react-native";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <InnerLayout />
      <StatusBar style="auto" />
    </AuthProvider>
  );
}

function InnerLayout() {
  const { isLoggedIn, isLoading } = useAuthContext();
  const colorScheme = useColorScheme();
  const styles = setStyles(colorScheme === "dark");

  useEffect(() => {
    if (!isLoading) {
      router.replace(isLoggedIn ? "/(tabs)" : "/(auth)/registration");
    }
  }, [isLoading, isLoggedIn]);

  return (
    <View style={styles.container}>
      <Slot />
    </View>
  );
}

const setStyles = (isDark: boolean) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDark ? ThemeColors.dark.background : ThemeColors.light.background,
    },
    text: {
      fontSize: 20,
    },
    lightContainer: {
      backgroundColor: "#d0d0c0",
    },
    darkContainer: {
      backgroundColor: "#242c40",
    },
    lightThemeText: {
      color: "#242c40",
    },
    darkThemeText: {
      color: "#d0d0c0",
    },
  });
