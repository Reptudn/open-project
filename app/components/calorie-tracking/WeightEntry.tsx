import Ionicons from "@expo/vector-icons/Ionicons";
import { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useColorScheme } from "@/hooks/use-color-scheme.web";
import { getThemeColor } from "@/constants/theme";
import { getWeightByDate, updateWeightByDate } from "@/lib/api/daily/daily";

export default function WeightEntry({ date }: { date: Date }) {
  const [weight, setWeight] = useState<number>(0);
  const theme = getThemeColor(useColorScheme());

  useEffect(() => {
    const fetchWeight = async () => {
      try {
        const weight = await getWeightByDate(date);
        setWeight(weight ? weight : 0);
      } catch (error) {
        console.error("Failed to fetch weight:", error);
      }
    };

    fetchWeight();
  }, [date]);

  const clampWeight = (w: number) => {
    const rounded = Math.round(w);
    return Math.max(0, Math.min(500, rounded));
  };

  const updateWeight = async (newWeight: number) => {
    const prev = weight;
    const clapmedWeight = clampWeight(newWeight);
    setWeight(clapmedWeight);
    try {
      await updateWeightByDate(clapmedWeight, date);
      setWeight(clampWeight);
    } catch (error) {
      console.error("Failed to update weight:", error);
      setWeight(prev);
    }
  };
  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <View
            style={[
              styles.iconContainer,
              { backgroundColor: `${theme.tint}20` },
            ]}
          >
            <Ionicons name="fitness" size={16} color={theme.tint} />
          </View>
          <Text style={[styles.title, { color: theme.text }]}>Weight</Text>
        </View>
      </View>

      {/* Weight Display */}
      <View style={styles.weightDisplay}>
        <Text style={[styles.weightValue, { color: theme.text }]}>
          {weight.toFixed(1)}
        </Text>
        <Text style={[styles.weightUnit, { color: theme.text }]}>kg</Text>
      </View>

      {/* Control Buttons */}
      <View style={styles.controlsContainer}>
        <View style={styles.controlsRow}>
          <TouchableOpacity
            style={[styles.controlButton, { backgroundColor: theme.button }]}
            onPress={() => updateWeight(weight - 1)}
            activeOpacity={0.7}
          >
            <Ionicons name="remove" size={18} color={theme.text} />
            <Text style={[styles.controlButtonText, { color: theme.text }]}>
              1.0
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.controlButton, { backgroundColor: theme.button }]}
            onPress={() => updateWeight(weight - 0.1)}
            activeOpacity={0.7}
          >
            <Ionicons name="remove" size={16} color={theme.text} />
            <Text style={[styles.controlButtonText, { color: theme.text }]}>
              0.1
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.controlButton, { backgroundColor: theme.button }]}
            onPress={() => updateWeight(weight + 0.1)}
            activeOpacity={0.7}
          >
            <Ionicons name="add" size={16} color={theme.text} />
            <Text style={[styles.controlButtonText, { color: theme.text }]}>
              0.1
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.controlButton, { backgroundColor: theme.button }]}
            onPress={() => updateWeight(weight + 1)}
            activeOpacity={0.7}
          >
            <Ionicons name="add" size={18} color={theme.text} />
            <Text style={[styles.controlButtonText, { color: theme.text }]}>
              1.0
            </Text>
          </TouchableOpacity>
        </View>
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
    padding: 14,
    borderWidth: 1,
    borderColor: "rgba(0, 0, 0, 0.06)",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  iconContainer: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 14,
    fontWeight: "600",
  },
  weightDisplay: {
    flexDirection: "row",
    alignItems: "baseline",
    justifyContent: "center",
    marginBottom: 14,
    gap: 3,
  },
  weightValue: {
    fontSize: 32,
    fontWeight: "700",
  },
  weightUnit: {
    fontSize: 14,
    fontWeight: "500",
    opacity: 0.8,
  },
  controlsContainer: {
    alignItems: "center",
  },
  controlsRow: {
    flexDirection: "row",
    gap: 6,
  },
  controlButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
    gap: 3,
    minWidth: 50,
    justifyContent: "center",
  },
  controlButtonText: {
    fontSize: 10,
    fontWeight: "500",
  },
});
