import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.EXPO_PUBLIC_URL || "default";
const supabaseKey = process.env.EXPO_PUBLIC_KEY || "default";

export default createClient(supabaseUrl, supabaseKey);
