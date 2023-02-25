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
import {TouchableOpacity} from 'react-native';
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Group from "./Group";

const GroupScreen = () => {
  const [placement, setPlacement] = useState(undefined);
  const [image, setImage] = useState(null);
  const [open, setOpen] = useState(false);
  const [showGroup, setShowGroup] = useState(false);
  const [groups, setGroups] = useState([]);
  const [groupname, setGroupname] = useState("");
  const [groupId,setGroupId] = useState(0);

  useEffect(() => {
    getGroups();
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

  const openGroup=(id)=>{
  setGroupId(id)
   setShowGroup(true);
  }

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
        getGroups();
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <NativeBaseProvider>

    {!showGroup?(
      <>
      {/* Group Create Modal */}
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

      {/* GroupList */}
      <Box mt="2" mx="1" >
        <FlatList
          data={groups}
          // onRefresh={() => onRefresh()}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={()=>openGroup(item.group_id)}>
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
            </TouchableOpacity>
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
      </>
      ):<Group id={groupId} setShowGroup={setShowGroup}/>}
    </NativeBaseProvider>
  );
};

export default GroupScreen;
