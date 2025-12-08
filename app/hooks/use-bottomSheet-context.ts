import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { createContext, ReactNode, useContext } from "react";

export type BottomSheetData = {
  openSheet: (content: ReactNode) => void;
  closeSheet: () => void;
  goBack: () => void;
  bottomSheetModalRef: React.RefObject<BottomSheetModal | null>;
  content: ReactNode;
};

export const BottomSheetContext = createContext<BottomSheetData>({
  openSheet: () => {
    throw new Error("openSheet not implemented");
  },
  closeSheet: () => {
    throw new Error("closeSheet not implemented");
  },
  goBack: () => {
    throw new Error("goBack not implemented");
  },
  bottomSheetModalRef: { current: null },
  content: null,
});

export const useBottomSheetContext = () => useContext(BottomSheetContext);
