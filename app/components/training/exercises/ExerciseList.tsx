import {
  ScrollView,
  TextInput,
  ActivityIndicator,
  View,
  Text,
} from "react-native";
import ExerciseItem from "./ExerciseItem";
import { ExerciseTagType } from "./ExerciseTag";
import { useState, useEffect, useCallback, useMemo } from "react";
import { Exercise } from "@/types/Exercise";
import { getAllExercises, searchExercises } from "@/lib/api/workout";

export default function ExerciseList() {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const fallbackExercises = useMemo(
    () => [
      {
        exerciseId: "trmte8s",
        name: "band shrug",
        gifUrl: "https://static.exercisedb.dev/media/trmte8s.gif",
        targetMuscles: ["traps"],
        bodyParts: ["neck"],
        equipments: ["band"],
        secondaryMuscles: ["shoulders"],
        instructions: [
          "Step:1 Stand with your feet shoulder-width apart and place the band under your feet, holding the ends with your hands.",
          "Step:2 Keep your arms straight and relaxed, and let the band hang in front of your thighs.",
          "Step:3 Engage your traps by shrugging your shoulders upward, lifting the band as high as possible.",
          "Step:4 Hold the contraction for a moment, then slowly lower your shoulders back down to the starting position.",
          "Step:5 Repeat for the desired number of repetitions.",
        ],
      },
      {
        exerciseId: "LMGXZn8",
        name: "barbell decline close grip to skull press",
        gifUrl: "https://static.exercisedb.dev/media/LMGXZn8.gif",
        targetMuscles: ["triceps"],
        bodyParts: ["upper arms"],
        equipments: ["barbell"],
        secondaryMuscles: ["chest", "shoulders"],
        instructions: [
          "Step:1 Lie on a decline bench with your head lower than your feet and hold a barbell with a close grip.",
          "Step:2 Lower the barbell towards your forehead by bending your elbows, keeping your upper arms stationary.",
          "Step:3 Pause for a moment, then extend your arms to press the barbell back up to the starting position.",
          "Step:4 Repeat for the desired number of repetitions.",
        ],
      },
      {
        exerciseId: "0br45wL",
        name: "push-up inside leg kick",
        gifUrl: "https://static.exercisedb.dev/media/0br45wL.gif",
        targetMuscles: ["glutes"],
        bodyParts: ["upper legs"],
        equipments: ["body weight"],
        secondaryMuscles: ["quadriceps", "hamstrings", "calves", "core"],
        instructions: [
          "Step:1 Start in a push-up position with your hands slightly wider than shoulder-width apart and your feet together.",
          "Step:2 Lower your body towards the ground by bending your elbows, keeping your back straight and your core engaged.",
          "Step:3 As you push back up, lift one leg off the ground and kick it out to the side, keeping it straight.",
          "Step:4 Lower your leg back down and repeat the push-up, then switch to the other leg.",
          "Step:5 Continue alternating leg kicks with each push-up repetition.",
        ],
      },
      {
        exerciseId: "27NNGFr",
        name: "cable incline fly (on stability ball)",
        gifUrl: "https://static.exercisedb.dev/media/27NNGFr.gif",
        targetMuscles: ["pectorals"],
        bodyParts: ["chest"],
        equipments: ["cable"],
        secondaryMuscles: ["deltoids", "triceps"],
        instructions: [
          "Step:1 Set up a stability ball at an incline angle.",
          "Step:2 Attach the cable handles to the high pulleys of a cable machine.",
          "Step:3 Sit on the stability ball facing away from the machine, with your feet firmly planted on the ground.",
          "Step:4 Grasp the cable handles with an overhand grip, palms facing forward.",
          "Step:5 Lean forward slightly, keeping your back straight and core engaged.",
          "Step:6 With a controlled motion, bring your arms out to the sides, keeping a slight bend in your elbows.",
          "Step:7 Continue the motion until your arms are parallel to the ground.",
          "Step:8 Pause for a moment, then slowly return to the starting position.",
          "Step:9 Repeat for the desired number of repetitions.",
        ],
      },
      {
        exerciseId: "a4F9Oyc",
        name: "kettlebell double alternating hang clean",
        gifUrl: "https://static.exercisedb.dev/media/a4F9Oyc.gif",
        targetMuscles: ["biceps"],
        bodyParts: ["upper arms"],
        equipments: ["kettlebell"],
        secondaryMuscles: ["forearms", "shoulders"],
        instructions: [
          "Step:1 Stand with your feet shoulder-width apart, holding a kettlebell in each hand with an overhand grip.",
          "Step:2 Bend your knees slightly and hinge forward at the hips, keeping your back straight and chest up.",
          "Step:3 Allow the kettlebells to hang straight down in front of your body.",
          "Step:4 In one fluid motion, explosively extend your hips and knees while shrugging your shoulders.",
          "Step:5 As the kettlebells rise, pull them up towards your shoulders, keeping your elbows high and out to the sides.",
          "Step:6 Catch the kettlebells at shoulder height, with your palms facing inward and your elbows pointing forward.",
          "Step:7 Lower the kettlebells back down to the starting position and repeat for the desired number of repetitions.",
        ],
      },
    ],
    []
  );

  const handleSearch = useCallback(
    async (query: string) => {
      setLoading(true);
      setExercises(await getAllExercises());
      setLoading(false);
      // if (!query.trim()) {
      //   try {
      //     setLoading(true);
      //     const data = await getAllExercises();
      //     setExercises(data || fallbackExercises);
      //   } catch (error) {
      //     console.error("Failed to load exercises:", error);
      //     setExercises(fallbackExercises);
      //   } finally {
      //     setLoading(false);
      //   }
      // } else {
      //   try {
      //     setLoading(true);
      //     const results = await searchExercises(query);
      //     setExercises(results.length > 0 ? results : fallbackExercises);
      //   } catch (error) {
      //     console.error("Search failed:", error);
      //     const filtered = fallbackExercises.filter(
      //       (ex) =>
      //         ex.name.toLowerCase().includes(query.toLowerCase()) ||
      //         ex.targetMuscles.some((muscle) =>
      //           muscle.toLowerCase().includes(query.toLowerCase())
      //         ) ||
      //         ex.equipments.some((equipment) =>
      //           equipment.toLowerCase().includes(query.toLowerCase())
      //         )
      //     );
      //     setExercises(filtered);
      //   } finally {
      //     setLoading(false);
      //   }
      // }
    },
    [fallbackExercises]
  );

  useEffect(() => {
    const loadExercises = async () => {
      try {
        setLoading(true);
        const data = await getAllExercises();
        setExercises(data || []);
      } catch (error) {
        console.error("Failed to load exercises:", error);
        setExercises([]);
      } finally {
        setLoading(false);
      }
    };

    loadExercises();
  }, []);

  // Real-time search as user types
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchQuery.trim()) {
        handleSearch(searchQuery);
      }
    }, 300); // Debounce search by 300ms

    return () => clearTimeout(timeoutId);
  }, [searchQuery, handleSearch]);

  const displayExercises = exercises.length > 0 ? exercises : fallbackExercises;

  return (
    <>
      <TextInput
        placeholder="Search Exercises..."
        value={searchQuery}
        onChangeText={setSearchQuery}
        onSubmitEditing={(e) => handleSearch(e.nativeEvent.text)}
        style={{
          margin: 10,
          backgroundColor: "#f0f0f0",
          borderRadius: 5,
          height: 45,
          paddingHorizontal: 15,
        }}
      />
      {loading ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text>Loading exercises...</Text>
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <ScrollView
          style={{ flex: 1, padding: 10 }}
          showsVerticalScrollIndicator={true}
        >
          {displayExercises.map((ex, index) => (
            <ExerciseItem
              key={ex.exerciseId || `exercise-${index}`}
              exerciseId={ex.exerciseId || `exercise-${index}`}
              name={ex.name?.toLocaleUpperCase() || "Unknown Exercise"}
              gifUrl={ex.gifUrl || ""}
              tags={[
                ...(ex.bodyParts || []).map((part) => ({
                  type: ExerciseTagType.BODYPART,
                  name: part,
                })),
                ...(ex.equipments || []).map((equip) => ({
                  type: ExerciseTagType.EQUIPMENT,
                  name: equip,
                })),
                ...(ex.targetMuscles || []).map((muscle) => ({
                  type: ExerciseTagType.MUSCLE_PRIMARY,
                  name: muscle,
                })),
                ...(ex.secondaryMuscles || []).map((muscle) => ({
                  type: ExerciseTagType.MUSCLE_SECONDARY,
                  name: muscle,
                })),
              ].filter((tag) => tag.name && tag.name.trim() !== "")}
            />
          ))}
        </ScrollView>
      )}
    </>
  );
}
