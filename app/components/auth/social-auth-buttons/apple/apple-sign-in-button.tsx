import { supabase } from "@/lib/supabase";
import * as AppleAuthentication from "expo-apple-authentication";
import { Platform, TouchableOpacity, StyleSheet } from "react-native";
import signInWithProvider from "../../social-auth-provider";
import { Image } from "expo-image";
import { Text } from "@react-navigation/elements";

export default function AppleSignInButton() {
  if (Platform.OS === "ios") {
    async function onPressButton() {
      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
      });

      if (credential.identityToken) {
        const { error } = await supabase.auth.signInWithIdToken({
          provider: "apple",
          token: credential.identityToken,
        });

        if (error) {
          console.error(error.message);
        }
      }
    }
    return (
      <AppleAuthentication.AppleAuthenticationButton
        buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
        buttonStyle={
          AppleAuthentication.AppleAuthenticationButtonStyle.WHITE_OUTLINE
        }
        cornerRadius={5}
        style={{ width: 200, height: 64 }}
        onPress={onPressButton}
      />
    );
  } else {
    return (
      <TouchableOpacity
        onPress={async () => {
          await signInWithProvider("apple");
        }}
        style={styles.button}
        activeOpacity={0.8}
      >
        <Image
          source={{
            uri: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg",
          }}
          style={styles.image}
        />
        <Text style={styles.text}>Sign in with Apple</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#dbdbdb",
    borderRadius: 4,
    paddingVertical: 10,
    paddingHorizontal: 15,
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  image: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  text: {
    fontSize: 16,
    color: "#757575",
    fontFamily: "Roboto-Regular",
    fontWeight: "500",
  },
});
