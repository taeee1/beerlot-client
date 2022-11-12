import axios from "axios";
import { selector } from "recoil";
import { BeerResultType } from "../../../../interface/types";

export const popularBeerState = selector<BeerResultType>({
  key: "popularBeerStateReadOnly",
  get: async () => {
    const res = await axios.get(`/api/v1/beers/1`).then((res) => res.data);
    if (res.error) {
      throw res.error;
    }
    return res;
  },
});
