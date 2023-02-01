import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./comps/Login";
import Register from "./comps/Register";
import Welcome from "./comps/Welcome";
const Stack = createNativeStackNavigator();

const AuthNavigator = () => {
  return (
   
      <Stack.Navigator screenOptions={{
      headerShown: false,
    }}>
        <Stack.Screen name="Welcome" component={Welcome}/>
        <Stack.Screen name="Login" component={Login}/>
        <Stack.Screen name="Register" component={Register}/>
      </Stack.Navigator>
   
  );
};

export default AuthNavigator;
