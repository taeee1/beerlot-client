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

export const recommendedBeersState = atom<BeerResultType[] | null>({
  key: "recommendedBeersState",
  default: null,
});

export const userInfoState = atom<SignUpType | null>({
  key: "userInfoState",
  default: null,
});

export const chosenBeerIdsState = atom<number[]>({
  key: "chosenBeersState",
  default: [],
});

export const accessTokenState = atom<string | null>({
  key: "accessTokenState",
  default: null,
});
