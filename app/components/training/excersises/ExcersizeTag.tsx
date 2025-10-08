import { StyleSheet, View, Text } from "react-native";
import { useColorScheme } from "@/hooks/use-color-scheme";

export enum ExcersizeTagType {
  BODYPART = "#2becccff",
  EQUIPMENT = "#84f33aff",
  MUSCLE_PRIMARY = "#eb2630ff",
  MUSCLE_SECONDARY = "#f5a623ff",
}

export default function ExcersizeTag(props: {
  name: string;
  type: ExcersizeTagType;
}) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: props.type,
          borderColor: props.type,
        },
      ]}
    >
      <Text style={[styles.text, { color: isDark ? "#d0d0c0" : "#242c40" }]}>
        {props.name}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 14,
    fontWeight: "500",
    textAlign: "center",
  },
  container: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    borderWidth: 1,
    alignSelf: "flex-start",
    justifyContent: "center",
    alignItems: "center",
  },
});
