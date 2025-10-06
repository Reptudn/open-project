import React from "react";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Text, StyleSheet, View } from "react-native";
import { ThemeProvider, useTheme } from "../contexts/ThemeContext";

export const unstable_settings = {
  anchor: "(tabs)",
};

function RootLayoutContent() {
  const { effectiveTheme } = useTheme();

  const themeContainerStyle =
    effectiveTheme === "light" ? styles.lightContainer : styles.darkContainer;

  return (
    <View style={[styles.container, themeContainerStyle]}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
      <StatusBar style="auto" />
    </View>
  );
}

export default function RootLayout() {
  return (
    <ThemeProvider>
      <RootLayoutContent />
    </ThemeProvider>
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
