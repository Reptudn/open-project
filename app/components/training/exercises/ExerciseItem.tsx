import {
  TouchableOpacity,
  Text,
  Image,
  View,
  StyleSheet,
  Dimensions,
} from "react-native";
import ExerciseTag, { ExerciseTagType } from "./ExerciseTag";
import { AddExerciseSmall } from "./AddExercise";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { getThemeColor, ThemeColors } from "@/constants/theme";
import { router } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { GymText } from "@/components/ui/Text";
import { addExercise } from "@/lib/api/workout/workoutInsert";
import { useAuthContext } from "@/hooks/use-auth-context";

interface ExerciseItemProps {
  exercise: Exercise;
  workoutId: string;
}

export default function ExerciseItem({
  exercise,
  workoutId,
}: ExerciseItemProps) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const {session} = useAuthContext();

  async function handleButtonPress() {
    const { data, error } = await addExercise(
      [
        {
          workout_id: Number(workoutId),
          exercise_id: exercise.exercise_id,
          order_index: 0,
        },
      ],
      session
    );
    if (error) alert(`Error in exInfo ${error}`);
    router.push({
      pathname: "/(training)/createWorkout",
      params: { workoutId: workoutId },
    });
  }

  return (
    <TouchableOpacity
      style={{
        marginBottom: 20,
        backgroundColor: isDark
          ? ThemeColors.dark.background
          : ThemeColors.light.background,
        padding: 10,
        borderRadius: 10,
        flexDirection: "row",
        alignItems: "flex-start",
        gap: 15,
        width: "100%",
        borderColor: isDark ? "#444" : "#ddd",
        borderWidth: 1,
      }}
      onPress={() =>
        router.navigate({
          pathname: "/(training)/exerciseInfo",
          params: {
            name: exercise.name,
            overview: exercise.overview,
            imageUrl: exercise.image_url,
            excerciseId: exercise.exercise_id,
            workoutId: workoutId,
            exercise: JSON.stringify(exercise),
          },
        })
      }
    >
      <Image
        source={{
          uri:
            exercise.image_url && exercise.image_url.trim()
              ? exercise.image_url
              : "https://via.placeholder.com/80x80/cccccc/666666?text=No+Image",
        }}
        style={{
          width: 80,
          height: 80,
          borderRadius: 5,
        }}
        resizeMode="contain"
        onError={(error) =>
          console.log("Image load error:", error.nativeEvent.error)
        }
        alt="Exercise GIF"
      />

      <View style={{ flex: 1, justifyContent: "space-between" }}>
        <Text
          style={{
            fontWeight: "bold",
            color: isDark ? ThemeColors.dark.text : ThemeColors.light.text,
            fontSize: 16,
            marginBottom: 8,
          }}
        >
          {exercise.name}
        </Text>

        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            alignItems: "center",
            gap: 5,
            marginBottom: 10,
          }}
        >
          {exercise.target_muscles &&
            exercise.target_muscles.map((ex) => (
              <ExerciseTag
                key={ex}
                name={ex}
                type={ExerciseTagType.MUSCLE_PRIMARY}
              />
            ))}
          {exercise.secondary_muscles &&
            exercise.secondary_muscles.map((ex) => (
              <ExerciseTag
                key={ex}
                name={ex}
                type={ExerciseTagType.MUSCLE_SECONDARY}
              />
            ))}
          {exercise.equipments &&
            exercise.equipments.map((ex) => (
              <ExerciseTag
                key={ex}
                name={ex}
                type={ExerciseTagType.EQUIPMENT}
              />
            ))}
          {exercise.body_parts &&
            exercise.body_parts.map((ex) => (
              <ExerciseTag key={ex} name={ex} type={ExerciseTagType.BODYPART} />
            ))}
        </View>
        <View>
          {exercise.overview && (
            <Text
              style={{
                color: isDark ? ThemeColors.dark.text : ThemeColors.light.text,
                fontSize: 14,
              }}
              numberOfLines={3}
            >
              {exercise.overview}
            </Text>
          )}
        </View>
      </View>
      <View style={{ alignItems: "flex-end" }}>
        <TouchableOpacity onPress={handleButtonPress}>
          <Ionicons
            name="add-outline"
            size={24}
            color={isDark ? ThemeColors.dark.icon : ThemeColors.light.icon}
          />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

export function WorkoutExerciseItem({
  exercise,
  workoutId,
}: {
  exercise: Exercise;
  workoutId: string;
}) {
  const theme = getThemeColor();

  return (
    <TouchableOpacity
      style={{
        marginBottom: 20,
        backgroundColor: theme.background,
        padding: 10,
        borderRadius: 10,
        flexDirection: "row",
        alignItems: "flex-start",
        gap: 15,
        width: "100%",
        borderColor: theme.text,
        borderWidth: 1,
      }}
      onPress={() =>
        router.navigate({
          pathname: "/(training)/workoutExerciseInfo",
          params: {
            name: exercise.name,
            overview: exercise.overview,
            imageUrl: exercise.image_url,
            excerciseId: exercise.exercise_id,
            workoutId: workoutId,
            exercise: JSON.stringify(exercise),
          },
        })
      }
    >
      <Image
        source={{
          uri:
            exercise.image_url && exercise.image_url.trim()
              ? exercise.image_url
              : "https://via.placeholder.com/80x80/cccccc/666666?text=No+Image",
        }}
        style={{
          width: 80,
          height: 80,
          borderRadius: 5,
        }}
        resizeMode="contain"
        onError={(error) =>
          console.log("Image load error:", error.nativeEvent.error)
        }
        alt="Exercise GIF"
      />

      <View style={{ flex: 1, justifyContent: "space-between" }}>
        <Text
          style={{
            fontWeight: "bold",
            color: theme.text,
            fontSize: 16,
            marginBottom: 8,
          }}
        >
          {exercise.name}
        </Text>

        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            alignItems: "center",
            gap: 5,
            marginBottom: 10,
          }}
        >
          {exercise.target_muscles &&
            exercise.target_muscles.map((ex) => (
              <ExerciseTag
                key={ex}
                name={ex}
                type={ExerciseTagType.MUSCLE_PRIMARY}
              />
            ))}
          {exercise.secondary_muscles &&
            exercise.secondary_muscles.map((ex) => (
              <ExerciseTag
                key={ex}
                name={ex}
                type={ExerciseTagType.MUSCLE_SECONDARY}
              />
            ))}
          {exercise.equipments &&
            exercise.equipments.map((ex) => (
              <ExerciseTag
                key={ex}
                name={ex}
                type={ExerciseTagType.EQUIPMENT}
              />
            ))}
          {exercise.body_parts &&
            exercise.body_parts.map((ex) => (
              <ExerciseTag key={ex} name={ex} type={ExerciseTagType.BODYPART} />
            ))}
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <View>
            <Ionicons name="reorder-three" size={16} color={theme.text} />
            <GymText style={{ marginLeft: 5, color: theme.text }}>Sets</GymText>
          </View>
          <View>
            <Ionicons name="repeat-sharp" size={16} color={theme.text} />
            <GymText style={{ marginLeft: 5, color: theme.text }}>Reps</GymText>
          </View>
          <View>
            <Ionicons name="barbell-outline" size={16} color={theme.text} />
            <GymText style={{ marginLeft: 5, color: theme.text }}>
              Weight
            </GymText>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}
