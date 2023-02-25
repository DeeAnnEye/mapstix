import React, { useState, useEffect } from "react";
import AppNavigator from "./AppNavigator";
import AuthNavigator from "./AuthNavigator";
import {
  NativeBaseProvider,
  Input,
  Text,
  Container,
  Heading,
  Center,
  Button,
  Pressable,
  Icon,
} from "native-base";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
const Stack = createNativeStackNavigator();

const Index = ({ navigation }) => {
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="App"
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="App" component={AppNavigator} />
          <Stack.Screen name="Auth" component={AuthNavigator} />          
        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
};

export default Index;
