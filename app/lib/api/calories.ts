export async function getFoodData(barcode: string) {
  const response = await fetch(
    `${process.env.EXPO_PUBLIC_URL}/functions/v1/food`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.EXPO_PUBLIC_KEY}`,
      },
      body: JSON.stringify({ code: { barcode } }),
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
