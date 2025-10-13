import { TouchableOpacity, Text, Image, View } from "react-native";
import ExerciseTag, { ExerciseTagType } from "./ExerciseTag";
import { AddExerciseSmall } from "./AddExercise";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { ThemeColors } from "@/constants/theme";

export interface ExerciseItemProps {
  exerciseId: string;
  name: string;
  imageUrl: string;
  tags: { type: ExerciseTagType; name: string }[];
}

export default function ExerciseItem(props: ExerciseItemProps) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  return (
    <TouchableOpacity
      style={{
        marginBottom: 20,
        backgroundColor: isDark ? ThemeColors.dark.background : ThemeColors.light.background,
        padding: 10,
        borderRadius: 10,
        flexDirection: "row",
        alignItems: "flex-start",
        gap: 15,
        width: "100%",
      }}
    >
      <Image
        source={{ uri: props.imageUrl }}
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
          {props.name}
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
          {props.tags.map((tag, index) => (
            <ExerciseTag key={index} name={tag.name} type={tag.type} />
          ))}
        </View>
      </View>
      <View style={{ alignItems: "flex-end" }}>
        <AddExerciseSmall exerciseId={props.exerciseId} />
      </View>
    </TouchableOpacity>
  );
}
