import { View, StyleSheet, TouchableOpacity, Image, Text } from "react-native";

export default function ExerciseCard({
  exercise,
  onPress,
}: {
  exercise: Exercise;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity style={styles.card} activeOpacity={0.8} onPress={onPress}>
      <Image source={{ uri: exercise.image_url }} style={styles.image} />

      <View style={styles.content}>
        <Text style={styles.name}>{exercise.name}</Text>
        <Text style={styles.bodyParts}>{exercise.body_parts?.join(", ")}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 12,
    marginVertical: 8,
    marginHorizontal: 16,

    // Shadow für iOS
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },

    // Shadow für Android
    elevation: 4,
  },

  image: {
    width: 80,
    height: 80,
    borderRadius: 12,
    marginRight: 12,
  },

  content: {
    flex: 1,
    justifyContent: "center",
  },

  name: {
    fontSize: 16,
    fontWeight: "700",
    color: "#222",
    marginBottom: 4,
  },

  bodyParts: {
    fontSize: 14,
    color: "#555",
  },
});
