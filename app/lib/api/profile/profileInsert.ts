import { Result } from "@/types/ErrorHandling";
import { Session } from "@supabase/supabase-js";

export async function registerProfile(
  profile: InsertProfile,
  session: Session | null
): Promise<Result<Profile>> {
  if (!session) return { data: null, error: "No Session found" };

  const body = {
    id: profile.id,
    username: profile.username,
    full_name: profile.full_name,
    gender: profile.gender,
    birth_date: profile.birth_date,
    height_cm: profile.height_cm,
    weight_kg: profile.weight_kg,
  };

  const response = await fetch(
    "https://tegfwlejpnjfcyyppogf.supabase.co/functions/v1/setProfile",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.access_token}`,
      },
      body: JSON.stringify(body),
    }
  );

  const json = await response.json();

  if (!response.ok || json.message) {
    return { data: null, error: json.message };
  }
  return { data: json.data as Profile, error: null };
}
