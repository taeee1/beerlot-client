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

  return (
    <>
      {username && (
        <ProfileEditContent
          imageUrl={image_url ?? null}
          statusMessage={statusMessage ?? null}
          username={username}
        />
      )}
    </>
  );
};

export default EditTemplate;
