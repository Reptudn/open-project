import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  Alert,
  View,
  Appearance,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useColorScheme } from "@/hooks/use-color-scheme";
// import { useAuth } from "../../contexts/AuthContext";
import Ionicons from "@expo/vector-icons/Ionicons";
import { logOut } from "@/components/auth/Auth";
import { ThemeColors } from "@/constants/theme";

export default function SettingsScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  // const { logout, user } = useAuth();

  const handleLogout = () => {
    Alert.alert("Sign Out", "Are you sure you want to sign out?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Sign Out",
        style: "destructive",
        onPress: async () => {
          await logOut();
        },
      },
    ]);
  };

  //Settings Components

  const ThemeBtn = () => {
    return (
      <TouchableOpacity
        style={[
          styles.item,
          {
            backgroundColor: isDark
              ? ThemeColors.dark.button
              : ThemeColors.light.button,
          },
        ]}
        onPress={() => {
          const newTheme = isDark ? "light" : "dark";
          Appearance.setColorScheme(newTheme);
        }}
      >
        <Ionicons
          name="contrast-outline"
          size={24}
          color={isDark ? ThemeColors.dark.text : "#242c40"}
          style={styles.itemIcon}
        />
        <View style={styles.itemContent}>
          <Text
            style={[
              styles.title,
              { color: isDark ? ThemeColors.dark.text : "#242c40" },
            ]}
          >
            Quick Theme Toggle
          </Text>
          <Text
            style={[styles.subtitle, { color: isDark ? "#8a8a8a" : "#666666" }]}
          >
            Switch to {isDark ? "Light" : "Dark"} Mode
          </Text>
        </View>
        <Ionicons
          name={isDark ? "sunny-outline" : "moon-outline"}
          size={20}
          color={isDark ? "#8a8a8a" : "#666666"}
        />
      </TouchableOpacity>
    );
  };

  const ProfileBtn = () => {
    return (
      <TouchableOpacity
        style={[
          styles.item,
          {
            backgroundColor: isDark
              ? ThemeColors.dark.button
              : ThemeColors.light.button,
          },
        ]}
      >
        <Ionicons
          name="person-circle-outline"
          size={24}
          color={isDark ? ThemeColors.dark.text : "#242c40"}
          style={styles.itemIcon}
        />
        <View style={styles.itemContent}>
          <Text
            style={[
              styles.title,
              { color: isDark ? ThemeColors.dark.text : "#242c40" },
            ]}
          >
            Profile
          </Text>
          <Text
            style={[styles.subtitle, { color: isDark ? "#8a8a8a" : "#666666" }]}
          >
            {/* {user?.name || user?.email || "User"} */} User
          </Text>
        </View>
        <Ionicons
          name="chevron-forward"
          size={20}
          color={isDark ? "#8a8a8a" : "#666666"}
        />
      </TouchableOpacity>
    );
  };

  const NotificationsBtn = () => {
    return (
      <TouchableOpacity
        style={[
          styles.item,
          {
            backgroundColor: isDark
              ? ThemeColors.dark.button
              : ThemeColors.light.button,
          },
        ]}
      >
        <Ionicons
          name="notifications-outline"
          size={24}
          color={isDark ? ThemeColors.dark.text : "#242c40"}
          style={styles.itemIcon}
        />
        <View style={styles.itemContent}>
          <Text
            style={[
              styles.title,
              {
                color: isDark ? ThemeColors.dark.text : ThemeColors.light.text,
              },
            ]}
          >
            Notifications
          </Text>
          <Text
            style={[styles.subtitle, { color: isDark ? "#8a8a8a" : "#666666" }]}
          >
            Manage your notifications
          </Text>
        </View>
        <Ionicons
          name="chevron-forward"
          size={20}
          color={isDark ? "#8a8a8a" : "#666666"}
        />
      </TouchableOpacity>
    );
  };

  const LogoutBtn = () => {
    return (
      <TouchableOpacity
        style={[
          styles.item,
          {
            backgroundColor: isDark
              ? ThemeColors.dark.button
              : ThemeColors.light.button,
          },
        ]}
        onPress={handleLogout}
      >
        <Ionicons
          name="log-out-outline"
          size={24}
          color="#ff4444"
          style={styles.itemIcon}
        />
        <View style={styles.itemContent}>
          <Text style={[styles.title, { color: "#ff4444" }]}>Sign Out</Text>
          <Text
            style={[styles.subtitle, { color: isDark ? "#8a8a8a" : "#666666" }]}
          >
            Sign out of your account
          </Text>
        </View>
        <Ionicons name="chevron-forward" size={20} color="#ff4444" />
      </TouchableOpacity>
    );
  };

  // Main settings page with components
  return (
    <SafeAreaView
      style={[
        styles.container,
        {
          backgroundColor: isDark
            ? ThemeColors.dark.background
            : ThemeColors.light.background,
        },
      ]}
    >
      {/* Settings Section */}
      <ThemeBtn></ThemeBtn>

      {/* Profile Section */}
      <ProfileBtn></ProfileBtn>

      {/* Notifications */}
      <NotificationsBtn></NotificationsBtn>

      {/* Logout */}
      <LogoutBtn></LogoutBtn>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
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
  itemContent: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
  },
  subtitle: {
    fontSize: 14,
    marginTop: 2,
  },
});
