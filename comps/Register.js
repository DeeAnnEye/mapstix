import {
  NativeBaseProvider,
  Input,
  Text,
  Container,
  Heading,
  Center,
  Button,
  TouchableOpacity,
  Pressable,
  ArrowForwardIcon,
  Icon,
} from "native-base";
import { SafeAreaView, StyleSheet, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useState, useRef } from "react";
import PhoneInput from "react-native-phone-number-input";

const Register = () => {
  const [signupdata, setsignupdata] = useState("");
  const [show, setShow] = useState(false);
  const [value, setValue] = useState("");
  const [formattedValue, setFormattedValue] = useState("");
  const [valid, setValid] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  const storeData = async (value) => {
    try {
      await AsyncStorage.setItem("userId", value.userId);
      await AsyncStorage.setItem("userName", value.userName);
    } catch (e) {
      console.log(e);
    }
  };

  const NextForm = () =>{
    return( 
      <>     
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
    </>
    );
  }

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
      });

      if (!response.ok) {
        const err = await response.json();
        console.log("Looks like there was a problem.", err);
        return;
      } else {
        const data = await response.json();
        storeData(data);
        navigation.navigate("App");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <NativeBaseProvider>
      <Container h="100%" w="100%" maxWidth="100%" bg="coolGray.50">
        <Heading mt="32" mb="16" alignSelf="center" size="lg" color="violet.700">
          Mapstix
        </Heading>
        <SafeAreaView alignSelf="center">
          <PhoneInput
            defaultValue={value}
            defaultCode="IN"
            layout="first"
            onChangeText={(text) => {
              setValue(text);
            }}
            withDarkTheme
            withShadow
            autoFocus
          />
          <Button
            mt="20"
            w="48"
            alignSelf="center"
            colorScheme="violet"
            onPress={() => handleClick(signupdata)}
          >
            <Text style={{ color: "#fff" }}>Next</Text>
            <ArrowForwardIcon alignSelf="right" />
          </Button>
        </SafeAreaView>
      </Container>
    </NativeBaseProvider>
  );
};

export default Register;
