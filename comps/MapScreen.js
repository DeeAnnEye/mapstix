import React, { useState, useEffect, useRef } from "react";
import {
  NativeBaseProvider,
  Input,
  Text,
  Container,
  Heading,
  Center,
  Image,
  Avatar,
  Button,
  View,
  Pressable,
  Icon,
} from "native-base";
import { Svg } from "react-native-svg";
import { StyleSheet } from "react-native";
import MapView, { Marker, AnimatedRegion } from "react-native-maps";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Location from "expo-location";
import { io } from "socket.io-client";
import { API_URL } from "./AppConfig";

const MapScreen = () => {
  const map = useRef();
  const [location, setLocation] = useState(null);
  const [marker, setMarker] = useState(null);
  const [friendloc, setFriendLoc] = useState([])


  useEffect(() => {
    (async () => {
      if (map.current) {
        let { coords } = await Location.getCurrentPositionAsync({});
        // console.log(loc)
        map.current.animateCamera(
          {
            center: { latitude: coords.latitude, longitude: coords.longitude },
            pitch: 45,
            heading: 20,
            altitude: 200,
            zoom: 15,
          },
          { duration: 1000 }
        );
      }
    })();
  }, []);
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

  useEffect(() => {
    (async () => {
      const socket = io(API_URL + "/groupSpace", {
        reconnection: true,
        transports: ["websocket", "pooling"],
        allowUpgrades: false,
        pingTimeout: 30000,
      });

      await socket.on("connect", () => {
        console.log("Connected to socket server");
      });

      let locations = await Location.watchPositionAsync({
        accuracy: Location.Accuracy.High,
        distanceInterval: 2,
        timeInterval: 8000 
      }, 
      async(loc) => { 
        const userPhone = await AsyncStorage.getItem("userPhone");
        const userName = await AsyncStorage.getItem("userName");

        socket.emit('location', {
          userLoc: loc,
          userPhone: userPhone,
          userName: userName
        }); });

        await socket.on("userLocations", (locations) => {
          let temp = {...friendloc}
          temp[locations.userPhone] = {...locations}
          console.log(temp)
          setFriendLoc(temp)
        });

      await socket.on("disconnect", async () => {
        console.log("disconnected from socket server");
      });
    })();
  });

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
          onPress={(e) => setMarker({ latlng: e.nativeEvent.coordinate })}
          style={{ width: "100%", height: "100%" }}
          provider={MapView.PROVIDER_GOOGLE}
        >
          {
            // if state contains marker variable with a valid value, render the marker
            marker && (
              <Marker
                coordinate={{
                  latitude: marker.latlng.latitude,
                  longitude: marker.latlng.longitude,
                }}
                
              >
               
                <View
                  backgroundColor="violet.700"
                  borderRadius="2xl"
                  // pl="1"
                  style={{
                    flexDirection: "row",
                    width: 90,
                    height: 30,
                  }}
                >
                  <Svg width={40} height={30}>
                    <Avatar
                      size="29px"
                      source={{
                        uri: "http://192.168.1.6:3000/public/images/24af9536fc053ef0e67784794944df90",
                      }}
                    />
                  </Svg>

                  <Text
                    style={{
                      marginLeft: 2,
                      fontSize: 9,
                      color: "#ffffff",
                      fontWeight: "bold",
                      textDecorationLine: "underline",
                    }}
                  >
                    hi
                  </Text>
                </View>
              </Marker>
            )
          }
        </MapView>
      </Container>
    </NativeBaseProvider>
  );
};

export default MapScreen;
