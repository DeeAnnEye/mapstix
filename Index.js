import React, {useState,useEffect} from "react";
import AppNavigator from "./AppNavigator";
import AuthNavigator from "./AuthNavigator";
import AsyncStorage from '@react-native-async-storage/async-storage';

const Index = () => {

  const [state,setState] = useState(false);

  // useEffect(() => {
  //   retrieveData()
  // },[state]);

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
    state ? <AppNavigator/>:<AuthNavigator/>
  );
};

export default Index;
