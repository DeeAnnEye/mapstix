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
         
            <Container h="100%" w="100%" maxWidth="100%" bg="violet.800">
            <Center mt="72" ml="48" pl="5">
            <Button
               mt="20"
               colorScheme="violet"
               w="96"
               onPress={()=>
               navigation.navigate('Login')}>
                Login
              </Button>
            <Button
               mt="10"
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