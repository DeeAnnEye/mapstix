import React, { useState, useEffect } from "react";
import {
  Box,
  Avatar,
  Text,
  Divider,
  Fab,
  AddIcon,
  Modal,
  VStack,
  Heading,
  FlatList,
  FormControl,
  Input,
  Center,
  Icon,
  Button,
  CloseIcon,
  ScrollView,
} from "native-base";
import { Entypo } from "@expo/vector-icons";
import { API_URL } from "./AppConfig";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";

const Group = ({ id, setShowGroup }) => {
  const [group, setGroup] = useState(null);
  const [placement, setPlacement] = useState(undefined);
  const [open, setOpen] = useState(false);
  const [users, setUsers] = useState(null);

  useEffect(() => {
    getGroup();
  }, []);

  const getGroup = async () => {
    fetch(API_URL + "/groups/getgroup/" + id)
      .then((response) => response.json())
      .then((data) => setGroup(data.group));
  };

  const findUser = async (phoneNumber) => {
    fetch(API_URL + "/users/findUsers/" + phoneNumber)
      .then((response) => response.json())
      .then((data) => setUsers(data.users));
  };

  const openModal = (placement) => {
    setOpen(true);
    setPlacement(placement);
  };

  return (
    <>
      {group ? (
        <>
          <Modal
            isOpen={open}
            onClose={() => setOpen(false)}
            safeAreaTop={true}
          >
            <Modal.Content maxWidth="350">
              <Modal.CloseButton />
              <Modal.Header>Find Friends</Modal.Header>
              <Modal.Body>
                <FormControl>
                  {/* <FormControl.Label>Group Name</FormControl.Label>
              <Input onChangeText={(text) => setGroupname(text)} /> */}
                  <VStack w="100%" space={5} alignSelf="center">
                    <Input
                      placeholder="Search"
                      variant="filled"
                      width="100%"
                      borderColor="violet.700"
                      borderRadius="10"
                      onChangeText={(text) => findUser(text)}
                      py="1"
                      px="2"
                      InputLeftElement={
                        <Icon
                          ml="2"
                          size="4"
                          color="gray.400"
                          as={<Ionicons name="ios-search" />}
                        />
                      }
                    />
                    {users && (
                      <ScrollView>
                        <TouchableOpacity>
                          <Center py="4" bg="violet.100">
                            {users.username? (
                              <Text>{users.username}</Text>
                            ) : (
                              <Text>No user found</Text>
                            )}
                          </Center>
                        </TouchableOpacity>
                      </ScrollView>
                    )}
                  </VStack>
                </FormControl>
                <FormControl></FormControl>
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
                    Add Friend
                  </Button>
                </Button.Group>
              </Modal.Footer>
            </Modal.Content>
          </Modal>

          <Box
            mx="3"
            mb="3"
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
          >
            <Avatar mt="3" size="48px" source={{ uri: group.group_avatar }} />
            <Text mt="3" color="violet.700" fontSize="2xl">
              {group.group_name}
            </Text>
            <TouchableOpacity onPress={() => setShowGroup(false)}>
              <Text mt="5" mr="2">
                <CloseIcon color="violet.800" size="5" />
              </Text>
            </TouchableOpacity>
            {/* </Link> */}
          </Box>
          <Divider />
          <Fab
            renderInPortal={false}
            shadow={2}
            containerStyle={{ left: "50%" }}
            placement="bottom-left"
            size="sm"
            w="48"
            icon={<Entypo name="location" size={16} color="white" />}
            colorScheme="violet"
            label="set meet location"
          />
          <Fab
            placement="bottom-right"
            colorScheme="violet"
            size="lg"
            onPress={() => openModal("center")}
            icon={<AddIcon />}
          />
        </>
      ) : null}
    </>
  );
};

export default Group;
