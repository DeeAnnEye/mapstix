import React, { useEffect, useState } from "react";
import {
  Box,
  FlatList,
  Heading,
  Avatar,
  HStack,
  VStack,
  Text,
  Spacer,
  Center,
  Fab,
  AddIcon,
  Modal,
  FormControl,
  Input,
  Button,
  Image,
  NativeBaseProvider,
} from "native-base";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";

const GroupScreen = () => {
  const [placement, setPlacement] = useState(undefined);
  const [image, setImage] = useState(null);
  const [open, setOpen] = useState(false);
  const [groups, setGroups] = useState([]);
  const [groupname, setGroupname] = useState("");
  var images = [];

  useEffect(() => {
    getGroups();
    // createImagearray();
  },[]);

  const getGroups = async() => {
    const userId = await AsyncStorage.getItem("userId");
    fetch("http://192.168.1.6:3000/groups/findgroups/"+userId)
      .then((response) => response.json())
      .then((data) => setGroups(data.groups));
  };

  const openModal = (placement) => {
    setOpen(true);
    setPlacement(placement);
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      // setGroup({ ...group, groupImage: result.assets[0].uri })
    }
  };

  const createGroup = async () => {
    const userId = await AsyncStorage.getItem("userId");
    const formData = new FormData();
    formData.append("groupName", groupname);
    formData.append("admin_id", userId);
    formData.append("groupAvatar", {
      name: new Date() + "_group",
      uri: image,
      type: "image/jpg",
    });
    try {
      const url = "http://192.168.1.6:3000/groups/create";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "content-type": "multipart/form-data",
        },
        body: formData,
      });
      if (!response.ok) {
        const err = await response.json();
        alert("login failed");
        console.log("Looks like there was a problem.", err);
        return;
      } else {
        const msg = await response.json();
        setOpen(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  // const onRefresh = () =>{

  // }
  // const data = [
  //   {
  //     id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
  //     fullName: "useless",
  //     timeStamp: "12:47 PM",
  //     recentText: "Good Day!",
  //     avatarUrl:
  //       "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
  //   },
  //   {
  //     id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
  //     fullName: "stupid",
  //     timeStamp: "11:11 PM",
  //     recentText: "Cheer up, there!",
  //     avatarUrl:
  //       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyEaZqT3fHeNrPGcnjLLX1v_W4mvBlgpwxnA&usqp=CAU",
  //   },
  //   {
  //     id: "58694a0f-3da1-471f-bd96-145571e29d72",
  //     fullName: "braindead",
  //     timeStamp: "6:22 PM",
  //     recentText: "Good Day!",
  //     avatarUrl: "https://miro.medium.com/max/1400/0*0fClPmIScV5pTLoE.jpg",
  //   },
  //   {
  //     id: "68694a0f-3da1-431f-bd56-142371e29d72",
  //     fullName: "psycho",
  //     timeStamp: "8:56 PM",
  //     recentText: "All the best",
  //     avatarUrl:
  //       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSr01zI37DYuR8bMV5exWQBSw28C1v_71CAh8d7GP1mplcmTgQA6Q66Oo--QedAN1B4E1k&usqp=CAU",
  //   },
  //   {
  //     id: "28694a0f-3da1-471f-bd96-142456e29d72",
  //     fullName: "borderline idiot",
  //     timeStamp: "12:47 PM",
  //     recentText: "I will call today.",
  //     avatarUrl:
  //       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBwgu1A5zgPSvfE83nurkuzNEoXs9DMNr8Ww&usqp=CAU",
  //   },
  // ];
  return (
    <NativeBaseProvider>
      <Modal isOpen={open} onClose={() => setOpen(false)} safeAreaTop={true}>
        <Modal.Content maxWidth="350">
          <Modal.CloseButton />
          <Modal.Header>Create Group</Modal.Header>
          <Modal.Body>
            <FormControl>
              <FormControl.Label>Group Name</FormControl.Label>
              <Input onChangeText={(text) => setGroupname(text)} />
            </FormControl>
            <FormControl>
              {image && (
                <Image
                  my="7"
                  source={{ uri: image }}
                  alt="group-img"
                  size={150}
                  alignSelf="center"
                  borderRadius={100}
                />
              )}
              <Button
                colorScheme="violet"
                title="Choose Group Avatar"
                mt="7"
                onPress={pickImage}
              >
                <Text style={{ color: "#fff" }}>Choose Group Avatar</Text>
              </Button>
            </FormControl>
          </Modal.Body>
          <Modal.Footer>
            <Button.Group space={2}>
              <Button
                variant="ghost"
                colorScheme="violet"
                onPress={() => {
                  setOpen(false);
                }}
              >
                Cancel
              </Button>
              <Button onPress={() => createGroup()} colorScheme="violet">
                Create
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
      <Box mt="5">
        <FlatList
          data={groups}
          // onRefresh={() => onRefresh()}
          renderItem={({ item }) => (
            <Box
              borderBottomWidth="1"
              _dark={{
                borderColor: "muted.50",
              }}
              borderColor="muted.300"
              pl={["0", "4"]}
              pr={["0", "5"]}
              py="2"
            >
              <HStack space={[2, 3]} justifyContent="space-between">
                <Avatar
                  size="48px"
                  source={{uri: item.group_avatar}}
                />
                <VStack>
                  <Text
                    _dark={{
                      color: "warmGray.50",
                    }}
                    color="coolGray.800"
                    bold
                  >
                    {item.group_name}
                  </Text>
                  <Text
                    color="coolGray.600"
                    _dark={{
                      color: "warmGray.200",
                    }}
                  >
                    {item.recentText}
                  </Text>
                </VStack>
                <Spacer />
                <Text
                  fontSize="xs"
                  _dark={{
                    color: "warmGray.50",
                  }}
                  color="coolGray.800"
                  alignSelf="flex-start"
                >
                  {item.timeStamp}
                </Text>
              </HStack>
            </Box>
          )}
          keyExtractor={(item) => item.group_id}
        />
      </Box>
      <Fab
        placement="bottom-right"
        colorScheme="violet"
        size="lg"
        onPress={() => openModal("center")}
        icon={<AddIcon />}
      />
    </NativeBaseProvider>
  );
};

export default GroupScreen;
