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

const Home = () => {

  return (
    <NativeBaseProvider>
      {/* <Box backgroundColor="violet.800"> */}

      <Container h="100%" w="100%" maxWidth="100%" bg="coolGray.50">
        {/* <Center mt="72" ml="48" pl="5"> */}
        <Heading mt="20" size="lg" color="violet.700">
          Mapstix Home
        </Heading>
        <MapView
         
          followUserLocation={true}         
          zoomEnabled={true}
          showsUserLocation={true}         
          style={StyleSheet.absoluteFillObject}
          provider={MapView.PROVIDER_GOOGLE}
          // initialRegion={{
          //   latitude: 28.579660,
          //   longitude: 77.321110,
          //   latitudeDelta: 0.0922,
          //   longitudeDelta: 0.0421,
          // }}
        />
         
        {/* </MapView> */}
        {/* </Center> */}
      </Container>
    </NativeBaseProvider>
  );
};

export default Home;
