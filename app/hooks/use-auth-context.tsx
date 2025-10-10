import { Profile } from "@/lib/api/workoutTableUtils";
import { Session } from "@supabase/supabase-js";
import { createContext, useContext } from "react";

export type AuthData = {
  session: Session | null;
  profile: Profile | null;
  isLoading: boolean;
  isLoggedIn: boolean;
};

export const AuthContext = createContext<AuthData>({
  session: null,
  profile: null,
  isLoading: true,
  isLoggedIn: false,
});

export const useAuthContext = () => useContext(AuthContext);
