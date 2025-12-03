import { StyleSheet, View, Text, TouchableOpacity } from "react-native";

export default function WorkoutCard({
  workout,
  onPress,
}: {
  workout: Workout;
  onPress: () => void;
}) {
  const dateString = new Date(workout.created_at).toLocaleDateString();

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
      <View style={styles.card}>
        <Text style={styles.title}>{workout.name}</Text>
        <View style={styles.footer}>
          <Text style={styles.dateLabel}>Created at:</Text>
          <Text style={styles.date}>{dateString}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,

	maxHeight: 70,
    width: "100%",
    alignSelf: "center",

    // iOS Shadow
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },

    // Android Shadow
    elevation: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: "#222",
    marginBottom: 8,
  },
  desc: {
    fontSize: 14,
    color: "#555",
    marginBottom: 12,
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
	justifyContent: "flex-end",
    marginTop: 4,
  },
  dateLabel: {
    fontSize: 12,
    fontWeight: "600",
    marginRight: 4,
    color: "#666",
  },
  date: {
    fontSize: 12,
    color: "#666",
  },
});
