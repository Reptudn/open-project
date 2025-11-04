export async function getExerciseEdge(queries: string): Promise<Exercise[]> {
  try {
    const req = await fetch(
      `${process.env.EXPO_PUBLIC_URL}/functions/v1/exercise`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apikey: process.env.EXPO_PUBLIC_KEY || "",
          Authorization: `Bearer ${process.env.EXPO_PUBLIC_KEY || ""}`,
        },
        body: JSON.stringify({ query: queries }),
      }
    );

    const data = await req.json();

    if (req.ok) {
      return data as Exercise[];
    } else {
      console.error("Edge function error:", req.status, req.statusText);
      return [];
    }
  } catch (err) {
    console.error("Fetch or parse error:", err);
    return [];
  }
}
