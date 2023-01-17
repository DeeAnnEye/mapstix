import React from 'react';
import {
    NativeBaseProvider,
    Input,
    Text,
    Container,
    Heading,
    Center,
    Button,
  } from "native-base";

const Welcome = ({navigation}) => {
    return (
        <NativeBaseProvider>
          <Center>
            <Container mt="32">
            <Button
               mt="20"
               colorScheme="indigo"
               onPress={()=>
               navigation.navigate('Register')}>
                Sign Up
              </Button>
              <Button
               mt="20"
               colorScheme="indigo"
               onPress={()=>
               navigation.navigate('Login')}>
                Login
              </Button>
            </Container>
          </Center>
        </NativeBaseProvider>
      );
}

export default Welcome