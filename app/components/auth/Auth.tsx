import { supabase } from "@/lib/supabase";
import { Alert } from "react-native";

export async function logOut() {
  const { error } = await supabase.auth.signOut();

  if (error) Alert.alert(error.message);
}
