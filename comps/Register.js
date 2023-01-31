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

const Register = () => {
  const [signupdata, setsignupdata] = useState("");
  const [show, setShow] = useState(false);

  const handleClick = async (signupdata) => {
    try {
      const url = "http://192.168.1.6:3000/users/signup";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signupdata),
      })
        
      if (!response.ok) {
          const err = await response.json();
          console.log('Looks like there was a problem.',
              err);
          return;
      } else {
          const data = await response.json();
      
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <NativeBaseProvider>
      <Container h="100%" w="100%" maxWidth="100%" bg="coolGray.50">
     
          <Heading mt="40" alignSelf="center" size="lg" color="violet.700">
            Mapstix
          </Heading>
          <Input
            mt="50"
            placeholder="Email"
            variant="underlined"
            borderColor="violet.700"
            alignSelf="center"
            focusOutlineColor="violet.700"
            w="64"
            // style={{ color: "#fff" }}
            onChangeText={(text) => setsignupdata({ email: text })}
          ></Input>
          <Input
            mt="50"
            placeholder="Username"
            variant="underlined"
            borderColor="violet.700"
            w="64"
            alignSelf="center"
            // style={{ color: "#fff" }}
            focusOutlineColor="violet.700"
            onChangeText={(text) =>
              setsignupdata({ ...signupdata, username: text })
            }
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
            onChangeText={(text) =>
              setsignupdata({ ...signupdata, password: text })
            }
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
          <Input
            mt="50"
            // secureTextEntry={true}
            placeholder="Confirm password"
            variant="underlined"
            borderColor="violet.700"
            w="64"
            alignSelf="center"
            // style={{ color: "#fff" }}
            focusOutlineColor="violet.700"
            onChangeText={(text) =>
              setsignupdata({ ...signupdata, cPassword: text })
            }
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
            onPress={() => handleClick(signupdata)}
          >
            <Text style={{ color: "#fff" }}>Sign Up</Text>
          </Button>
    
      </Container>
    </NativeBaseProvider>
  );
};

export default Register;
