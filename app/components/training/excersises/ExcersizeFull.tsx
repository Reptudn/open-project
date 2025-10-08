import { ThemeColors } from "@/constants/theme";
import { View, Text, useColorScheme, Image } from "react-native";
import ExcersizeTag, { ExcersizeTagType } from "./ExcersizeTag";
import AddExcersizeFull from "./AddExcersise";
import { Excersize } from "@/types/Excersize";

export default function ExcersizeFull(props: Excersize) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  const excersize = {
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
        {excersize.name}
      </Text>
      <Image
        source={{ uri: excersize.gifUrl }}
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
        {excersize.targetMuscles.map((muscle, index) => (
          <ExcersizeTag
            key={index}
            name={muscle.toLocaleUpperCase()}
            type={ExcersizeTagType.MUSCLE_PRIMARY}
          />
        ))}
        {excersize.secondaryMuscles.map((muscle, index) => (
          <ExcersizeTag
            key={index}
            name={muscle.toLocaleUpperCase()}
            type={ExcersizeTagType.MUSCLE_SECONDARY}
          />
        ))}
        {excersize.bodyParts.map((part, index) => (
          <ExcersizeTag
            key={index}
            name={part.toLocaleUpperCase()}
            type={ExcersizeTagType.BODYPART}
          />
        ))}
        {excersize.equipments.map((equipment, index) => (
          <ExcersizeTag
            key={index}
            name={equipment.toLocaleUpperCase()}
            type={ExcersizeTagType.EQUIPMENT}
          />
        ))}
      </View>
      <View>
        {excersize.instructions.map((step, index) => (
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
      <AddExcersizeFull name={excersize.name} />
    </View>
  );
}
