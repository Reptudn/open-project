import { Product } from "@/types/FoodData";

export async function getFoodDataByBarcode(barcode: string) {
  // const response = await fetch(
  //   `${process.env.EXPO_PUBLIC_URL}/functions/v1/food?barcode=${barcode}`,
  //   {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: `Bearer ${process.env.EXPO_PUBLIC_KEY}`,
  //     },
  //     // body: JSON.stringify({ code: { barcode } }),
  //   }
  // );
  const response = await fetch(
    `https://world.openfoodfacts.org/api/v0/product/${barcode}.json`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch food data");
  }

  try {
    const data = await response.json();
    // console.log(data);
    return data as Product;
  } catch (error) {
    console.error("Failed to parse JSON:", error);
    return null;
  }
}

export async function getFoodDataByQuery(query: string) {
  const response = await fetch(
    `${process.env.EXPO_PUBLIC_URL}/functions/v1/food`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.EXPO_PUBLIC_KEY}`,
      },
      body: JSON.stringify({ query: { query } }),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch food data");
  }

  try {
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to parse JSON:", error);
    return null;
  }
}
