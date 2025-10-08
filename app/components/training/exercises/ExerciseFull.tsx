import { ThemeColors } from "@/constants/theme";
import { View, Text, useColorScheme, Image } from "react-native";
import AddExerciseFull from "./AddExercise";
import ExerciseTag, { ExerciseTagType } from "./ExerciseTag";
import { Exercise } from "@/types/Exercise";

export default function ExerciseFull(props: Exercise) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  const exercise = {
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
  };

  return (
    <View
      style={{
        backgroundColor: isDark
          ? ThemeColors.dark.background
          : ThemeColors.light.background,
      }}
    >
      <Text
        style={{
          color: isDark ? ThemeColors.dark.text : ThemeColors.light.text,
        }}
      >
        {exercise.name}
      </Text>
      <Image
        source={{ uri: exercise.gifUrl }}
        style={{
          width: "100%",
          height: 200,
          borderRadius: 12,
          marginVertical: 12,
        }}
        resizeMode="cover"
      />
      <View>
        <Text
          style={{
            color: isDark ? ThemeColors.dark.text : ThemeColors.light.text,
            fontWeight: "bold",
            marginBottom: 8,
          }}
        >
          Tags:
        </Text>
        {exercise.targetMuscles.map((muscle, index) => (
          <ExerciseTag
            key={index}
            name={muscle.toLocaleUpperCase()}
            type={ExerciseTagType.MUSCLE_PRIMARY}
          />
        ))}
        {exercise.secondaryMuscles.map((muscle, index) => (
          <ExerciseTag
            key={index}
            name={muscle.toLocaleUpperCase()}
            type={ExerciseTagType.MUSCLE_SECONDARY}
          />
        ))}
        {exercise.bodyParts.map((part, index) => (
          <ExerciseTag
            key={index}
            name={part.toLocaleUpperCase()}
            type={ExerciseTagType.BODYPART}
          />
        ))}
        {exercise.equipments.map((equipment, index) => (
          <ExerciseTag
            key={index}
            name={equipment.toLocaleUpperCase()}
            type={ExerciseTagType.EQUIPMENT}
          />
        ))}
      </View>
      <View>
        {exercise.instructions.map((step, index) => (
          <Text
            key={index}
            style={{
              color: isDark ? ThemeColors.dark.text : ThemeColors.light.text,
              marginBottom: 8,
            }}
          >
            {step}
          </Text>
        ))}
      </View>
      <AddExerciseFull name={exercise.name} />
    </View>
  );
}
