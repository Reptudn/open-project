import { getThemeColor } from "@/constants/theme";
import { BottomSheetContext } from "@/hooks/use-bottomSheet-context";
import { BottomSheetModal, BottomSheetView, BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { PropsWithChildren, useRef, useState } from "react";
import { useColorScheme, StyleSheet, Text } from "react-native";

export default function BottomSheetProvider({ children }: PropsWithChildren) {
  const theme = getThemeColor(useColorScheme());
  const [content, setContent] = useState<ReactNode>(null);

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const openSheet = (content: ReactNode) => {
    setContent(content)
    bottomSheetModalRef.current?.present();
  };

  const closeSheet = () => {
    bottomSheetModalRef.current?.dismiss();
  };

  return (
    <BottomSheetContext.Provider
      value={{ openSheet, closeSheet, bottomSheetModalRef, content, setContent }}
    >
      {children}
      <BottomSheetModalProvider>
        <BottomSheetModal
          ref={bottomSheetModalRef}
          snapPoints={["25%", "50%", "90%"]}
          index={1}
        >
          <BottomSheetView style={styles.contentContainer}>
            {content}
          </BottomSheetView>
        </BottomSheetModal>
      </BottomSheetModalProvider>
    </BottomSheetContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    backgroundColor: "grey",
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
  },
});
