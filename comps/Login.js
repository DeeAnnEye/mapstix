import {
  NativeBaseProvider,
  Input,
  Text,
  Container,
  Heading,
  Center,
  Button,
} from "native-base";
import { useState } from "react";

const Login = ({ navigation }) => {
  const [data,setData] = useState("");


  const handleClick = async(data) => {
    // console.log(data)
       try {
            const url = 'http://192.168.1.6:3000/users/userlogin';
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
    // 192.168.1.6
    <NativeBaseProvider>
      <Center>
        <Container mt="32">
          <Heading size="lg" color="blue.400">
            Mapstix
          </Heading>
          <Input
            mt="50"
            placeholder="Email"
            onChangeText={(text) => setData({"email":text})}
          ></Input>
           <Input
            mt="50"
            placeholder="Username"
            onChangeText={(text) => setData({...data,"username":text})}
          ></Input>
          <Input
            mt="50"
            secureTextEntry={true}
            placeholder="Enter password"
            onChangeText={(text) => setData({...data,"password":text})}
          ></Input>
          <Button mt="20" colorScheme="indigo" onPress={() => handleClick(data)}>
            Login
          </Button>
        </Container>
      </Center>
    </NativeBaseProvider>
  );
};

export default Login;
