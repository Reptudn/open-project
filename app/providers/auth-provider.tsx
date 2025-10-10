import { AuthContext } from "@/hooks/use-auth-context";
import { supabase } from "@/lib/supabase";
import { getUser, Profile } from "@/lib/api/workoutTableUtils";
import { Session } from "@supabase/supabase-js";
import { PropsWithChildren, useEffect, useState } from "react";

export default function AuthProvider({ children }: PropsWithChildren) {
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });
    setLoading(false);

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    setLoading(true);
    if (session) {
      getUser(session.user.id).then((profile) => {
        setProfile(profile);
      });
    } else setProfile(null);
    setLoading(false);
  }, [session]);

  return (
    <AuthContext.Provider
      value={{ session, profile, isLoading, isLoggedIn: session != null }}
    >
      {children}
    </AuthContext.Provider>
  );
}
