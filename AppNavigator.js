import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Home from "./comps/Home";
import AuthNavigator from "./AuthNavigator";
const Stack = createNativeStackNavigator();

const AppNavigator = () => {
const [state, setState] = useState(false);

  useEffect(() => {
    retrieveData()
  });

  const retrieveData = async () => {
    try {
      const userId = await AsyncStorage.getItem('userId');
      console.log(userId)
      if (userId === null) {
        setState(false);
      }
      else{
        setState(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    !state ?
   ( <AuthNavigator/> ) :
   (
      <Stack.Navigator screenOptions={{
      headerShown: false,
    }}>
        <Stack.Screen name="Home" component={Home} />
      </Stack.Navigator>

   )
  );
};

export default AppNavigator;
