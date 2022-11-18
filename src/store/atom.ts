import { atom } from "recoil";
import { SignUpType } from "../../interface/types";

export const likedBeerState = atom({
  key: "likedBeerState",
  default: null,
});

export const userInfoState = atom<SignUpType | null>({
  key: "userInfoState",
  default: null,
});
