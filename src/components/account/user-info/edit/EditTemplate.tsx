import {useUserInfoQuery} from "@/../hooks/query/useUserQuery";
import Cookies from "js-cookie";
import {useEffect} from "react";
import {ProfileEditContent} from "./ProfileEditContent";
const EditTemplate = () => {
  const accessToken = Cookies.get("beerlot-oauth-auth-request") ?? "";
  const userQuery = useUserInfoQuery(accessToken ?? "");
  const {
    image_url,
    username,
    status_message: statusMessage,
  } = userQuery?.data ?? {};

  useEffect(() => {
    userQuery.refetch();
  }, []);

  useEffect(() => {
    console.log("image_url", image_url);
    console.log("statusMessage", statusMessage);
    console.log("username", username);
  }, [image_url, statusMessage, username]);

  return (
    <>
      {image_url && statusMessage && username && (
        <ProfileEditContent
          imageUrl={image_url}
          statusMessage={statusMessage}
          username={username}
        />
      )}
    </>
  );
};

export default EditTemplate;
