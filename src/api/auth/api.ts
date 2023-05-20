import {SignupRequestType} from "@/../hooks/query/useReviewQuery";
import axios from "axios";

export const signupApi = async (queryParam: SignupRequestType) => {
  const {username, status_message, image_url, agreed_policies} = queryParam;
  const res = await axios.patch(`/api/v1/auth/signup`, {
    params: {
      username,
      status_message,
      image_url,
      agreed_policies,
    },
  });
  return res.data;
};
