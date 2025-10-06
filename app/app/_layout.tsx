import React, { useState } from "react";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, useColorScheme, TextInput, Button } from "react-native";
import { signUpUser } from "@/lib/authUser";
// import { AuthProvider, useAuth } from "../contexts/AuthContext";
// import LoadingScreen from "../components/LoadingScreen";

export const unstable_settings = {
  anchor: "(tabs)",
};

function AppContent() {
  const colorScheme = useColorScheme();
  // const { isAuthenticated, isLoading } = useAuth();

  const themeContainerStyle =
    colorScheme === "light" ? styles.lightContainer : styles.darkContainer;

  // Show loading screen while checking authentication
  // if (isLoading) {
  //   return <LoadingScreen />;
  // }

  // Login
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [confirmPass, setConfirm] = useState("");

  const checkSignUp = async () => {
    if (!email || !pass) {
        alert("You need to fill email and password!");
    }
    else {
      const data = await signUpUser(email, pass);
      alert(data);
    }
  };
  const googleSignUp = async () => {
    
  };
  return (
    <View style={[login.container, themeContainerStyle]}>
      <TextInput 
        style={login.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}/>
      <TextInput 
        style={login.input}
        placeholder="Password"
        value={pass}
        onChangeText={setPass}/>
      <TextInput 
        style={login.input}
        placeholder="Confirm Password"
        value={confirmPass}
        onChangeText={setConfirm}/>
      <Button
        title="Continue with Google"
        onPress={googleSignUp}/>
      <Button
        title="Continue with Apple"
        onPress={googleSignUp}/>
      <Button
        title="Continue with Facebook"
        onPress={googleSignUp}/>
      <Button
        title="Sign Up"
        onPress={checkSignUp}/>
    </View>
  );
  // Show main app if authenticated
  // return (
  //   <View style={[styles.container, themeContainerStyle]}>
  //   <View style={[styles.container, themeContainerStyle]}>
  //     <Stack>
  //       <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
  //       {/* <Stack.Screen name="login" options={{ headerShown: false }} /> */}
  //       {/* <Stack.Screen name="login" options={{ headerShown: false }} /> */}
  //     </Stack>
  //     <StatusBar style="auto" />
  //   </View>
  // );
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

const login = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: "20",
  },
  input: {
    width: "80%",
    height: 50,
    borderColor: "#d0d0c0",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    fontSize: 16,
  },
});