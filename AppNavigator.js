import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Home from "./comps/Home";
import AuthNavigator from "./AuthNavigator";
import {
  NativeBaseProvider,
  Input,
  Text,
  Container,
  Heading,
  Center,
  Button,
  Box,
  Link,
  VStack,
} from "native-base";
const Stack = createNativeStackNavigator();

const AppNavigator = ({ navigation }) => {
  const [state, setState] = useState(false);

  useEffect(() => {
    retrieveData();
  });

  const retrieveData = async () => {
    try {
      const userId = await AsyncStorage.getItem("userId");
      // console.log(userId)
      if (userId === null) {
        setState(false);
      } else {
        setState(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const removeData = async () => {
    try {
      await AsyncStorage.removeItem("userId");
      navigation.navigate("Auth");
    } catch (error) {
      console.log(error);
    }
  };

  return state ? (
    <Stack.Navigator>
      <Stack.Screen
        options={{
          title: "MapStix",
          headerStyle: {
            backgroundColor: "#fff",
          },
          headerTintColor: "#7F00FF",
          headerRight: () => (
            <Button
              title="test"
              colorScheme="violet"
              onPress={() => removeData()}
            >
              <Text>Logout</Text>
            </Button>
          ),
        }}
        name="Home"
        component={Home}
      />
    </Stack.Navigator>    
  ) : (
    <AuthNavigator />
  );
};

export default AppNavigator;
