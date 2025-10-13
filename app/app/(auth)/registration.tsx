import { supabase } from "@/lib/supabase";
import { useState } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  Text,
  useColorScheme,
} from "react-native";
import GoogleSignInButton from "@/components/auth/social-auth-buttons/google/google-sign-in-button";
import { router } from "expo-router";
import { registerProfile } from "@/lib/api/workoutTableUtils";
import { ThemeColors } from "@/constants/theme";

export default function Registration() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const colorScheme = useColorScheme();
  const styles = getStyles(colorScheme === "dark");

  async function signUpWithEmail() {
    setLoading(true);
    if (!email || !password)
      Alert.alert("You need to enter a Email and Password");
    else {
      const {
        data: { user },
        error,
      } = await supabase.auth.signUp({
        email: email,
        password: password,
      });

      if (error) Alert.alert(error.message);
      // else await registerProfile(user?.id);
    }
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
        <Text style={styles.infoText}>Confirm your Password</Text>
        <TextInput
          style={styles.input}
          placeholder="starwars"
          value={password}
          onChangeText={setPassword}
          autoCapitalize={"none"}
          secureTextEntry={true}
        />
        <TouchableOpacity
          style={styles.button}
          disabled={loading}
          onPress={signUpWithEmail}
          activeOpacity={0.7}
        >
          <Text style={styles.loginText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.bottomContainer}>
        <Text
          style={[styles.infoText, { alignSelf: "center" }]}
          onPress={() => {
            router.push("./login");
          }}
        >
          Have already an account? Sign In
        </Text>
        <Text style={[styles.infoText, { alignSelf: "center" }]}>or</Text>
        <GoogleSignInButton />
      </View>
    </View>
  );
}

const getStyles = (isDark: boolean) =>
  StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      gap: 10,
    },
    topContainer: {
      marginTop: "50%",
      gap: 15,
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
      borderColor: isDark
        ? ThemeColors.dark.borderTopColor
        : ThemeColors.light.borderTopColor,
      color: isDark
        ? ThemeColors.dark.borderTopColor
        : ThemeColors.light.borderTopColor,
    },
    button: {
      backgroundColor: isDark
        ? ThemeColors.dark.button
        : ThemeColors.light.button,
      width: 352,
      height: 56.32,
      borderRadius: 17.6,
      alignItems: "center",
      justifyContent: "center",
    },
    infoText: {
      color: isDark ? ThemeColors.dark.text : ThemeColors.light.text,
    },
    loginText: {
      color: isDark ? ThemeColors.dark.text : ThemeColors.light.text,
      fontWeight: "bold",
      fontSize: 16,
    },
  });
