import React from "react";
import {
  NativeBaseProvider,
  Input,
  Text,
  Container,
  Heading,
  Center,
  Button,
  Box,
  Link,
  VStack,
} from "native-base";

const Welcome = ({ navigation }) => {
  return (
    <NativeBaseProvider>
      <Container h="100%" w="100%" maxWidth="100%" bg="coolGray.50">
        <Heading mt="20" size="lg" alignSelf="center" color="violet.700">
          Mapstix
        </Heading>
        <Button
          mt="40"
          colorScheme="violet"
          // variant="outline"
          alignSelf="center"
          w="56"
          onPress={() => navigation.navigate("Login")}
        >
          <Text color="coolGray.50">Login</Text>
        </Button>
        <Text mt="3" alignSelf="center" color="violet.700">
          Don't have an account?{" "}
          <Link
            isExternal
            _text={{
              color: "violet.700",
            }}
            _hover={{
              _text: {
                _light: {
                  color: "violet.500",
                },
                color: "violet.500",
              },
            }}
            onPress={() => navigation.navigate("Register")}
          >
            Sign Up
          </Link>
        </Text>
      </Container>
    </NativeBaseProvider>
  );
};

export default Welcome;
