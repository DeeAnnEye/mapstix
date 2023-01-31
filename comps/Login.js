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
import { MaterialIcons } from "@expo/vector-icons";
import { useState } from "react";
import {AsyncStorage} from "react-native";

const Login = () => {
  const [data, setData] = useState("");
  const [show, setShow] = useState(false);

  const handleClick = async (data) => {
    try {
      const url = "http://192.168.1.6:3000/users/login";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
      if (!response.ok) {
        const err = await response.json();
        alert("login failed")
        console.log('Looks like there was a problem.',
            err);
        return;
    } else {
        const data = await response.json();
        AsyncStorage.setItem("userId",data.userId)
        AsyncStorage.setItem("userName",data.userName)
        alert("login successful")
        // setState(true);
    }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <NativeBaseProvider>
      <Container h="100%" w="100%" maxWidth="100%" bg="coolGray.50">
        
          <Heading mt="40" size="lg" alignSelf="center" color="violet.700">
            Mapstix
          </Heading>
          <Input
            mt="36"
            placeholder="Username"
            variant="underlined"
            alignSelf="center"
            borderColor="violet.700"
            w="64"
            // style={{ color: "#fff" }}
            focusOutlineColor="violet.700"
            onChangeText={(text) => setData({ ...data, username: text })}
          ></Input>
          <Input
            mt="50"
            // secureTextEntry={true}
            placeholder="Enter password"
            variant="underlined"
            borderColor="violet.700"
            w="64"
            alignSelf="center"
            // style={{ color: "#fff" }}
            focusOutlineColor="violet.700"
            onChangeText={(text) => setData({ ...data, password: text })}
            type={show ? "text" : "password"}
            InputRightElement={
              <Pressable onPress={() => setShow(!show)}>
                <Icon
                  as={
                    <MaterialIcons
                      name={show ? "visibility" : "visibility-off"}
                    />
                  }
                  size={5}
                  mr="2"
                  color="muted.400"
                />
              </Pressable>
            }
          ></Input>
          <Button
            mt="20"
            w="48"
            alignSelf="center"
            colorScheme="violet"
            onPress={() => handleClick(data)}
          >
            <Text style={{ color: "#fff" }}>Login</Text>
          </Button>
        
      </Container>
    </NativeBaseProvider>
  );
};

export default Login;
