import React , {useState,useEffect} from "react";
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
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Location from 'expo-location';

const MapScreen = () => {

  const [location, setLocation] = useState(null);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  useEffect(() => {
    (async () => {
      
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let loc = await Location.getCurrentPositionAsync({});      
      setLocation(loc);
      setLatitude(loc.coords.latitude)
      setLongitude(loc.coords.longitude)
    })();
  }, []);

  return (
    <NativeBaseProvider>
      <Container h="100%" w="100%" maxWidth="100%" bg="coolGray.50">
        <MapView
          followUserLocation={true}
          zoomEnabled={true}
          showsUserLocation={true}
          style={{ width: "100%", height: "100%" }}
          provider={MapView.PROVIDER_GOOGLE}
        />
         
      </Container>
    </NativeBaseProvider>
  );
};

export default MapScreen;
