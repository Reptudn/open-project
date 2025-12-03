export interface DBProduct {
  barcode: string;
  name?: string;
  brand?: string;
  image_url?: string;
  nutriments?: ProductNutriments;
  source?: string;
}

export interface FoodsTableEntry {
  id: number;
  created_at: Date;
  barcode_id: {
    barcode: string;
    name?: string;
    brand?: string;
    image_url?: string;
    nutriments?: ProductNutriments;
    categories?: string[];
    source?: string;
    created_at?: Date;
  };
  amount_in_g: number;
  type: MealType;
}
