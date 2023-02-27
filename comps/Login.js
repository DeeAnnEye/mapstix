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
  HStack,
} from "native-base";
import { SafeAreaView, StyleSheet, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useState, useRef } from "react";
import { API_URL } from "./AppConfig";
import CountryPicker from "react-native-country-picker-modal";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Login = ({ navigation }) => {
  const [data, setData] = useState("");
  const [show, setShow] = useState(false);
  const [countryCode, setcountryCode] = useState("IN");
  const [callingCode, setcallingCode] = useState("91");

  const storeData = async (value) => {
    try {
      await AsyncStorage.setItem("userId", value.userId);
      await AsyncStorage.setItem("userName", value.userName);
    } catch (e) {
      console.log(e);
    }
  };

  const handleClick = async (data) => {
    try {
      //192.168.43.193:3000
      //192.168.1.6:3000
      const url = API_URL+"/users/login";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        const err = await response.json();
        alert("login failed");
        console.log("Looks like there was a problem.", err);
        return;
      } else {
        const data = await response.json();
        storeData(data);
        navigation.reset({
          index: 0,
          routes: [{ name: "App" }],
        });
        // navigation.navigate('App')
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
        {/* <Input
          mt="36"
          placeholder="Username"
          variant="underlined"
          alignSelf="center"
          borderColor="violet.700"
          w="64"
          // style={{ color: "#fff" }}
          focusOutlineColor="violet.700"
          onChangeText={(text) => setData({ ...data, username: text })}
        ></Input> */}
        <SafeAreaView alignSelf="center">
        <HStack  mt="50">
                <CountryPicker
                  countryCode={countryCode}
                  withFilter
                  withFlag
                  withAlphaFilter={false}
                  withCurrencyButton={false}
                  withCallingCode
                  onSelect={(country) => {
                    const { cca2, callingCode } = country;
                    setcountryCode(cca2);
                    setcallingCode(callingCode[0]);
                  }}
                />
                <Input
                  placeholder="Phone number"
                  variant="underlined"
                  borderColor="violet.700"
                  w="64"
                  keyboardType="numeric"
                  alignSelf="center"
                  // style={{ color: "#fff" }}
                  focusOutlineColor="violet.700"
                  onChangeText={(text) =>
                    setData({ ...data,phone: text })
                  }
                ></Input>
              </HStack>
              
        <Input
          mt="50"
          ml="42"
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
        </SafeAreaView>
      </Container>
    </NativeBaseProvider>
  );
};

export default Login;
