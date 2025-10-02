import { Tabs } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { HapticTab } from "@/components/haptic-tab";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { View, TouchableOpacity } from "react-native";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: isDark ? "#d0d0c0" : "#242c40",
        tabBarInactiveTintColor: isDark ? "#8a8a8a" : "#666666",
        tabBarStyle: {
          backgroundColor: isDark ? "#242c40" : "#d0d0c0",
          borderTopColor: isDark ? "#404040" : "#b0b0a0",
        },
        headerShown: true,
        tabBarButton: HapticTab,
        headerStyle: {
          backgroundColor: isDark ? "#242c40" : "#d0d0c0",
        },
        headerTintColor: isDark ? "#d0d0c0" : "#242c40",
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Profile",
          headerTitle: "My Profile",
          headerLeft: () => (
            <TouchableOpacity style={{ marginLeft: 15 }}>
              <Ionicons
                name="person-circle-outline"
                size={24}
                color={isDark ? "#d0d0c0" : "#242c40"}
              />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity style={{ marginRight: 15 }}>
              <Ionicons
                name="notifications-outline"
                size={24}
                color={isDark ? "#d0d0c0" : "#242c40"}
              />
            </TouchableOpacity>
          ),
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="house.fill" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="training"
        options={{
          title: "Training",
          headerTitle: "Workout Training",
          headerRight: () => (
            <TouchableOpacity style={{ marginRight: 15 }}>
              <Ionicons
                name="add-outline"
                size={24}
                color={isDark ? "#d0d0c0" : "#242c40"}
              />
            </TouchableOpacity>
          ),
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="dumbbell.fill" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="calorie-tracker"
        options={{
          title: "Calories",
          headerTitle: "Calorie Tracker",
          headerRight: () => (
            <View style={{ flexDirection: "row", marginRight: 15, gap: 15 }}>
              <TouchableOpacity>
                <Ionicons
                  name="camera-outline"
                  size={24}
                  color={isDark ? "#d0d0c0" : "#242c40"}
                />
              </TouchableOpacity>
              <TouchableOpacity>
                <Ionicons
                  name="add-outline"
                  size={24}
                  color={isDark ? "#d0d0c0" : "#242c40"}
                />
              </TouchableOpacity>
            </View>
          ),
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="fork.knife" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          headerTitle: "App Settings",
          headerRight: () => (
            <TouchableOpacity style={{ marginRight: 15 }}>
              <Ionicons
                name="help-circle-outline"
                size={24}
                color={isDark ? "#d0d0c0" : "#242c40"}
              />
            </TouchableOpacity>
          ),
          tabBarIcon: ({ color }) => (
            <Ionicons name="settings" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
