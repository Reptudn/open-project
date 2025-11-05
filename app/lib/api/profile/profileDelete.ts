import { Result } from "@/types/ErrorHandling";
import { Session } from "@supabase/supabase-js";

export async function deleteProfile(
  session: Session | null
): Promise<Result<boolean>> {
  if (!session) return { data: null, error: "No Session found" };

  const user_id = session.user.id;

  const response = await fetch(
    "https://tegfwlejpnjfcyyppogf.supabase.co/functions/v1/setProfile",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user_id),
    }
  );

  const json = await response.json();

  if (!response.ok || json.message) {
    return { data: null, error: json.message };
  }
  return { data: true, error: null };
}
