import { Exercise } from "@/types/Exercise";
// import { supabase } from "../supabase";

const EDGE_API_URL =
  process.env.EDGE_API_URL ||
  "https://tegfwlejpnjfcyyppogf.supabase.co/functions/v1";

// interface ExerciseEdgeQueryExact {
//   name?: string;
//   keywords?: string[];
//   targetMuscle?: string[];
//   secondaryMuscle?: string[];
//   exerciseType?: string[];
//   bodyPart?: string[];
//   equipment?: string[];
// }

export async function getExerciseEdge(queries: string): Promise<Exercise[]> {
  try {
    const req = await fetch(`${EDGE_API_URL}/exercise`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: process.env.EXPO_PUBLIC_KEY || "",
        Authorization: `Bearer ${process.env.EXPO_PUBLIC_KEY || ""}`,
      },
      body: JSON.stringify({ query: queries }),
    });

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

// export async function getExerciseByKey(key: string): Promise<Exercise | null> {
//   const { data, error } = await supabase
//     .from("exercises")
//     .select("*")
//     .eq("id", key)
//     .single();

//   if (error) {
//     console.error(error);
//     return null;
//   }

//   return data as Exercise;
// }

// export async function getAllExercises(): Promise<Exercise[]> {
//   const { data, error } = await supabase
//     .from("exercises")
//     .select("*")
//     .limit(50);

//   if (error) {
//     console.error(error);
//     return [];
//   }

//   return data as Exercise[];
// }

// export async function searchExercises(query: string): Promise<Exercise[]> {
//   if (!query || query.trim().length === 0) {
//     return getAllExercises();
//   }

//   const searchTerms = query
//     .trim()
//     .toLowerCase()
//     .split(/\s+/)
//     .filter((term) => term.length > 0);

//   const { data, error } = await supabase
//     .from("exercises")
//     .select("*")
//     .limit(200);

//   if (error) {
//     console.error(error);
//     return [];
//   }

//   const results = (data as Exercise[]).filter((exercise) => {
//     return searchTerms.every((term) => {
//       const nameMatch = exercise.name.toLowerCase().includes(term);
//       const targetMuscleMatch = exercise.targetMuscles.some((muscle) =>
//         muscle.toLowerCase().includes(term)
//       );
//       const secondaryMuscleMatch = exercise.secondaryMuscles.some((muscle) =>
//         muscle.toLowerCase().includes(term)
//       );
//       const equipmentMatch = exercise.equipments.some((equipment) =>
//         equipment.toLowerCase().includes(term)
//       );
//       const bodyPartMatch = exercise.bodyParts.some((bodyPart) =>
//         bodyPart.toLowerCase().includes(term)
//       );

//       return (
//         nameMatch ||
//         targetMuscleMatch ||
//         secondaryMuscleMatch ||
//         equipmentMatch ||
//         bodyPartMatch
//       );
//     });
//   });

//   // Sort results by relevance (exercises matching more fields first)
//   const sortedResults = results.sort((a, b) => {
//     const aScore = calculateRelevanceScore(a, searchTerms);
//     const bScore = calculateRelevanceScore(b, searchTerms);
//     return bScore - aScore;
//   });

//   return sortedResults.slice(0, 50); // Limit final results
// }

// function calculateRelevanceScore(
//   exercise: Exercise,
//   searchTerms: string[]
// ): number {
//   let score = 0;

//   searchTerms.forEach((term) => {
//     // Name matches get highest score
//     if (exercise.name.toLowerCase().includes(term)) {
//       score += 10;
//       // Exact name match gets bonus
//       if (exercise.name.toLowerCase() === term) {
//         score += 20;
//       }
//     }

//     // Target muscle matches
//     if (
//       exercise.targetMuscles.some((muscle) =>
//         muscle.toLowerCase().includes(term)
//       )
//     ) {
//       score += 5;
//     }

//     // Secondary muscle matches
//     if (
//       exercise.secondaryMuscles.some((muscle) =>
//         muscle.toLowerCase().includes(term)
//       )
//     ) {
//       score += 3;
//     }

//     // Equipment matches
//     if (
//       exercise.equipments.some((equipment) =>
//         equipment.toLowerCase().includes(term)
//       )
//     ) {
//       score += 4;
//     }

//     // Body part matches
//     if (
//       exercise.bodyParts.some((bodyPart) =>
//         bodyPart.toLowerCase().includes(term)
//       )
//     ) {
//       score += 4;
//     }
//   });

//   return score;
// }
