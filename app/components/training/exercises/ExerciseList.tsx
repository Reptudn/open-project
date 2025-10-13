import {
  ScrollView,
  TextInput,
  ActivityIndicator,
  View,
  Text,
} from "react-native";
import ExerciseItem from "./ExerciseItem";
import { ExerciseTagType } from "./ExerciseTag";
import { useState, useEffect, useCallback } from "react";
import { Exercise } from "@/types/Exercise";
import { getExerciseEdge } from "@/lib/api/workout";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { ThemeColors } from "@/constants/theme";

export default function ExerciseList() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = useCallback(async (query: string) => {
    setLoading(true);
    setExercises(await getExerciseEdge({ name: query }));
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
  }, []);

  useEffect(() => {
    const loadExercises = async () => {
      try {
        setLoading(true);
        const data = await getExerciseEdge({ keywords: ["strength"] });
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

  const displayExercises = exercises.length > 0 ? exercises : [];

  return (
    <>
      <TextInput
        placeholder="Search Exercises..."
        value={searchQuery}
        onChangeText={setSearchQuery}
        onSubmitEditing={(e) => handleSearch(e.nativeEvent.text)}
        style={{
          color: isDark ? ThemeColors.dark.text : ThemeColors.light.text,
          margin: 10,
          backgroundColor: isDark
            ? ThemeColors.dark.background
            : ThemeColors.light.background,
          borderRadius: 5,
          height: 45,
          paddingHorizontal: 15,
        }}
      />
      {loading ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text
            style={{
              color: isDark ? ThemeColors.dark.text : ThemeColors.light.text,
            }}
          >
            Loading exercises...
          </Text>
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <ScrollView
          style={{ flex: 1, padding: 10 }}
          showsVerticalScrollIndicator={true}
        >
          {displayExercises.length > 0 ? (
            displayExercises.map((ex, index) => (
              <ExerciseItem
                key={ex.exerciseId || `exercise-${index}`}
                exerciseId={ex.exerciseId || `exercise-${index}`}
                name={ex.name?.toLocaleUpperCase() || "Unknown Exercise"}
                imageUrl={ex.imageUrl || ""}
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
            ))
          ) : (
            <Text>No exercises found.</Text>
          )}
        </ScrollView>
      )}
    </>
  );
}
