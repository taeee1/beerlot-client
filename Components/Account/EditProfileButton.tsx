import { Button, Text } from "@chakra-ui/react";
import React from "react";

const EditProfileButton = () => {
  return (
    <Button
      w="100%"
      p="4px"
      bg="Orange.200"
      borderRadius="5px"
      textColor="White.100"
    >
      <Text textStyle="h3">프로필 편집</Text>
    </Button>
  );
};

export default EditProfileButton;
