import { getThemeColor } from "@/constants/theme";
import { BottomSheetContext } from "@/hooks/use-bottomSheet-context";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import { PropsWithChildren, ReactNode, useRef, useState } from "react";
import { useColorScheme, StyleSheet, TouchableOpacity } from "react-native";
import AuthProvider from "./auth-provider";
import { stackRouterOverride } from "expo-router/build/layouts/StackClient";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function BottomSheetProvider({ children }: PropsWithChildren) {
  const theme = getThemeColor(useColorScheme());
  const [content, setContent] = useState<ReactNode[]>([]);

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const openSheet = (content: ReactNode) => {
    setContent((prev) => [...prev, content]);
    bottomSheetModalRef.current?.present();
  };

  const goBack = () => {
    setContent((prev) => prev.slice(0, -1));
  };

  const closeSheet = () => {
    setContent([]);
    bottomSheetModalRef.current?.dismiss();
  };

  return (
    <BottomSheetContext.Provider
      value={{
        openSheet,
        closeSheet,
        goBack,
        bottomSheetModalRef,
        content,
      }}
    >
      {children}
      <AuthProvider>
        <BottomSheetModalProvider>
          <BottomSheetModal
            keyboardBehavior="interactive"
            keyboardBlurBehavior="restore"
            ref={bottomSheetModalRef}
            snapPoints={["25%", "50%", "100%"]}
            index={1}
            onDismiss={() => setContent([])}
          >
            {content.length > 1 && (
              <TouchableOpacity onPress={() => goBack()}>
                <Ionicons name="arrow-back" size={24} color="#000" />
              </TouchableOpacity>
            )}
            {content.length > 0 && content[content.length - 1]}
          </BottomSheetModal>
        </BottomSheetModalProvider>
      </AuthProvider>
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
