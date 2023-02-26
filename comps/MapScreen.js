import React, { useState, useEffect, useRef } from "react";
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
import * as Location from "expo-location";

const MapScreen = () => {
  const map = useRef();
  const [location, setLocation] = useState(null);

  useEffect(()=>{
    (async()=>{
      if(map.current){
        let {coords} = await Location.getCurrentPositionAsync({});
        // console.log(loc)
      map.current.animateCamera({center: {latitude:coords.latitude,longitude:coords.longitude},pitch: 45, heading: 20,altitude: 200, zoom: 15},{duration:1000})
      }
    })()
    
  },[])
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let loc = await Location.getCurrentPositionAsync({});
      setLocation(loc);
    })();
  }, []);

  const initialCamera = {
    center: {
      latitude: 10.0618591,
      longitude: 76.2971976,
    },
    pitch: 45,
    heading: 0,
    altitude: 0,
    zoom: 10,
    type: "standard",
  };

  return (
    <NativeBaseProvider>
      <Container h="100%" w="100%" maxWidth="100%" bg="coolGray.50">
        <MapView
          ref={map}
          followUserLocation={true}
          zoomEnabled={true}
          initialCamera={initialCamera}
          showsUserLocation={true}
          style={{ width: "100%", height: "100%" }}
          provider={MapView.PROVIDER_GOOGLE}

          // onLayout={() => {
          //   map.current.animateCamera({
          //      center: {
          //      latitude: location.coords.latitude,
          //      longitude: location.coords.longitude,
          //   },
          //      heading: 0,
          //      pitch: 90,
          //    });
          // }}
        />
      </Container>
    </NativeBaseProvider>
  );
};

export default MapScreen;
