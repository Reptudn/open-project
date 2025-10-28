import { supabase } from "@/lib/supabase";
import { Result } from "@/types/ErrorHandling";

export async function getProfile(id: string): Promise<Result<Profile>> {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", id)
    .single();

  if (error) return { data: null, error: error.message };

  return { data: data as Profile, error: null };
}
