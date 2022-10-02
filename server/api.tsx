import axios from "axios";
import { BeerResultType } from "../types";

export const getAllBeers = async (index: number) => {
  const result: BeerResultType = await axios
    .get(`/api/v1/beers/${index}`)
    .then((res) => {
      return res.data;
    });
  return result;
};
