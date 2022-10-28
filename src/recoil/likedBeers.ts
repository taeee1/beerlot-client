import { atom, selector } from "recoil";

export const likedBeerState = atom({
  key: "likedBeerState",
  default: null,
});

export const likedBeerQuery = selector({
  key: "likedBeerQuery",
  get: async () => {
    const response = await fetch(`/api/v1/beers/1`).then((res) => res.json());
    return response;
  },
});
