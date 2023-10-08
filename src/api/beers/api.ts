import { BeerFilterRequestType } from "@/types/api";
import axios from "axios";
import { CategoryType, LANGUAGE_TYPE } from "../../../interface/types";
import { BeerSortType } from "../../../types/common";
import { SingelBeerFetchResponseType } from "../../../typedef/server/beer";

export const getNewAccessTokenWithRefreshToken = async () => {
  try {
    const result = await axios.get(`/api/v1/auth/refresh`);
    console.log(result);
  } catch (error) {
    console.error(error);
  }
};

export const fetchBeersApi = async (params: BeerFilterRequestType) => {
  const language: LANGUAGE_TYPE = LANGUAGE_TYPE.KR;
  const res = await axios.get("/api/v1/beers", {
    params: {
      language: language,
      page: params.page || 1,
      size: params.size || 10,
      sort: params.sort || BeerSortType.MOST_LIKES,
      keyword: params.keyword || undefined,
      categories: Array.isArray(params.categories)
        ? params.categories.length > 0
          ? String(params.categories.join(","))
          : undefined
        : undefined,
      countries: params.countries || undefined,
      volume_min:
        params.volume_min !== undefined ? params.volume_min : undefined,
      volume_max: params.volume_max || undefined,
    },
  });
  return res.data;
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
    const { data }: { data: SingleBeerResultType } = await axios.get(
      `/api/v1/beers/${id}?language=${language}`
    );
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const fetchSingleBeerInfoApi = async ({
  id,
  language = LANGUAGE_TYPE.KR,
}: {
  id: number;
  language?: LANGUAGE_TYPE;
}) => {
  const res = await axios.get<SingelBeerFetchResponseType>(
    `/api/v1/beers/${id}?language=${language}`
  );
  return res.data;
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

export const likeBeerApi = async (beerId: number, accessToken: string) => {
  const config = {
    headers: { Authorization: `Bearer ${accessToken}` },
  };
  const res = await axios.post(`/api/v1/beers/${beerId}/likes`, null, config);
  return res.data;
};

export const dislikeBeerApi = async (beerId: number, accessToken: string) => {
  const config = {
    headers: { Authorization: `Bearer ${accessToken}` },
  };
  const res = await axios.delete(`/api/v1/beers/${beerId}/likes`, config);
  return res.data;
};

export const fetchRecommendedBeers = async (accessToken: string) => {
  const config = {
    headers: { Authorization: `Bearer ${accessToken}` },
  };
  const res = await axios.get(`/api/v1/beers/recommend`, config);
  return res.data;
};
