export function toDbDateString(date: Date): string {
  return date.toISOString().split("T")[0];
}
