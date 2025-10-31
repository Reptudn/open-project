import { getThemeColor } from "@/constants/theme";
import { useColorScheme, View, Text } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import TableStats from "@/components/ui/TableStats";

export default function TestComponentsScreen() {
  const theme = getThemeColor(useColorScheme());

  return (
    <ScrollView
      style={{ backgroundColor: theme.background, padding: 20 }}
    >
      <TableStats title="Körpergewicht" />
      <TableStats title="Bankdrücken" />
    </ScrollView>
  );
}
