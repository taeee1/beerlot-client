import {atom} from "recoil";
import {BeerResultType, SignUpType} from "../../interface/types";

export const likedBeerState = atom({
  key: "likedBeerState",
  default: null,
});

export const top10BeersState = atom<BeerResultType[] | null>({
  key: "top10BeersState",
  default: null,
});

export const userInfoState = atom<SignUpType | null>({
  key: "userInfoState",
  default: null,
});
