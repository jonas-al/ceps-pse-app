import { Tabs } from "expo-router";

import { TabBarIcon } from "@/components/navigation/TabBarIcon";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarShowLabel: false,
        tabBarActiveTintColor: "#FFFFFF",
        tabBarStyle: {
          backgroundColor: "#AD550B",
          borderTopStartRadius: 24,
          borderTopEndRadius: 24,
          height: 80,
        },
        unmountOnBlur: true,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Início",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name="home"
              color={focused ? color : "hsla(0, 0%, 100%, 0.6)"}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="form"
        options={{
          title: "Formulário",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={"file-tray-full-outline"}
              color={focused ? color : "hsla(0, 0%, 100%, 0.6)"}
            />
          ),
          href: {
            pathname: "/form",
          },
        }}
      />
      <Tabs.Screen
        name="saved-interviews"
        options={{
          title: "Entrevistas salvas",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={"list"}
              color={focused ? color : "hsla(0, 0%, 100%, 0.6)"}
            />
          ),
        }}
      />
    </Tabs>
  );
}
