import axios from "axios";
import { SignupRequestType } from "../../../typedef/review";

export const signupApi = async (
  queryParam: SignupRequestType,
  accessToken: string
) => {
  const { username, status_message, image_url, agreed_policies } = queryParam;
  const res = await axios.patch(
    `/api/v1/auth/signup`,
    {
      username,
      image_url,
      agreed_policies,
    },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  return res.data;
};
