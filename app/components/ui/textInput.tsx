import { TextInput, StyleSheet, useColorScheme } from "react-native";

export default function TextInputWrapper({ ...props }) {
  const color = useColorScheme();
  const styles = setStyles(color === "dark");

  return <TextInput {...props} style={styles.input} />;
}

const setStyles = (isDark: boolean) =>
  StyleSheet.create({
    input: {},
  });
