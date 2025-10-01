import React from "react";
import { Button, List, ListItem } from "@ui-kitten/components";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import { ThemeContext } from "../theme-context";

function onPress() {
  alert("Hilfeeee");
}

export default function HomeScreen() {
  const themeContext = React.useContext(ThemeContext);
  return (
    <SafeAreaView>
      <Text style={styles.header}>Settings</Text>
      <TouchableOpacity style={styles.item} onPress={themeContext.toggleTheme}>
        <Ionicons
          name={themeContext.theme === "light" ? "sunny-sharp" : "moon-sharp"}
          size={24}
          color="#ffffffff"
          style={styles.itemIcon}
        />
        <Text style={styles.title}>Appearance</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.item}>
        <Ionicons
          name="beer-sharp"
          size={24}
          color="#ffffffff"
          style={styles.itemIcon}
        />
        <Text style={styles.title}>Test12</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.item}>
        <Ionicons
          name="log-out-sharp"
          size={24}
          color="#ffffffff"
          style={styles.itemIcon}
        />
        <Text style={styles.title}>Log out</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  icon: {
    width: 32,
    height: 32,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
  text: {
    color: "black",
  },
  header: {
    color: "black",
    fontSize: 40,
    fontWeight: "bold",
    margin: 20,
  },
  item: {
    backgroundColor: "#dadadaff",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  itemIcon: {
    marginRight: 15,
  },
  title: {
    fontSize: 20,
  },
});
