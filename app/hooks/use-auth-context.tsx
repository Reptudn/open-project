import { Profile } from "@/lib/api/workout/workoutTableInsert";
import { Session } from "@supabase/supabase-js";
import { createContext, useContext } from "react";

export type AuthData = {
  session: Session | null;
  profile: Profile | null;
  isLoading: boolean;
  isLoggedIn: boolean;
  updateProfile: (updates: Profile) => Promise<void>;
};

export const AuthContext = createContext<AuthData>({
  session: null,
  profile: null,
  isLoading: true,
  isLoggedIn: false,
  updateProfile: async () => {
    throw new Error("updateProfile not implemented");
  },
});

export const useAuthContext = () => useContext(AuthContext);
