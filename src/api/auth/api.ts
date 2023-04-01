import axios from "axios";
import {SignUpRequestType} from "../../../interface/server/types/Auth";
import {OAUTH_PROVIDER} from "../../../interface/types";

// const redirectUrl = "https://beerlot-client.vercel.app";
export const redirectUrl = "https://localhost:3000";

export const loginWithSocialLoginApi = async (provider: OAUTH_PROVIDER) => {
  try {
    const result = await axios.get(
      `/api/v1/auth/authorize/${provider}?redirect-url=${redirectUrl}`
    );
    console.log(result);
  } catch (error) {
    console.log(error);
  }
};

export const generateSocialLoginUrl = (provider: OAUTH_PROVIDER) => {
  return `/api/v1/auth/authorize/${provider}?redirect-url=${redirectUrl}`;
};

export const signUpWithSocialLoginApi = async (request: SignUpRequestType) => {
  try {
    const result = await axios.patch(`/api/v1/auth/signup`, request);
    console.log(result);
  } catch (error) {
    console.log(error);
  }
};

export const getMyAccountApi = async () => {
  try {
    const result = await axios.get(`/api/v1/members/me`);
    console.log("result", result);
  } catch (error) {
    console.log("getMyAccountApi", error);
  }
};
