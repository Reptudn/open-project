import {
  ScrollView,
  TextInput,
  ActivityIndicator,
  View,
  Text,
} from "react-native";
import ExerciseItem from "./ExerciseItem";
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
    const exercises = await getExerciseEdge(query);
    setExercises(exercises);
    setLoading(false);
  }, []);

  useEffect(() => {
    const loadExercises = async () => {
      try {
        setLoading(true);
        const data = await getExerciseEdge("bench press");
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

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchQuery.trim()) {
        handleSearch(searchQuery);
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchQuery, handleSearch]);

  const displayExercises = exercises.length > 0 ? exercises : [];

  function loadExercise(ex: Exercise){
    alert('test');
  }

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
                exercise={ex}
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
