import { supabase } from "@/lib/supabase";
import { Result } from "@/types/ErrorHandling";

export async function updateProfile(
  update: InsertProfile
): Promise<Result<Profile>> {
  const upProfile: any = {};

  if (update.username !== undefined) upProfile.username = update.username;
  if (update.full_name !== undefined) upProfile.full_name = update.full_name;
  if (update.gender !== undefined) upProfile.gender = update.gender;
  if (update.birth_date !== undefined) upProfile.birth_date = update.birth_date;
  if (update.height_cm !== undefined) upProfile.height_cm = update.height_cm;
  if (update.weight_kg !== undefined) upProfile.weight_kg = update.weight_kg;

  const { data, error } = await supabase.from("profile").update(upProfile).select().single();

  if (error) return { data: null, error: error.message };

  return { data: data as Profile, error: null };
}
