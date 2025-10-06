import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, useColorScheme, Text } from "react-native";
import Auth from "@/components/auth/Auth";
import AuthProvider from "@/providers/auth-provider";
import { SplashScreenController } from "@/components/auth/splash-screen-controller";
import { useAuthContext } from "@/hooks/use-auth-context";

export const unstable_settings = {
  anchor: "(tabs)",
};

function AppContent() {
  const colorScheme = useColorScheme();
  const { isLoggedIn } = useAuthContext();

  const themeContainerStyle =
    colorScheme === "light" ? styles.lightContainer : styles.darkContainer;

  if (isLoggedIn) {
    return (
      <View style={[styles.container, themeContainerStyle]}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
        <StatusBar style="auto" />
      </View>
    );
  }
  return <Auth />;
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <SplashScreenController />
      <AppContent />
    </AuthProvider>
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
