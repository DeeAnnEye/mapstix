import React from "react";
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
import { StyleSheet } from "react-native";
import MapView, { Marker, AnimatedRegion } from "react-native-maps";
import AsyncStorage from '@react-native-async-storage/async-storage';

const Home = () => {
  const removeData = async () => {
    try {
    await AsyncStorage.removeItem('userId');
    } catch (error) {
    console.log(error);
    }
    };

  return (
    <NativeBaseProvider>
      <Container h="100%" w="100%" maxWidth="100%" bg="coolGray.50">
        <MapView
          followUserLocation={true}
          zoomEnabled={true}
          showsUserLocation={true}
          style={{ width: "100%", height: "90%" }}
          provider={MapView.PROVIDER_GOOGLE}
        />

        <Button
          colorScheme="violet"
          style={{ width: "50%", height: "10%" }}
          onPress={() => removeData()}
        >
          <Text style={{ color: "#fff" }}>Logout</Text>
        </Button>
      </Container>
    </NativeBaseProvider>
  );
};

export default Home;
