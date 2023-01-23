import React from 'react';
import {
    NativeBaseProvider,
    Input,
    Text,
    Container,
    Heading,
    Center,
    Button,
    Box,
  } from "native-base";

const Welcome = ({navigation}) => {
    return (
        <NativeBaseProvider >
          {/* <Box backgroundColor="violet.800"> */}
         
            <Container h="100%" w="100%" maxWidth="100%" bg="violet.700">
            <Center mt="72" ml="48" pl="5">
            <Heading size="lg" color="coolGray.50">
            Mapstix
          </Heading>
            <Button
               mt="20"
               colorScheme="violet"
               w="96"
               onPress={()=>
               navigation.navigate('Login')}>
                Login
              </Button>
              <Text  mt="10" ml="56" style={{color: '#fff'}}>Don't have an Account?</Text>
            <Button
               
               colorScheme="muted"
               variant="outline"
               w="96"
               onPress={()=>
               navigation.navigate('Register')}>
                 <Text style={{color: '#fff'}}>Sign Up</Text>
              </Button>              
              </Center>
            </Container>
          
          {/* </Box> */}
        </NativeBaseProvider>
      );
}

export default Welcome