import { getThemeColor } from "@/constants/theme";
import { useColorScheme, View, Text, StyleSheet } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function DayNutritionOverview({
  eaten,
  burnt,
  toGo,
}: {
  eaten: number;
  burnt: number;
  toGo: number;
}) {
  const colorScheme = useColorScheme();
  const theme = getThemeColor(colorScheme);

  const remaining = Math.max(toGo - eaten, 0);
  const progress = eaten / (eaten + remaining);

  const nutritionStats = [
    {
      title: "Consumed",
      value: eaten,
      icon: "restaurant" as const,
      color: "#4CAF50",
      subtitle: "calories eaten",
    },
    {
      title: "Remaining",
      value: remaining,
      icon: "hourglass" as const,
      color: theme.tint,
      subtitle: "to reach goal",
    },
    {
      title: "Burned",
      value: burnt,
      icon: "flame" as const,
      color: "#FF5722",
      subtitle: "from exercise",
    },
  ];

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Header Section */}
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.text }]}>
          Nutrition Overview
        </Text>
      </View>

      {/* Stats Grid */}
      <View style={styles.statsGrid}>
        {nutritionStats.map((stat, index) => (
          <View
            key={stat.title}
            style={[
              styles.statCard,
              { backgroundColor: theme.button },
              index === 1 && styles.middleCard,
            ]}
          >
            <View
              style={[styles.statIcon, { backgroundColor: `${stat.color}20` }]}
            >
              <Ionicons name={stat.icon} size={20} color={stat.color} />
            </View>
            <Text style={[styles.statValue, { color: theme.text }]}>
              {stat.value.toLocaleString()}
            </Text>
            <Text style={[styles.statTitle, { color: theme.text }]}>
              {stat.title}
            </Text>
          </View>
        ))}
      </View>

      {/* Progress Bar */}
      <View style={styles.progressBarContainer}>
        <View
          style={[
            styles.progressBarBackground,
            { backgroundColor: `${theme.text}15` },
          ]}
        >
          <View
            style={[
              styles.progressBarFill,
              {
                backgroundColor: progress > 0.8 ? "#4CAF50" : theme.tint,
                width: `${Math.min(progress * 100, 100)}%`,
              },
            ]}
          />
        </View>
        <Text style={[styles.progressLabel, { color: theme.text }]}>
          {eaten} / {eaten + remaining} cal ({Math.round(progress * 100)}%)
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
    overflow: "hidden",
    padding: 16,
    borderWidth: 1,
    borderColor: "rgba(0, 0, 0, 0.06)",
  },
  header: {
    marginBottom: 14,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
  },
  statsGrid: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 12,
  },
  statCard: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  middleCard: {
    marginHorizontal: 2,
  },
  statIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 6,
  },
  statValue: {
    fontSize: 14,
    fontWeight: "700",
    marginBottom: 2,
  },
  statTitle: {
    fontSize: 10,
    fontWeight: "500",
  },
  progressBarContainer: {
    alignItems: "center",
  },
  progressBarBackground: {
    width: "100%",
    height: 6,
    borderRadius: 3,
    marginBottom: 6,
    overflow: "hidden",
  },
  progressBarFill: {
    height: "100%",
    borderRadius: 3,
  },
  progressLabel: {
    fontSize: 10,
    fontWeight: "500",
    opacity: 0.7,
  },
});
