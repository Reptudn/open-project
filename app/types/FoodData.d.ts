enum MealType {
  BREAKFAST,
  LUNCH,
  DINNER,
  SNACK,
}

// Nutriments interface for nutritional information
interface ProductNutriments {
  // Basic macronutrients
  carbohydrates?: number;
  carbohydrates_unit?: string;
  carbohydrates_value?: number;
  carbohydrates_100g?: number;
  carbohydrates_serving?: number;

  // Energy values
  energy?: number;
  energy_100g?: number;
  energy_serving?: number;
  energy_unit?: string;
  energy_value?: number;

  "energy-kcal"?: number;
  "energy-kcal_100g"?: number;
  "energy-kcal_serving"?: number;
  "energy-kcal_unit"?: string;
  "energy-kcal_value"?: number;
  "energy-kcal_value_computed"?: number;

  "energy-kj"?: number;
  "energy-kj_100g"?: number;
  "energy-kj_serving"?: number;
  "energy-kj_unit"?: string;
  "energy-kj_value"?: number;
  "energy-kj_value_computed"?: number;

  // Fat content
  fat?: number;
  fat_unit?: string;
  fat_value?: number;
  fat_100g?: number;
  fat_serving?: number;

  "saturated-fat"?: number;
  "saturated-fat_100g"?: number;
  "saturated-fat_serving"?: number;
  "saturated-fat_unit"?: string;
  "saturated-fat_value"?: number;

  // Fiber
  fiber?: number;
  fiber_unit?: string;
  fiber_value?: number;
  fiber_100g?: number;
  fiber_serving?: number;

  // Proteins
  proteins?: number;
  proteins_unit?: string;
  proteins_value?: number;
  proteins_100g?: number;
  proteins_serving?: number;

  // Salt and sodium
  salt?: number;
  salt_unit?: string;
  salt_value?: number;
  salt_100g?: number;
  salt_serving?: number;

  sodium?: number;
  sodium_unit?: string;
  sodium_value?: number;
  sodium_100g?: number;
  sodium_serving?: number;

  // Sugars
  sugars?: number;
  sugars_unit?: string;
  sugars_value?: number;
  sugars_100g?: number;
  sugars_serving?: number;

  // Vitamins
  "vitamin-b12"?: number;
  "vitamin-b12_100g"?: number;
  "vitamin-b12_serving"?: number;
  "vitamin-b12_unit"?: string;
  "vitamin-b12_value"?: number;

  "vitamin-b2"?: number;
  "vitamin-b2_100g"?: number;
  "vitamin-b2_serving"?: number;
  "vitamin-b2_unit"?: string;
  "vitamin-b2_value"?: number;

  "vitamin-b6"?: number;
  "vitamin-b6_100g"?: number;
  "vitamin-b6_serving"?: number;
  "vitamin-b6_unit"?: string;
  "vitamin-b6_value"?: number;

  "vitamin-pp"?: number;
  "vitamin-pp_100g"?: number;
  "vitamin-pp_serving"?: number;
  "vitamin-pp_unit"?: string;
  "vitamin-pp_value"?: number;

  // Other nutrients
  biotin?: number;
  biotin_100g?: number;
  biotin_serving?: number;
  biotin_unit?: string;
  biotin_value?: number;

  caffeine?: number;
  caffeine_100g?: number;
  caffeine_serving?: number;
  caffeine_unit?: string;
  caffeine_value?: number;

  // Nutritional scores and estimates
  "nova-group"?: number;
  "nova-group_100g"?: number;
  "nova-group_serving"?: number;

  "nutrition-score-fr"?: number;
  "nutrition-score-fr_100g"?: number;

  "fruits-vegetables-legumes-estimate-from-ingredients_100g"?: number;
  "fruits-vegetables-legumes-estimate-from-ingredients_serving"?: number;
  "fruits-vegetables-nuts-estimate-from-ingredients_100g"?: number;
  "fruits-vegetables-nuts-estimate-from-ingredients_serving"?: number;
}

// Ecoscore data structure
interface EcoscoreData {
  adjustments: any[];
  environmental_score_not_applicable_for_category?: string;
  grade: string;
  missing: any;
  scores: any;
  status: string;
}

// Nutriscore data structure
interface NutriscoreData {
  components: any;
  count_proteins: number;
  count_proteins_reason: string;
  grade: string;
  is_beverage: number;
  is_cheese: number;
  is_fat_oil_nuts_seeds: number;
  is_red_meat_product: number;
  is_water: number;
  negative_points: number;
  negative_points_max: number;
  positive_nutrients: string[];
  positive_points: number;
  positive_points_max: number;
  score: number;
}

// Nutriscore versions structure
interface Nutriscore {
  "2021": NutriscoreData;
  "2023": NutriscoreData;
}

// Ingredients analysis structure
interface IngredientsAnalysis {
  "en:may-contain-palm-oil"?: string[];
  "en:vegan-status-unknown"?: string[];
  "en:vegetarian-status-unknown"?: string[];
}

// Language information
interface Languages {
  "en:english"?: number;
  "en:german"?: number;
  "en:spanish"?: number;
  [key: string]: number | undefined;
}

interface LanguagesCodes {
  de?: number;
  en?: number;
  es?: number;
  [key: string]: number | undefined;
}

// Nova groups markers
interface NovaGroupsMarkers {
  "3"?: string[];
  "4"?: string[];
  [key: string]: string[] | undefined;
}

// Nutrient levels
interface NutrientLevels {
  fat?: string;
  salt?: string;
  "saturated-fat"?: string;
  sugars?: string;
}

// Categories properties
interface CategoriesProperties {
  "agribalyse_proxy_food_code:en"?: string;
  "ciqual_food_code:en"?: string;
}

// Category properties
interface CategoryProperties {
  "ciqual_food_name:en"?: string;
  "ciqual_food_name:fr"?: string;
}

// Packaging materials breakdown
interface PackagingMaterials {
  all: any;
  "en:metal"?: any;
  [key: string]: any;
}

// Image structure
interface ProductImages {
  [key: string]: any;
}

// Selected images structure
interface SelectedImages {
  front: any;
  ingredients: any;
  nutrition: any;
  packaging: any;
}

// Main Product interface
interface Product {
  // Basic identification
  _id: string;
  id: string;
  code: string;

  // Names and descriptions
  product_name: string;
  product_name_de?: string;
  product_name_en?: string;
  product_name_es?: string;
  product_name_fr?: string;
  generic_name?: string;
  generic_name_de?: string;
  generic_name_en?: string;
  generic_name_fr?: string;

  // Keywords and search terms
  _keywords: string[];

  // Brands and manufacturers
  brands: string;
  brands_old?: string;
  brands_tags: string[];

  // Categories
  categories: string;
  categories_hierarchy: string[];
  categories_lc: string;
  categories_old?: string;
  categories_properties: CategoriesProperties;
  categories_properties_tags: string[];
  categories_tags: string[];
  category_properties: CategoryProperties;

  // Ingredients
  ingredients?: any[];
  ingredients_text?: string;
  ingredients_text_de?: string;
  ingredients_text_en?: string;
  ingredients_text_fr?: string;
  ingredients_text_with_allergens?: string;
  ingredients_text_with_allergens_de?: string;
  ingredients_text_with_allergens_en?: string;
  ingredients_analysis: IngredientsAnalysis;
  ingredients_analysis_tags: string[];
  ingredients_debug: any[];
  ingredients_from_or_that_may_be_from_palm_oil_n: number;
  ingredients_from_palm_oil_n: number;
  ingredients_from_palm_oil_tags: string[];
  ingredients_hierarchy: string[];
  ingredients_ids_debug: any[];
  ingredients_lc: string;
  ingredients_n: number;
  ingredients_n_tags: string[];
  ingredients_non_nutritive_sweeteners_n: number;
  ingredients_original_tags: string[];
  ingredients_percent_analysis: number;
  ingredients_sweeteners_n: number;
  ingredients_tags: string[];
  ingredients_that_may_be_from_palm_oil_n: number;
  ingredients_that_may_be_from_palm_oil_tags: string[];
  ingredients_with_specified_percent_n: number;
  ingredients_with_specified_percent_sum: number;
  ingredients_with_unspecified_percent_n: number;
  ingredients_with_unspecified_percent_sum: number;
  ingredients_without_ciqual_codes: string[];
  ingredients_without_ciqual_codes_n: number;
  ingredients_without_ecobalyse_ids: string[];
  ingredients_without_ecobalyse_ids_n: number;
  known_ingredients_n: number;
  unknown_ingredients_n: number;

  // Allergens
  allergens?: string;
  allergens_from_ingredients?: string;
  allergens_from_user?: string;
  allergens_hierarchy: string[];
  allergens_lc: string;
  allergens_tags: string[];

  // Traces
  traces?: string;
  traces_from_ingredients?: string;
  traces_from_user?: string;
  traces_hierarchy: string[];
  traces_lc: string;
  traces_tags: string[];

  // Additives
  additives_n: number;
  additives_original_tags: string[];
  additives_tags: string[];

  // Nutritional information
  nutriments: ProductNutriments;
  nutriscore: Nutriscore;
  nutriscore_2021_tags: string[];
  nutriscore_2023_tags: string[];
  nutriscore_data: NutriscoreData;
  nutriscore_grade: string;
  nutriscore_score: number;
  nutriscore_score_opposite: number;
  nutriscore_tags: string[];
  nutriscore_version: string;
  nutrition_data: string;
  nutrition_data_per: string;
  nutrition_data_prepared?: string;
  nutrition_data_prepared_per?: string;
  nutrition_grade_fr: string;
  nutrition_grades: string;
  nutrition_grades_tags: string[];
  nutrition_score_beverage: number;
  nutrition_score_debug?: string;
  nutrition_score_warning_fruits_vegetables_legumes_estimate_from_ingredients?: number;
  nutrition_score_warning_fruits_vegetables_legumes_estimate_from_ingredients_value?: number;
  nutrition_score_warning_fruits_vegetables_nuts_estimate_from_ingredients?: number;
  nutrition_score_warning_fruits_vegetables_nuts_estimate_from_ingredients_value?: number;
  nutrient_levels: NutrientLevels;
  nutrient_levels_tags: string[];
  no_nutrition_data?: string;

  // NOVA classification
  nova_group: number;
  nova_group_debug?: string;
  nova_groups: string;
  nova_groups_markers: NovaGroupsMarkers;
  nova_groups_tags: string[];

  // Environmental scores
  ecoscore_data: EcoscoreData;
  ecoscore_grade: string;
  ecoscore_tags: string[];

  // Quantity and serving
  product_quantity?: string;
  product_quantity_unit?: string;
  quantity?: string;
  serving_quantity?: string;
  serving_quantity_unit?: string;
  serving_size?: string;

  // Packaging
  packaging?: string;
  packaging_hierarchy: string[];
  packaging_lc: string;
  packaging_materials_tags: string[];
  packaging_old?: string;
  packaging_old_before_taxonomization?: string;
  packaging_recycling_tags: string[];
  packaging_shapes_tags: string[];
  packaging_tags: string[];
  packaging_text?: string;
  packaging_text_de?: string;
  packaging_text_en?: string;
  packaging_text_fr?: string;
  packagings: any[];
  packagings_complete: number;
  packagings_materials: PackagingMaterials;
  packagings_n: number;

  // Geographic information
  countries?: string;
  countries_hierarchy: string[];
  countries_lc: string;
  countries_tags: string[];
  origins?: string;
  origins_hierarchy: string[];
  origins_lc: string;
  origins_old?: string;
  origins_tags: string[];
  purchase_places?: string;
  purchase_places_tags: string[];
  stores?: string;
  stores_tags: string[];
  manufacturing_places?: string;
  manufacturing_places_tags: string[];
  cities_tags: string[];

  // Language information
  lang: string;
  languages: Languages;
  languages_codes: LanguagesCodes;
  languages_hierarchy: string[];
  languages_tags: string[];

  // Labels and certifications
  labels?: string;
  labels_hierarchy: string[];
  labels_lc: string;
  labels_old?: string;
  labels_tags: string[];

  // Images
  image_front_small_url?: string;
  image_front_thumb_url?: string;
  image_front_url?: string;
  image_ingredients_small_url?: string;
  image_ingredients_thumb_url?: string;
  image_ingredients_url?: string;
  image_nutrition_small_url?: string;
  image_nutrition_thumb_url?: string;
  image_nutrition_url?: string;
  image_packaging_small_url?: string;
  image_packaging_thumb_url?: string;
  image_packaging_url?: string;
  image_small_url?: string;
  image_thumb_url?: string;
  image_url?: string;
  images: ProductImages;
  selected_images: SelectedImages;
  max_imgid?: string;

  // Metadata and tracking
  created_t: number;
  last_modified_t: number;
  last_updated_t: number;
  completed_t: number;
  completeness: number;
  complete: number;
  rev: number;
  creator: string;
  last_editor: string;
  last_modified_by: string;

  // Tags for various purposes
  added_countries_tags: string[];
  removed_countries_tags: string[];
  amino_acids_prev_tags: string[];
  amino_acids_tags: string[];
  checkers_tags: string[];
  ciqual_food_name_tags: string[];
  codes_tags: string[];
  correctors_tags: string[];
  data_quality_bugs_tags: string[];
  data_quality_errors_tags: string[];
  data_quality_info_tags: string[];
  data_quality_tags: string[];
  data_quality_warnings_tags: string[];
  debug_param_sorted_langs: string[];
  editors_tags: string[];
  emb_codes?: string;
  emb_codes_tags: string[];
  entry_dates_tags: string[];
  food_groups?: string;
  food_groups_tags: string[];
  informers_tags: string[];
  last_edit_dates_tags: string[];
  last_image_dates_tags: string[];
  last_image_t?: number;
  main_countries_tags: string[];
  minerals_prev_tags: string[];
  minerals_tags: string[];
  misc_tags: string[];
  nucleotides_prev_tags: string[];
  nucleotides_tags: string[];
  other_nutritional_substances_tags: string[];
  photographers_tags: string[];
  popularity_key?: number;
  popularity_tags: string[];
  states: string;
  states_hierarchy: string[];
  states_tags: string[];
  unknown_nutrients_tags: string[];
  vitamins_prev_tags: string[];
  vitamins_tags: string[];
  weighers_tags: string[];

  // Additional properties
  compared_to_category?: string;
  data_sources?: string;
  data_sources_tags: string[];
  expiration_date?: string;
  interface_version_created?: string;
  interface_version_modified?: string;
  link?: string;
  pnns_groups_1?: string;
  pnns_groups_1_tags: string[];
  pnns_groups_2?: string;
  pnns_groups_2_tags: string[];
  product_type?: string;
  scans_n?: number;
  schema_version?: number;
  sortkey?: number;
  unique_scans_n?: number;
  update_key?: string;
  with_non_nutritive_sweeteners?: number;

  // OCR text variations (for ingredients)
  ingredients_text_de_ocr_1577548409?: string;
  ingredients_text_de_ocr_1577548409_result?: string;
  ingredients_text_de_ocr_1635159518?: string;
  ingredients_text_de_ocr_1635159518_result?: string;
  ingredients_text_de_ocr_1714681288?: string;
  ingredients_text_de_ocr_1714681288_result?: string;
}

// Main response interface
export interface FoodData {
  status: number;
  status_verbose: string;
  product?: Product;
  code: string;
}

// Search response interface
export interface SearchResponse {
  count: number;
  page: number;
  page_count: number;
  page_size: number;
  products: Product[];
  skip: number;
}
