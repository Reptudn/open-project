import { supabase } from "@/lib/supabase";
import { Product, SearchResponse } from "@/types/FoodData";
import { DBProduct } from "@/types/Meals";

// TODO: make this send a fetch to our backend and not theirs
export async function getFoodDataByBarcode(
  barcode: string
): Promise<DBProduct | null> {
  const res = await fetch(
    "https://tegfwlejpnjfcyyppogf.supabase.co/functions/v1/food",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ barcode }),
    }
  );

  if (!res.ok) return null;

  const data = (await res.json()) as DBProduct | null;

  console.log("data:", data);

  // console.log("Fetched food data by barcode:", data);
  return data;
  // const response = await fetch(
  //   `https://world.openfoodfacts.org/api/v0/product/${barcode}.json`
  // );

  // if (!response.ok) {
  //   throw new Error(
  //     `Failed to fetch food data: ${response.status} ${response.statusText}`
  //   );
  // }

  // try {
  //   const data = (await response.json()) as FoodData;
  //   console.info("Fetched food data by barcode:", data);
  //   if (data.product) {
  //     await supabase.from("foods").upsert({
  //       barcode: data.product.code,
  //       name: data.product.product_name,
  //       brand: data.product.brands,
  //       image_url: data.product.image_url,
  //       nutriments: data.product.nutriments,
  //       categories: data.product.categories_tags,
  //       source: "OpenFoodFacts",
  //       created_at: new Date(),
  //     });
  //   }
  //   return data.product ? data.product : null;
  // } catch (error) {
  //   console.error("Failed to parse JSON:", error);
  //   return null;
  // }
}

export async function searchFoodDb(query: string): Promise<DBProduct[] | null> {
  const res = await fetch(
    "https://tegfwlejpnjfcyyppogf.supabase.co/functions/v1/food",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: query }),
    }
  );

  if (!res.ok) {
    console.info("Couldnt find food in db:", res.statusText);
    return null;
  }

  const data = (await res.json()) as DBProduct[] | null;

  return data;
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
    data.products &&
      data.products.forEach(async (product) => {
        await supabase.from("foods").upsert({
          barcode: product.code,
          name: product.product_name,
          brand: product.brands,
          image_url: product.image_url,
          nutriments: product.nutriments,
          categories: product.categories_tags,
          source: "OpenFoodFacts",
          created_at: new Date(),
        });
      });
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
