import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { Appearance, ColorSchemeName } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

type ThemeMode = "auto" | "light" | "dark";

interface ThemeContextType {
  themeMode: ThemeMode;
  currentTheme: ColorSchemeName;
  setThemeMode: (mode: ThemeMode) => void;
}

const ThemeContext = createContext<ThemeContextType>({
  themeMode: "auto",
  currentTheme: "light",
  setThemeMode: () => {},
});

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [themeMode, setThemeModeState] = useState<ThemeMode>("auto");
  const [currentTheme, setCurrentTheme] = useState<ColorSchemeName>(
    Appearance.getColorScheme() || "light"
  );

  const applyTheme = (mode: ThemeMode) => {
    if (mode === "auto") {
      const systemTheme = Appearance.getColorScheme();
      setCurrentTheme(systemTheme);
      Appearance.setColorScheme(null); // Let system handle it
    } else {
      setCurrentTheme(mode);
      Appearance.setColorScheme(mode);
    }
  };

  // Load saved theme mode on app start
  useEffect(() => {
    const loadSavedThemeMode = async () => {
      try {
        const savedMode = await AsyncStorage.getItem("themeMode");
        if (savedMode && ["auto", "light", "dark"].includes(savedMode)) {
          const mode = savedMode as ThemeMode;
          setThemeModeState(mode);
          applyTheme(mode);
        }
      } catch (error) {
        console.log("Error loading theme mode:", error);
      }
    };

    loadSavedThemeMode();
  }, []);

  // Listen to system theme changes
  useEffect(() => {
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      if (themeMode === "auto") {
        setCurrentTheme(colorScheme);
      }
    });

    return () => subscription?.remove();
  }, [themeMode]);

  const setThemeMode = async (mode: ThemeMode) => {
    try {
      setThemeModeState(mode);
      await AsyncStorage.setItem("themeMode", mode);
      applyTheme(mode);
    } catch (error) {
      console.log("Error saving theme mode:", error);
    }
  };

  const value: ThemeContextType = {
    themeMode,
    currentTheme,
    setThemeMode,
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

// Expo Router requires a default export for route files
// Since this is a context file, we'll export a dummy component
export default function ThemeContextRoute() {
  return null;
}
