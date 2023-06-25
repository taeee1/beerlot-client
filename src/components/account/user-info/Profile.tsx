import {useUserInfoQuery} from "@/../hooks/query/useUserQuery";
import {VStack} from "@chakra-ui/react";
import Cookies from "js-cookie";
import EditProfileButton from "./EditProfileButton";
import InfoContainer from "./InfoContainer";
import MessageContainer from "./MessageContainer";
import {useEffect} from "react";
import {useQueries} from "react-query";

const Profile = () => {
  const accessToken = Cookies.get("beerlot-oauth-auth-request");
  const userQuery = useUserInfoQuery(accessToken ?? "");
  const {image_url, username, status_message} = userQuery?.data ?? {};
  useEffect(() => {
    userQuery.refetch();
  }, []);

  return (
    <VStack pt={0} px="20px" pb="10px">
      <InfoContainer imageSrc={image_url} />
      <MessageContainer nickName={username} bio={status_message} />
      <EditProfileButton />
    </VStack>
  );
};

export default Profile;
