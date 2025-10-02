import React from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import { useColorScheme } from "@/hooks/use-color-scheme";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function LoadingScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: isDark ? "#242c40" : "#d0d0c0" },
      ]}
    >
      <View
        style={[
          styles.logoContainer,
          { backgroundColor: isDark ? "#404040" : "#f0f0f0" },
        ]}
      >
        <Ionicons
          name="fitness"
          size={60}
          color={isDark ? "#d0d0c0" : "#242c40"}
        />
      </View>
      <Text
        style={[styles.appTitle, { color: isDark ? "#d0d0c0" : "#242c40" }]}
      >
        FitTracker
      </Text>
      <ActivityIndicator
        size="large"
        color={isDark ? "#d0d0c0" : "#242c40"}
        style={styles.spinner}
      />
      <Text
        style={[styles.loadingText, { color: isDark ? "#8a8a8a" : "#666666" }]}
      >
        Loading your fitness journey...
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logoContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  appTitle: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 40,
  },
  spinner: {
    marginBottom: 20,
  },
  loadingText: {
    fontSize: 16,
    textAlign: "center",
  },
});
