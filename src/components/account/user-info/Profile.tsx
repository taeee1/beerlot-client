import {useUserInfoQuery} from "@/../hooks/query/useUserQuery";
import {VStack} from "@chakra-ui/react";
import Cookies from "js-cookie";
import EditProfileButton from "./EditProfileButton";
import InfoContainer from "./InfoContainer";
import MessageContainer from "./MessageContainer";

const Profile = () => {
  const accessToken = Cookies.get("beerlot-oauth-auth-request");
  const userQuery = useUserInfoQuery(accessToken ?? "");
  const {image_url, username, status_message} = userQuery?.data ?? {};

  return (
    <VStack pt={0} px="20px" pb="10px">
      {image_url && <InfoContainer imageSrc={image_url} />}
      {username && status_message && (
        <MessageContainer nickName={username} bio={status_message} />
      )}
      {userQuery.data && <EditProfileButton />}
    </VStack>
  );
};

export default Profile;
