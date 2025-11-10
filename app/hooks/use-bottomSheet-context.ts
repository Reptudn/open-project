import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { createContext, ReactNode, useContext } from "react";

export type BottomSheetData = {
  openSheet: (content: ReactNode) => void;
  closeSheet: () => void;
  bottomSheetModalRef: React.RefObject<BottomSheetModal | null>;
  content: ReactNode;
  setContent: (content: ReactNode) => void;
};

export const BottomSheetContext = createContext<BottomSheetData>({
  openSheet: () => {
    throw new Error("openSheet not implemented");
  },
  closeSheet: () => {
    throw new Error("closeSheet not implemented");
  },
  setContent: () => {
    throw new Error("setContent not implemented");
  },
  bottomSheetModalRef: { current: null },
  content: null
});

export const useBottomSheetContext = () => useContext(BottomSheetContext);
