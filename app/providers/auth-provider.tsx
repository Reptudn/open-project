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
    let mounted = true;

    const init = async () => {
      setLoading(true);
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();
        if (!mounted) return;
        setSession(session ?? null);
      } catch (err) {
        console.error("AuthProvider getSession error", err);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    init();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!mounted) return;
      setSession(session ?? null);
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    let cancelled = false;

    const loadProfile = async () => {
      setLoading(true);
      try {
        if (session) {
          const prof = await getUser(session.user.id);
          if (!cancelled) setProfile(prof);
        } else {
          if (!cancelled) setProfile(null);
        }
      } catch (err) {
        console.error("AuthProvider getUser error", err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    loadProfile();

    return () => {
      cancelled = true;
    };
  }, [session]);

  return (
    <AuthContext.Provider
      value={{ session, profile, isLoading, isLoggedIn: session != null }}
    >
      {children}
    </AuthContext.Provider>
  );
}
