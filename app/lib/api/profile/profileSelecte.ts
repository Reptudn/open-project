import { supabase } from "@/lib/supabase";
import { Result } from "@/types/ErrorHandling";
import { Session } from "@supabase/supabase-js";

export async function getProfile(session: Session | null): Promise<Result<Profile>> {
  if (!session) return {data: null, error: "No Session Found"}

  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", session.user.id)
    .single();

  if (error) return { data: null, error: error.message };

  return { data: data as Profile, error: null };
}
