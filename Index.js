import React, {useState} from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./comps/Login";
import Register from "./comps/Register";
import Welcome from "./comps/Welcome";
import Home from "./comps/Home";

const Stack = createNativeStackNavigator();

const Index = () => {
  const [state, setState] = useState(true);
  return (
    <NavigationContainer>
      <Stack.Navigator  screenOptions={{
      headerShown: false,
    }}
   >
   {state === false ?(
  <>
    <Stack.Screen name="Home" component={Home}/>

  </>
) : (
  <>
    <Stack.Screen name="Welcome" component={Welcome} setState={setState}/>
    <Stack.Screen name="Login" component={Login} setState={setState}/>
    <Stack.Screen name="Register" component={Register} setState={setState}/>
    {/* <Stack.Screen name="Home" component={Home}/> */}
  </>
)}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Index;
