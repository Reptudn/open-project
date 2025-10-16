import { TouchableOpacity, Text, Image, View, StyleSheet, Dimensions } from "react-native";
import ExerciseTag, { ExerciseTagType } from "./ExerciseTag";
import { AddExerciseSmall } from "./AddExercise";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { ThemeColors } from "@/constants/theme";
import { Exercise } from "@/types/Exercise";
import { router } from "expo-router";

export default function ExerciseItem({ exercise }: { exercise: Exercise }) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
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
      onPress={
        () =>
          router.navigate({
            pathname: "/(training)/exerciseInfo",
            params:  {exercise: JSON.stringify(exercise)},
          })
      }
    >
      <Image
        source={{
          uri:
            exercise.imageUrl && exercise.imageUrl.trim()
              ? exercise.imageUrl
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
            color: "white",
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
          {exercise.targetMuscles &&
            exercise.targetMuscles.map((ex) => (
              <ExerciseTag
                key={ex}
                name={ex}
                type={ExerciseTagType.MUSCLE_PRIMARY}
              />
            ))}
          {exercise.secondaryMuscles &&
            exercise.secondaryMuscles.map((ex) => (
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
          {exercise.bodyParts &&
            exercise.bodyParts.map((ex) => (
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
        <AddExerciseSmall exerciseId={exercise.exerciseId} />
      </View>
    </TouchableOpacity>
  );
}

