// Setup type definitions for built-in Supabase Runtime APIs
import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "jsr:@supabase/supabase-js@2";
console.info("server started");
Deno.serve(async (req) => {
  const supabase = createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
    {
      global: {
        headers: {
          Authorization: req.headers.get("Authorization"),
        },
      },
    }
  );
  // const { name, keywords, targetMuscles, secondaryMuscles, exerciseType, bodyParts, equipments } = await req.json();
  const { query } = await req.json();
  console.info("Request");
  // const data = await searchExact(supabase, name, keywords, targetMuscles, secondaryMuscles, exerciseType, bodyParts, equipments);
  const data = await search(supabase, query);
  return new Response(JSON.stringify(data), {
    headers: {
      "Content-Type": "application/json",
    },
  });
});
// https://v2.exercisedb.dev/api/v1/exercises/exr_41n2hkK8hGAcSnW7
const ENDPOINT = "https://v2.exercisedb.dev/api/v1/exercises/";
async function getFullExerciseInfo(id) {
  console.info(`fetching: ${ENDPOINT + id}`);
  const res = await fetch(ENDPOINT + id);
  if (!res.ok) return null;
  try {
    const data = await res.json();
    return data.data;
  } catch (e) {
    return null;
  }
}
function toPgArray(arr) {
  if (!arr || arr.length === 0) return "{}";
  // Escape double quotes and wrap items properly
  return "{" + arr.map((a) => `"${a.replace(/"/g, '\\"')}"`).join(",") + "}";
}
async function insertMissingExercisesInDB(exercises, supabase) {
  if (!exercises.length) {
    console.log("⚠️ No exercises to insert.");
    return;
  }
  const mapped = exercises.map((ex) => ({
    exercise_id: ex.exerciseId ?? null,
    name: ex.name ?? "",
    image_url: ex.imageUrl ?? "",
    equipments: toPgArray(ex.equipments),
    body_parts: toPgArray(ex.bodyParts),
    exercise_type: ex.exerciseType ?? "",
    target_muscles: toPgArray(ex.targetMuscles),
    secondary_muscles: toPgArray(ex.secondaryMuscles),
    video_url: ex.videoUrl ?? "",
    keywords: toPgArray(ex.keywords),
    overview: ex.overview ?? "",
    instructions: toPgArray(ex.instructions),
    exercise_tips: toPgArray(ex.exerciseTips),
    variations: toPgArray(ex.variations),
    related_exercise_ids: toPgArray(ex.relatedExerciseIds),
  }));
  const { error } = await supabase.from("exercises").upsert(mapped, {
    onConflict: "exercise_id",
  });
  if (error) {
    console.error("❌ Upsert failed:", error);
  } else {
    console.log(`✅ Inserted/Updated ${mapped.length} exercises`);
  }
}
async function search(supabase, query) {
  if (!query) return [];
  const url = `${ENDPOINT}search?search=${encodeURIComponent(query.trim())}`;
  const res = await fetch(url);
  if (!res.ok) return [];
  try {
    const data = await res.json();
    // 🧠 Fetch full info in parallel and wait for all results
    const fullData = await Promise.all(
      data.data.map(async (d) => {
        if (d.exerciseId) {
          const full = await getFullExerciseInfo(d.exerciseId);
          return full || null;
        }
        return null;
      })
    );
    // 🔍 Filter out null entries
    const validExercises = fullData.filter(Boolean);
    // ✅ Now insert once all are fetched
    await insertMissingExercisesInDB(validExercises, supabase);
    return validExercises;
  } catch (e) {
    console.error("❌ Error in search:", e);
    return [];
  }
}
