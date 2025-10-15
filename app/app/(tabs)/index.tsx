import { ThemeColors } from "@/constants/theme";
import { View, StyleSheet, useColorScheme, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  DndProvider,
  DndProviderProps,
  Draggable,
  DraggableGrid,
  DraggableGridProps,
  DraggableStack,
  DraggableStackProps,
  ObjectWithId,
} from "@mgcrea/react-native-dnd";
import { GestureHandlerRootView, State } from "react-native-gesture-handler";
import { useState } from "react";

const items: string[] = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
const data = items.map((letter, index) => ({
  id: `${index}-${letter}`,
  value: letter,
})) satisfies ObjectWithId[];

export default function HomeScreen() {
  const colorScheme = useColorScheme();
  const styles = setStyles(colorScheme === "dark");

  const handleDragEnd: DndProviderProps["onDragEnd"] = ({ active, over }) => {
    "worklet";
    if (over) {
      console.log("onDragEnd", { active, over });
    }
  };

  const handleBegin: DndProviderProps["onBegin"] = () => {
    "worklet";
    console.log("onBegin");
  };

  const handleFinalize: DndProviderProps["onFinalize"] = ({ state }) => {
    "worklet";
    console.log("onFinalize", state);
    if (state !== State.FAILED) {
      console.log("onFinalize");
    }
  };

  // keep `data` as the canonical initial order, but render from state so
  // we can update the UI when the order changes
  const [gridData, setGridData] = useState<ObjectWithId[]>(data);

  const onGridOrderChange: DraggableGridProps["onOrderChange"] = (value) => {
    console.log("onGridOrderChange", value);
  };

  return (
    <SafeAreaView style={styles.container}>
      <GestureHandlerRootView>
        <DndProvider
          onBegin={handleBegin}
          onFinalize={handleFinalize}
          onDragEnd={handleDragEnd}
        >
          <>
            <DraggableGrid
              direction="row"
              size={2}
              gap={5}
              onOrderChange={onGridOrderChange}
            >
              {gridData.map((item) => (
                <Draggable
                  key={String(item.id)}
                  id={String(item.id)}
                  style={styles.box}
                >
                  <Text>{String((item as any).value)}</Text>
                </Draggable>
              ))}
            </DraggableGrid>
          </>
        </DndProvider>
      </GestureHandlerRootView>
    </SafeAreaView>
  );
}

const setStyles = (isDark: boolean) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDark
        ? ThemeColors.dark.background
        : ThemeColors.light.background,
      overflow: "hidden",
    },
    box: {
      height: 100,
      width: 150,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "darkseagreen",
      borderRadius: 17.6,
    },
  });
