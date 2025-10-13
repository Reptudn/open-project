import { supabase } from "@/lib/supabase";
import { useState } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  Text,
} from "react-native";
import GoogleSignInButton from "@/components/auth/social-auth-buttons/google/google-sign-in-button";
import { router } from "expo-router";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function signInWithEmail() {
    setLoading(true);
    if (!email || !password)
      Alert.alert("You need to fill in a Email and a Password");

    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) Alert.alert(error.message);

    setLoading(false);
  }

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <Text style={styles.infoText}>Enter your Email</Text>
        <TextInput
          style={styles.input}
          placeholder="example@wtf.com"
          value={email}
          onChangeText={setEmail}
          autoCapitalize={"none"}
        />
        <Text style={styles.infoText}>Enter your Password</Text>
        <TextInput
          style={styles.input}
          placeholder="starwars"
          value={password}
          onChangeText={setPassword}
          autoCapitalize={"none"}
          secureTextEntry={true}
        />
        <Text
          style={[styles.infoText, { alignSelf: "flex-end" }]}
          onPress={() => {}}
        >
          forgot Password?
        </Text>
        <TouchableOpacity
          style={styles.button}
          disabled={loading}
          onPress={signInWithEmail}
          activeOpacity={0.7}
        >
          <Text style={styles.loginText}>Sign In</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.bottomContainer}>
        <Text
          style={[styles.infoText, { alignSelf: "center" }]}
          onPress={() => {
            router.back();
          }}
        >
          Don’t have an account? Sign Up
        </Text>
        <Text style={[styles.infoText, { alignSelf: "center" }]}>or</Text>
        <GoogleSignInButton />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    gap: 10,
  },
  topContainer: {
    marginTop: "50%",
    gap: 10,
  },
  bottomContainer: {
    gap: 10,
  },
  input: {
    width: 352,
    height: 56.32,
    borderRadius: 17.6,
    borderWidth: 1,
    textAlign: "center",
    borderColor: "#d0d0c0",
    color: "#d0d0c0",
  },
  button: {
    backgroundColor: "#d0d0c0",
    width: 352,
    height: 56.32,
    borderRadius: 17.6,
    alignItems: "center",
    justifyContent: "center",
  },
  infoText: {
    color: "#d0d0c0",
  },
  loginText: {
    color: "#242c40",
    fontWeight: "bold",
    fontSize: 16,
  },
});
