import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Tabs } from "expo-router";
import React from "react";
import { StyleSheet } from "react-native";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <SafeAreaProvider>
      {/* セーフエリアの調整 */}
      <SafeAreaView edges={["top", "left", "right"]} style={styles.container}>
        <Tabs
          screenOptions={{
            tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
            headerShown: false,
            tabBarStyle: {
              paddingBottom: 0, // 必要に応じて調整
              marginBottom: 0, // 必要に応じて調整
            },
          }}
        >
          <Tabs.Screen
            name="(home)"
            options={{
              title: "Home",
              tabBarIcon: ({ color, focused }) => (
                <TabBarIcon
                  name={focused ? "home" : "home-outline"}
                  color={color}
                />
              ),
            }}
          />
          <Tabs.Screen
            name="history"
            options={{
              title: "History",
              tabBarIcon: ({ color, focused }) => (
                <TabBarIcon
                  name={focused ? "time" : "time-outline"}
                  color={color}
                />
              ),
            }}
          />
          <Tabs.Screen
            name="balance"
            options={{
              title: "Balance",
              tabBarIcon: ({ color, focused }) => (
                <TabBarIcon
                  name={focused ? "cash" : "cash-outline"}
                  color={color}
                />
              ),
            }}
          />
        </Tabs>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
