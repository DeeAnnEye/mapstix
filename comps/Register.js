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

const Register = ({ navigation }) => {
  const [signupdata, setsignupdata] = useState("");
  const [show, setShow] = useState(false);
  const [nextForm, setNextForm] = useState(false);
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

  const handleClick = async (signupdata) => {
    try {
      const url = API_URL+"/users/signup";
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
        navigation.reset({
          index: 0,
          routes: [{ name: "App" }],
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <NativeBaseProvider>
      <Container h="100%" w="100%" maxWidth="100%" bg="coolGray.50">
        <Heading
          mt="32"
          mb="16"
          alignSelf="center"
          size="lg"
          color="violet.700"
        >
          Mapstix
        </Heading>
        <SafeAreaView alignSelf="center">
          {nextForm ? (
            <>
              <Input
                placeholder="Email"
                variant="underlined"
                borderColor="violet.700"
                alignSelf="center"
                focusOutlineColor="violet.700"
                w="64"
                // style={{ color: "#fff" }}
                onChangeText={(text) =>
                  setsignupdata({ ...signupdata, email: text })
                }
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
                <Text style={{ color: "#fff" }}>
                  Next <ArrowForwardIcon />
                </Text>
              </Button>
            </>
          ) : (
            <>
              <HStack>
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
                    setsignupdata({ phone: "+"+callingCode + " " +text })
                  }
                ></Input>
              </HStack>
              <Button
                mt="20"
                w="48"
                alignSelf="center"
                colorScheme="violet"
                onPress={() => setNextForm(true)}
              >
                <Text style={{ color: "#fff" }}>
                  Next <ArrowForwardIcon />
                </Text>
              </Button>
            </>
          )}
        </SafeAreaView>
      </Container>
    </NativeBaseProvider>
  );
};

export default Register;
