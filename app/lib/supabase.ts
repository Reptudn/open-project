import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.SUPABASE_URL || "default";
const supabaseKey = process.env.SUPABASE_KEY || "default";

export default createClient(supabaseUrl, supabaseKey);
