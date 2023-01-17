import React from 'react'
import {
  NativeBaseProvider,
  Input,
  Text,
  Container,
  Heading,
  Center,
  Button,
} from "native-base";

const Register = ({navigation}) => {

  
  return (
    <NativeBaseProvider>
    <Center>
      <Container mt="32">
        <Heading size="lg" color="blue.400">
          Mapstix
        </Heading>
        <Input mt="50" placeholder="Email/Username"></Input>
        <Input
          mt="50"
          secureTextEntry={true}
          placeholder="Enter password"
        ></Input>
        <Button
         mt="20"
         colorScheme="indigo"
         onPress={()=>
         navigation.navigate('Login')}>
          Sign Up
        </Button>
      </Container>
    </Center>
  </NativeBaseProvider>
  )
}

export default Register