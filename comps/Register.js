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

const Register = ({navigation}) => {
  const [data,setData] = useState("");
  const [show, setShow] = useState(false);

  const handleClick = async(data) => {
    // console.log(data)
       try {
            const url = 'http://192.168.1.6:3000/users/signup';
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })

            if (!response.ok) {
                const err = await response.json();
                console.log('Looks like there was a problem.',
                    err);
                // console.log(err.msg);
                // setLoginMsg(err.msg);
                return;
            } else {
                const data = await response.json();
                // localStorage.setItem('user', JSON.stringify({ token: data.token }));
                // localStorage.setItem('username', data.name );
                // localStorage.setItem('role', data.role );
                // // setIsLoggedIn(true);
            }
        } catch (err) {
            console.log(err)

        }
  };
  
  return (
    <NativeBaseProvider>      
        <Container h="100%" w="100%" maxWidth="100%" bg="violet.700">
        <Center mt="56" ml="48">
          <Heading size="lg" color="coolGray.50">
            Mapstix
          </Heading>
          <Input
            mt="50"
            placeholder="Email"
            variant="underlined"
            borderColor="coolGray.50"
            focusOutlineColor="coolGray.50"
            w="96"
            style={{ color: "#fff" }}
            onChangeText={(text) => setData({"email":text})}
          ></Input>
           <Input
            mt="50"
            placeholder="Username"
            variant="underlined"
            borderColor="coolGray.50"
            w="96"
            style={{ color: "#fff" }}
            focusOutlineColor="coolGray.50"
            onChangeText={(text) => setData({...data,"username":text})}
          ></Input>
          <Input
            mt="50"
            // secureTextEntry={true}
            placeholder="Enter password"
            variant="underlined"
            borderColor="coolGray.50"
            w="96"
            style={{ color: "#fff" }}
            focusOutlineColor="coolGray.50"
            onChangeText={(text) => setData({...data,"password":text})}
            type={show ? "text" : "password"}
            InputRightElement={<Pressable onPress={() => setShow(!show)}>
            <Icon as={<MaterialIcons name={show ? "visibility" : "visibility-off"} />} size={5} mr="2" color="muted.400" />
          </Pressable>}
          ></Input>
           <Input
            mt="50"
            // secureTextEntry={true}
            placeholder="Confirm password"
            variant="underlined"
            borderColor="coolGray.50"
            w="96"
            style={{ color: "#fff" }}
            focusOutlineColor="coolGray.50"
            onChangeText={(text) => setData({...data,"cPassword":text})}
            type={show ? "text" : "password"}
            InputRightElement={<Pressable onPress={() => setShow(!show)}>
            <Icon as={<MaterialIcons name={show ? "visibility" : "visibility-off"} />} size={5} mr="2" color="muted.400" />
          </Pressable>}
          ></Input>
          <Button mt="20" w="56" colorScheme="violet" onPress={() => handleClick(data)}>
          <Text style={{color: '#fff'}}>Sign Up</Text>
          </Button>
          </Center>
        </Container>
      
    </NativeBaseProvider>
  )
}

export default Register