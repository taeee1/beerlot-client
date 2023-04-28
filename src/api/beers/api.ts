import axios from "axios";
import {SignUpRequestType} from "../../../interface/server/types/Auth";
import {
  BeerResultType,
  CategoryType,
  LANGUAGE_TYPE,
  ReviewSortEnum,
} from "../../../interface/types";

export const signUpWithSocialLogin = async (request: SignUpRequestType) => {
  try {
    const result = await axios.patch(`/api/v1/auth/signup`, request);
    console.log(result);
  } catch (error) {
    console.error(error);
  }
};

export const getNewAccessTokenWithRefreshToken = async () => {
  try {
    const result = await axios.get(`/api/v1/auth/refresh`);
    console.log(result);
  } catch (error) {
    console.error(error);
  }
};

export const getAllBeersApi = async (index: number) => {
  try {
    const result: BeerResultType = await axios.get(`/api/v1/beers/${index}`);
    console.log(result, "getAllBeersApi");
    return result;
  } catch (error) {
    console.error(error);
  }
};

export const getBeersWithKeywordApi = async ({
  keyword,
  page = 1,
  size = 10,
  sort = ReviewSortEnum.MostLikes,
}: {
  keyword: string;
  page?: number;
  size?: number;
  sort?: ReviewSortEnum;
}) => {
  try {
    console.log("try statment");
    const language: LANGUAGE_TYPE = LANGUAGE_TYPE.KR;
    const result = await axios.get(
      `/api/v1/beers?keyword=${keyword}&page=${page}&size=${size}&sort=${sort}&language=${language}`
    );
    console.log(result, "getBeersWithKeywordApi");
    return result;
  } catch (error) {
    console.error(error);
  }
};

export const fetchTopBeersApi = async () => {
  const language: LANGUAGE_TYPE = LANGUAGE_TYPE.KR;
  const res = await axios.get("/api/v1/beers/top", {
    params: {
      language: language,
    },
  });
  return res.data;
};

export const getSingleBeerInfoApi = async (id: number) => {
  const language: LANGUAGE_TYPE = LANGUAGE_TYPE.KR;
  try {
    const {data}: {data: SingleBeerResultType} = await axios.get(
      `/api/v1/beers/${id}?language=${language}`
    );
    console.log(data, "getSingleBeerInfoApi");
    return data;
  } catch (error) {
    console.error(error);
  }
};

export interface SingleBeerResultType extends ServerSingleBeerResultType {
  beerId: number;
  beerName: string;
}

export interface ServerSingleBeerResultType {
  brewery: string;
  buy_from: string[];
  description: string;
  like_count: number;
  origin_city: string;
  rate: number;
  review_count: number;
  volume: number;
}

export const getBeerCategoriesApi = async () => {
  try {
    const result: CategoryType[] = await axios.get(`/api/v1/categories`);
    console.log(result, "getBeerCategoriesApi");
    return result;
  } catch (error) {
    console.error(error);
  }
};

export const likeBeerApi = async (beerId: number) => {
  try {
    const result = await axios.post(`/api/v1/beers/${beerId}/likes`);
    console.log(result, "likeBeerApi");
    return result;
  } catch (error) {
    console.error(error);
  }
};

export const dislikeBeerApi = async (beerId: number) => {
  try {
    const result = await axios.delete(`/api/v1/beers/${beerId}/likes`);
    console.log(result, "dislikeBeerApi");
    return result;
  } catch (error) {
    console.error(error);
  }
};
