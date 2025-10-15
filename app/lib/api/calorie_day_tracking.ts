export async function getDayData(date: string): Promise<CalorieDay | null> {
  const response = await fetch(
    `https://api.example.com/calorie-tracking/day?date=${date}`
  );
  if (!response.ok) {
    return null;
  }
  const data = await response.json();
  return data as CalorieDay;
}
