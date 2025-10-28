import { supabase } from "@/lib/supabase";

export async function getProfile(id: string): Promise<Profile | null> {
  const { data, error } = await supabase
	.from("profiles")
	.select("*")
	.eq("id", id)
	.maybeSingle();

  if (error) {
	console.error("Problem loading User Table", error.message);
	return null;
  }
  return data;
}