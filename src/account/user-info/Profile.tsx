import { VStack } from "@chakra-ui/react";
import React from "react";
import EditProfileButton from "./EditProfileButton";
import InfoContainer from "./InfoContainer";
import MessageContainer from "./MessageContainer";

const Profile = () => {
  const MOCK_IMAGE_SRC = "https://picsum.photos/seed/picsum/200/300";
  const MOCK_NiCK_NAME = "누누";
  const MOCK_BIO = "나 돌아갈래~";
  return (
    <VStack pt={0} px="20px" pb="10px">
      <InfoContainer imageSrc={MOCK_IMAGE_SRC} />
      <MessageContainer nickName={MOCK_NiCK_NAME} bio={MOCK_BIO} />
      <EditProfileButton />
    </VStack>
  );
};

export default Profile;
