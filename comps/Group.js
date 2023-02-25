import React, { useState, useEffect } from "react";
import {
  Box,
  Avatar,
  Text,
  Divider,
  Fab,
  AddIcon,
  CloseIcon,
} from "native-base";
import { Entypo } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";

const Group = ({ id, setShowGroup }) => {
  const [group, setGroup] = useState(null);

  useEffect(() => {
    getGroup();
  }, []);

  const getGroup = async () => {
    fetch("http://192.168.1.6:3000/groups/getgroup/" + id)
      .then((response) => response.json())
      .then((data) => setGroup(data.group));
  };

  return (
    <>
      {group ? (
        <>
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
            containerStyle={{left: '50%'}}
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
            icon={<AddIcon />}
          />
        </>
      ) : null}
    </>
  );
};

export default Group;
