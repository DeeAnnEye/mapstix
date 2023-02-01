import React, {useState,useEffect} from "react";
import AppNavigator from "./AppNavigator";
import AuthNavigator from "./AuthNavigator";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
const Stack = createNativeStackNavigator();

const Index = () => {

  return (
    <NavigationContainer>
    <Stack.Navigator screenOptions={{
    headerShown: false,
  }}
  initialRouteName="App"
  >
      <Stack.Screen name="Auth" component={AuthNavigator} />
      <Stack.Screen name="App" component={AppNavigator} />
    </Stack.Navigator>
  </NavigationContainer>
  );
};

export default Index;
