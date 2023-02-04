import axios from "axios";
import {SignUpRequestType} from "../../../interface/server/types/Auth";
import {OAUTH_PROVIDER} from "../../../interface/types";

export const loginWithSocialLoginApi = async (provider: OAUTH_PROVIDER) => {
  try {
    const result = await axios.get(
      `/api/v1/auth/authorize/${provider}?redirect-url=https://beerlot-client.vercel.app`
    );
    console.log(result);
  } catch (error) {
    console.log(error);
  }
};

export const signUpWithSocialLoginApi = async (request: SignUpRequestType) => {
  try {
    const result = await axios.patch(`/api/v1/auth/signup`, request);
    console.log(result);
  } catch (error) {
    console.log(error);
  }
};
