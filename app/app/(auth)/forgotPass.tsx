import { ThemeColors } from "@/constants/theme";
import { supabase } from "@/lib/supabase";
import { router } from "expo-router";
import { useState } from "react";
import {
  View,
  StyleSheet,
  useColorScheme,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";

export default function ForgotPass() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const colorScheme = useColorScheme();
  const styles = getStyles(colorScheme === "dark");
  async function resetPassword() {
    setLoading(true);
    if (!email) Alert.alert("You need to enter a Email");
    else {
      const { error } = await supabase.auth.resetPasswordForEmail(email);
      if (error) Alert.alert(error.message);
      else Alert.alert(email);
    }
    setLoading(false);
  }

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={styles.infoText}>
          Please enter your email to reset the password
        </Text>
        <Text style={styles.infoText}>Your Email</Text>
        <TextInput
          style={styles.input}
          placeholder="example@wtf.com"
          value={email}
          onChangeText={setEmail}
          autoCapitalize={"none"}
        />
        <TouchableOpacity
          style={styles.button}
          disabled={loading}
          onPress={resetPassword}
          activeOpacity={0.7}
        >
          <Text style={styles.loginText}>Reset Password</Text>
        </TouchableOpacity>
        <Text
          style={[styles.infoText, { alignSelf: "center" }]}
          onPress={() => {
            router.back();
          }}
        >
          Go back to SignIn
        </Text>
      </View>
    </View>
  );
}

const getStyles = (isDark: boolean) =>
  StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
    },
    innerContainer: {
      marginTop: "50%",
      gap: 10,
    },
    infoText: {
      color: isDark ? ThemeColors.dark.text : ThemeColors.light.text,
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
    loginText: {
      color: isDark ? ThemeColors.dark.text : ThemeColors.light.text,
      fontWeight: "bold",
      fontSize: 16,
    },
  });
