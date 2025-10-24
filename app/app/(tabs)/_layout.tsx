import { Tabs } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { HapticTab } from "@/components/haptic-tab";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { TouchableOpacity } from "react-native";
import { ThemeColors } from "@/constants/theme";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: isDark
          ? ThemeColors.dark.tabBarActiveTintColor
          : ThemeColors.light.tabBarActiveTintColor,
        tabBarInactiveTintColor: isDark
          ? ThemeColors.dark.tabBarInactiveTintColor
          : ThemeColors.light.tabBarInactiveTintColor,
        tabBarStyle: {
          backgroundColor: isDark
            ? ThemeColors.dark.background
            : ThemeColors.light.background,
          borderTopColor: isDark
            ? ThemeColors.dark.borderTopColor
            : ThemeColors.light.borderTopColor,
        },
        headerShown: true,
        tabBarButton: HapticTab,
        headerStyle: {
          backgroundColor: isDark
            ? ThemeColors.dark.background
            : ThemeColors.light.background,
        },
        headerTintColor: isDark
          ? ThemeColors.dark.headerTintColor
          : ThemeColors.light.headerTintColor,
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
                color={isDark ? ThemeColors.dark.icon : ThemeColors.light.icon}
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
            <TouchableOpacity style={{ marginRight: 15 }} onPress={() => {}}>
              <Ionicons
                name="add-outline"
                size={24}
                color={isDark ? ThemeColors.dark.icon : ThemeColors.light.icon}
              />
            </TouchableOpacity>
          ),
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="dumbbell.fill" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="calorie_tracker"
        options={{
          title: "Calories",
          headerTitle: "Calorie Tracker",
          headerShown: false,
          // headerRight: () => (
          //   <View style={{ flexDirection: "row", marginRight: 15, gap: 15 }}>
          //     <TouchableOpacity>
          //       <Ionicons
          //         name="camera-outline"
          //         size={24}
          //         color={
          //           isDark ? ThemeColors.dark.icon : ThemeColors.light.icon
          //         }
          //       />
          //     </TouchableOpacity>
          //     <TouchableOpacity>
          //       <Ionicons
          //         name="add-outline"
          //         size={24}
          //         color={
          //           isDark ? ThemeColors.dark.icon : ThemeColors.light.icon
          //         }
          //       />
          //     </TouchableOpacity>
          //   </View>
          // ),
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
                color={isDark ? ThemeColors.dark.icon : ThemeColors.light.icon}
              />
            </TouchableOpacity>
          ),
          tabBarIcon: ({ color }) => (
            <Ionicons name="settings" size={24} color={color} />
          ),
        }}
      />
      {process.env.NODE_ENV == 'development' && (<Tabs.Screen
        name="TestComponents"
        options={{
          title: "TestComponents",
          headerTitle: "Components",
          headerLeft: () => (
            <TouchableOpacity style={{ marginLeft: 15 }}>
              <Ionicons
                name="help-circle"
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
                color={isDark ? ThemeColors.dark.icon : ThemeColors.light.icon}
              />
            </TouchableOpacity>
          ),
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="house.fill" color={color} />
          ),
        }}
      />)}
    </Tabs>
  );
}
