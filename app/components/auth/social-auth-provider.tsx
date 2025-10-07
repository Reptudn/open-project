import { supabase } from "@/lib/supabase";
import type { Provider } from "@supabase/supabase-js";
import * as WebBrowser from "expo-web-browser";
import * as Linking from "expo-linking";

export default async function signInWithProvider(provider: Provider) {
  const redirectUri = Linking.createURL(`${provider}-auth`);

  const res = await supabase.auth.signInWithOAuth({
    provider,
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
  return;
}

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
