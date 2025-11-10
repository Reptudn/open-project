import React from "react";
import { ScrollView, View, StyleSheet } from "react-native";
import { getThemeColor } from "@/constants/theme";
import { useColorScheme } from "react-native";
import TableStats from "@/components/ui/TableStats";

export default function TestComponentsScreen() {
  const theme = getThemeColor(useColorScheme());

  return (
    <ScrollView style={{ backgroundColor: theme.background, padding: 20 }}>
      <View style={styles.container}>
        <TableStats />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
