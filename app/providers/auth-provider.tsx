import { AuthContext } from "@/hooks/use-auth-context";
import { registerProfile } from "@/lib/api/profile/profileInsert";
import { getProfile } from "@/lib/api/profile/profileSelecte";
import { supabase } from "@/lib/supabase";
import { Session } from "@supabase/supabase-js";
import { PropsWithChildren, useEffect, useState } from "react";
import { Alert } from "react-native";

export default function AuthProvider({ children }: PropsWithChildren) {
  const [nowSession, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      setLoading(true);
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();
      if (error) {
        console.error("AuthProvider getSession error", error.message);
        return;
      }
      setSession(session);
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        const { data } = await getProfile();
        if (data) setProfile(data);
      }
      setLoading(false);
    };

    init();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setLoading(true);
      setSession(session ?? null);

      if (nowSession) {
        const { data } = await getProfile();
        if (data) setProfile(data);
      } else setProfile(null);

      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    const loadProfile = async () => {
      setLoading(true);
      if (nowSession) {
        const { data } = await getProfile();
        if (data) setProfile(data);
      } else setProfile(null);
      setLoading(false);
    };

    loadProfile();
  }, [nowSession]);

  const updateProfile = async (updates: InsertProfile) => {
    const { data, error } = await registerProfile(updates, nowSession);

    if (!data && error) {
      Alert.alert(error);
    } else {
      setProfile(data);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        session: nowSession,
        profile,
        isLoading,
        isLoggedIn: nowSession != null,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
