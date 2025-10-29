import {
  ScrollView,
  TextInput,
  ActivityIndicator,
  View,
  Text,
  Dimensions,
} from "react-native";
import ExerciseItem from "./ExerciseItem";
import { useState, useEffect, useCallback } from "react";
import { Exercise } from "@/types/Exercise";
import { getExerciseEdge } from "@/lib/api/exercise";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { getThemeColor, ThemeColors } from "@/constants/theme";
import { GymText } from "@/components/ui/Text";

interface ExerciseListProps {
  workoutId: string;
}

export default function ExerciseList({workoutId}: ExerciseListProps) {
  const theme = getThemeColor(useColorScheme());
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const { height, width } = Dimensions.get("window");

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

  return (
    <>
      <TextInput
        placeholder="Search Exercises..."
        placeholderTextColor={theme.icon}
        value={searchQuery}
        onChangeText={setSearchQuery}
        onSubmitEditing={(e) => handleSearch(e.nativeEvent.text)}
        style={{
          color: theme.text,
          margin: 10,
          backgroundColor: theme.background,
          borderRadius: 5,
          height: 45,
          paddingHorizontal: 15,
          borderColor: theme.text,
          borderWidth: 1,
        }}
      />
      {loading ? (
        <View
          style={{
            flex: 1,
            justifyContent: "flex-start",
            alignItems: "center",
            minHeight: height,
          }}
        >
          <GymText>Loading exercises...</GymText>
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
                workoutid={workoutId}
              />
            ))
          ) : (
            <View
              style={{
                flex: 1,
                justifyContent: "flex-start",
                alignItems: "center",
                minHeight: height,
              }}
            >
              <GymText>No exercises found.</GymText>
            </View>
          )}
        </ScrollView>
      )}
    </>
  );
}
