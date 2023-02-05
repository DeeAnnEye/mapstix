import * as React from "react";
import { Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import MapScreen from "./MapScreen";
import GroupScreen from "./GroupScreen";
import ChatScreen from "./ChatScreen";

const Tab = createMaterialTopTabNavigator();

const TabNav = () => {
  return (
    <Tab.Navigator
      initialRouteName="Map"
      tabBarOptions={{
        activeTintColor: "#fff",
        inactiveTintColor: "lightgray",
        activeBackgroundColor: "#fff",
        inactiveBackgroundColor: "#fff",
        style: {
          backgroundColor: "#8F00FF",
          paddingBottom: 3,
        },
      }}
    >
      <Tab.Screen name="Groups" component={GroupScreen} />
      <Tab.Screen name="Map" component={MapScreen} />
      <Tab.Screen name="Chat" component={ChatScreen} />
    </Tab.Navigator>
  );
};

export default TabNav;
