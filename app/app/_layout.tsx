import { useAuthContext } from "@/hooks/use-auth-context";
import AuthProvider from "@/providers/auth-provider";
import { router, Slot } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { ReactNode, useEffect } from "react";
import { StyleSheet, View, useColorScheme } from "react-native";

export default function RootLayout({ children }: { children: ReactNode }) {
  const colorScheme = useColorScheme();

  const themeContainerStyle =
    colorScheme === "light" ? styles.lightContainer : styles.darkContainer;

  return (
    <AuthProvider>
      <InnerLayout themeContainerStyle={themeContainerStyle} />
      <StatusBar style="auto" />
    </AuthProvider>
  );
}

function InnerLayout({ themeContainerStyle }: { themeContainerStyle: any }) {
  const { isLoggedIn, isLoading } = useAuthContext();

  useEffect(() => {
    if (!isLoading) {
      router.replace(isLoggedIn ? "/(tabs)" : "/(auth)/registration");
    }
  }, [isLoading, isLoggedIn]);

  return (
    <View style={[styles.container, themeContainerStyle]}>
      <Slot />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
