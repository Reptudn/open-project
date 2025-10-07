import { TouchableOpacity, StyleSheet } from "react-native";
import { Image } from "expo-image";
import { useEffect } from "react";
import { Text } from "@react-navigation/elements";
import * as WebBrowser from "expo-web-browser";
import { supabase } from "@/lib/supabase";
import * as Linking from 'expo-linking';

WebBrowser.maybeCompleteAuthSession();

export default function GoogleSignInButton() {
  function extractParamsFromUrl(url: string) {
    const parsedUrl = new URL(url);
    const hash = parsedUrl.hash.substring(1);
    const params = new URLSearchParams(hash);

    return {
      access_token: params.get("access_token"),
      expires_in: parseInt(params.get("expires_in") || "0"),
      refresh_token: params.get("refresh_token"),
      token_type: params.get("token_type"),
      provider_token: params.get("provider_token"),
      code: params.get("code"),
    };
  }
  async function onSignInButtonPress() {
    const redirectUri = Linking.createURL('google-auth');

    const res = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: redirectUri,
        queryParams: { prompt: "consent" },
        skipBrowserRedirect: true,
      },
    });

    if (!res.data.url) {
      console.error("no oauth url found!");
      return;
    }

    const result = await WebBrowser.openAuthSessionAsync(
      res.data.url,
      redirectUri,
      { showInRecents: true }
    );

    if (result && result.type === "success") {
      const params = extractParamsFromUrl(result.url);
      if (params.access_token && params.refresh_token) {
        await supabase.auth.setSession({
          access_token: params.access_token,
          refresh_token: params.refresh_token,
        });
        return;
      }
    }
  }

  useEffect(() => {
    WebBrowser.warmUpAsync();
    return () => {
      WebBrowser.coolDownAsync();
    };
  }, []);

  return (
    <TouchableOpacity
      onPress={onSignInButtonPress}
      style={styles.button}
      activeOpacity={0.8}
    >
      <Image
        source={{
          uri: "https://developers.google.com/identity/images/g-logo.png",
        }}
        style={styles.image}
      />
      <Text style={styles.text}>Sign in with Google</Text>
    </TouchableOpacity>
  );
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
