import { LANGUAGE_TYPE } from "../../../interface/types";
import axios from "axios";

export const fetchCategoriesApi = async (_language?: LANGUAGE_TYPE) => {
  const language = _language ?? LANGUAGE_TYPE.KR;
  const res = await axios.get(`/api/v1/beers/category?language=${language}`);
  return res.data;
};

export const fetchCountriesApi = async (_language?: LANGUAGE_TYPE) => {
  const language = _language ?? LANGUAGE_TYPE.KR;
  const res = await axios.get(`/api/v1/beers/countries?language=${language}`);
  return res.data;
};

export interface Category {
  id: number;
  name: string;
  children: Category[];
}
