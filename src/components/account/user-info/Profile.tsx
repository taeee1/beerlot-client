import {VStack} from "@chakra-ui/react";
import React from "react";
import {useRecoilState} from "recoil";
import {userInfoState} from "../../../store/atom";
import EditProfileButton from "./EditProfileButton";
import InfoContainer from "./InfoContainer";
import MessageContainer from "./MessageContainer";

const Profile = () => {
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);

  // TODO: error handling should be added

  return (
    <VStack pt={0} px="20px" pb="10px">
      {userInfo?.image_url && <InfoContainer imageSrc={userInfo.image_url} />}
      {userInfo?.username && userInfo.statusMessage && (
        <MessageContainer
          nickName={userInfo.username}
          bio={userInfo.statusMessage}
        />
      )}
      {userInfo && <EditProfileButton />}
    </VStack>
  );
};

export default Profile;
