import React, { useState } from "react";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, useColorScheme } from "react-native";
import SignUpPage from "../components/auth/signUp";
// import { AuthProvider, useAuth } from "../contexts/AuthContext";
// import LoadingScreen from "../components/LoadingScreen";

export const unstable_settings = {
  anchor: "(tabs)",
};

function AppContent() {
  const colorScheme = useColorScheme();
  // // const { isAuthenticated, isLoading } = useAuth();

  const themeContainerStyle =
    colorScheme === "light" ? styles.lightContainer : styles.darkContainer;

  // // Show loading screen while checking authentication
  // // if (isLoading) {
  // //   return <LoadingScreen />;
  // // }

  // // Show main app if authenticated
  // return <SignUpPage />;
  // return (
  //   <View style={[styles.container, themeContainerStyle]}>
  //     <Stack>
  //       <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
  //       {/* <Stack.Screen name="login" options={{ headerShown: false }} /> */}
  //       {/* <Stack.Screen name="login" options={{ headerShown: false }} /> */}
  //     </Stack>
  //     <StatusBar style="auto" />
  //   </View>
  // );
  return (
    <View style={[styles.container, themeContainerStyle]}>
      <SignUpPage />
    </View>
  );
}

export default function RootLayout() {
  return (
    // <AuthProvider>
    <AppContent />
    // </AuthProvider>
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
