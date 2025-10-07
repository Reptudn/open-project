import { supabase } from "@/lib/supabase";
import { useState, useEffect } from "react";
import { Alert, StyleSheet, TextInput, Button, View } from "react-native";
import { setUser } from "@/lib/workoutTableUtils";
import GoogleSignInButton from "./social-auth-buttons/google/google-sign-in-button";
import AppleSignInButton from "./social-auth-buttons/apple/apple-sign-in-button";
import * as WebBrowser from "expo-web-browser";
import FacebookSignInButton from "./social-auth-buttons/facebook/facebook-sign-in-button";

WebBrowser.maybeCompleteAuthSession();

export default function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function signInWithEmail() {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) Alert.alert(error.message);
    setLoading(false);
  }

  async function signUpWithEmail() {
    setLoading(true);
    const {
      data: { user },
      error,
    } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (error) Alert.alert(error.message);
    if (user) await setUser({ id: user.id });
    setLoading(false);
  }

  useEffect(() => {
    WebBrowser.warmUpAsync();
    return () => {
      WebBrowser.coolDownAsync();
    };
  }, []);

  return (
    <View style={styles.container}>
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          autoCapitalize={"none"}
        />
      </View>
      <View style={styles.verticallySpaced}>
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          autoCapitalize={"none"}
          secureTextEntry={true}
        />
      </View>
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <Button title="Sign in" disabled={loading} onPress={signInWithEmail} />
      </View>
      <View style={styles.verticallySpaced}>
        <Button title="Sign up" disabled={loading} onPress={signUpWithEmail} />
      </View>
      <GoogleSignInButton />
      <AppleSignInButton />
      <FacebookSignInButton />
    </View>
  );
}

export async function logOut() {
  const { error } = await supabase.auth.signOut();

  if (error) Alert.alert(error.message);
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    padding: 12,
  },
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: "stretch",
  },
  mt20: {
    marginTop: 20,
  },
  input: {
    width: "80%",
    height: 50,
    borderColor: "#d0d0c0",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    fontSize: 16,
    color: "#d0d0c0",
  },
});
