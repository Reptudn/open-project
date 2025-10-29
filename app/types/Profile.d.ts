interface Profile {
  id: string;
  username?: string;
  full_name?: string;
  gender?: string;
  birth_date?: Date;
  height_cm?: number;
  weight_kg?: number;
  created_at: string;
  updated_at: string;
}

interface InsertProfile {
  id: string;
  username?: string;
  full_name?: string;
  gender?: string;
  birth_date?: Date;
  height_cm?: number;
  weight_kg?: number;
}
