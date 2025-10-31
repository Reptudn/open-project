import { supabase } from "@/lib/supabase";
import { Result } from "@/types/ErrorHandling";
import { Session } from "@supabase/supabase-js";

export async function getProfile(): Promise<Result<Profile>> {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .single();

  if (error) return { data: null, error: error.message };

  return { data: data as Profile, error: null };
}
