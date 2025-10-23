import { FoodData, Product, SearchResponse } from "@/types/FoodData";

export async function getFoodDataByBarcode(
  barcode: string
): Promise<Product | null> {
  const response = await fetch(
    `https://world.openfoodfacts.org/api/v0/product/${barcode}.json`
  );

  if (!response.ok) {
    throw new Error(
      `Failed to fetch food data: ${response.status} ${response.statusText}`
    );
  }

  try {
    const data = (await response.json()) as FoodData;
    return data.product ? data.product : null;
  } catch (error) {
    console.error("Failed to parse JSON:", error);
    return null;
  }
}

export async function searchFood(
  query: string,
  limit: number = 15
): Promise<Product[] | null> {
  if (!query.trim()) {
    return null;
  }

  const searchParams = new URLSearchParams({
    search_terms: query.trim(),
    page_size: limit.toString(),
    json: "1",
    fields:
      "code,product_name,brands,nutriments,image_url,quantity,categories_tags,nutriscore_grade",
  });

  const response = await fetch(
    `https://world.openfoodfacts.org/cgi/search.pl?${searchParams.toString()}`
  );

  if (!response.ok) {
    throw new Error(
      `Failed to search food data: ${response.status} ${response.statusText}`
    );
  }

  try {
    const data = (await response.json()) as SearchResponse;
    return data.products;
  } catch (error) {
    console.error("Failed to parse JSON:", error);
    return null;
  }
}

export async function getFoodDataByQuery(
  query: string,
  page: number = 1,
  pageSize: number = 20
): Promise<SearchResponse | null> {
  // Open Food Facts search API uses GET with query parameters
  const searchParams = new URLSearchParams({
    search_terms: query,
    page: page.toString(),
    page_size: pageSize.toString(),
    json: "1",
    fields:
      "code,product_name,brands,nutriments,image_url,quantity,categories_tags,nutriscore_grade",
  });

  const response = await fetch(
    `https://world.openfoodfacts.org/cgi/search.pl?${searchParams.toString()}`
  );

  if (!response.ok) {
    throw new Error(
      `Failed to fetch food data: ${response.status} ${response.statusText}`
    );
  }

  try {
    const data = await response.json();
    console.log("Search results:", data);
    return data as SearchResponse;
  } catch (error) {
    console.error("Failed to parse JSON:", error);
    return null;
  }
}

// Alternative advanced search function with more filters
export async function getFoodDataByAdvancedQuery(options: {
  query?: string;
  brands?: string;
  categories?: string;
  labels?: string;
  countries?: string;
  page?: number;
  pageSize?: number;
}): Promise<SearchResponse | null> {
  const {
    query = "",
    brands = "",
    categories = "",
    labels = "",
    countries = "",
    page = 1,
    pageSize = 20,
  } = options;

  const searchParams = new URLSearchParams({
    json: "1",
    page: page.toString(),
    page_size: pageSize.toString(),
    fields:
      "code,product_name,brands,nutriments,image_url,quantity,categories_tags,nutriscore_grade,ingredients_text",
  });

  // Add search parameters if provided
  if (query) searchParams.append("search_terms", query);
  if (brands) searchParams.append("brands_tags", brands);
  if (categories) searchParams.append("categories_tags", categories);
  if (labels) searchParams.append("labels_tags", labels);
  if (countries) searchParams.append("countries_tags", countries);

  const response = await fetch(
    `https://world.openfoodfacts.org/cgi/search.pl?${searchParams.toString()}`
  );

  if (!response.ok) {
    throw new Error(
      `Failed to fetch food data: ${response.status} ${response.statusText}`
    );
  }

  try {
    const data = await response.json();
    return data as SearchResponse;
  } catch (error) {
    console.error("Failed to parse JSON:", error);
    return null;
  }
}
