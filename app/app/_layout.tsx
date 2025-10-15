import { SplashScreenController } from "@/components/auth/splash-screen-controller";
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
      <SplashScreenController />
      <InnerLayout />
      <StatusBar style="auto" />
    </AuthProvider>
  );
}

function InnerLayout() {
  const { isLoggedIn, isLoading, profile } = useAuthContext();
  const colorScheme = useColorScheme();
  const styles = setStyles(colorScheme === "dark");

  useEffect(() => {
    if (isLoading) return;

    if (!isLoggedIn) {
      router.replace("/(auth)/registration");
    } else if (!profile) {
      router.replace("/(auth)/profile");
    } else {
      router.replace("/(tabs)");
    }
  }, [isLoading, isLoggedIn, profile]);
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
      backgroundColor: isDark
        ? ThemeColors.dark.background
        : ThemeColors.light.background,
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
