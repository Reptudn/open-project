import { getThemeColor } from "@/constants/theme";
import { BottomSheetContext } from "@/hooks/use-bottomSheet-context";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import { PropsWithChildren, ReactNode, useRef, useState } from "react";
import { useColorScheme, StyleSheet } from "react-native";
import AuthProvider from "./auth-provider";

export default function BottomSheetProvider({ children }: PropsWithChildren) {
  const theme = getThemeColor(useColorScheme());
  const [content, setContent] = useState<ReactNode>(null);

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const openSheet = (content: ReactNode) => {
    setContent(content);
    bottomSheetModalRef.current?.present();
  };

  const closeSheet = () => {
    bottomSheetModalRef.current?.dismiss();
  };

  return (
    <BottomSheetContext.Provider
      value={{
        openSheet,
        closeSheet,
        bottomSheetModalRef,
        content,
        setContent,
      }}
    >
      {children}
      <AuthProvider>
        <BottomSheetModalProvider>
          <BottomSheetModal
            keyboardBehavior="interactive"
            keyboardBlurBehavior="restore"
            ref={bottomSheetModalRef}
            snapPoints={["25%", "50%"]}
            index={1}
          >
            {content}
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
