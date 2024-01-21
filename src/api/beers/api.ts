import { BeerFilterRequestType } from "@/types/api";
import axios from "axios";
import { CategoryType, LANGUAGE_TYPE } from "../../../interface/types";
import { BeerSortType } from "../../../types/common";
import { SingelBeerFetchResponseType } from "../../../typedef/server/beer";
const { GoogleAuth } = require("google-auth-library");
const targetAudience = "https://beerlot-client.vercel.app/";

export const getNewAccessTokenWithRefreshToken = async () => {
  const res = await axios.get("/api/v1/auth/refresh");
  return res.data;
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
      countries: Array.isArray(params.countries)
        ? params.countries.length > 0
          ? String(params.countries.join(","))
          : undefined
        : undefined,
      volume_min:
        params.volume_min !== undefined ? params.volume_min : undefined,
      volume_max: params.volume_max || undefined,
    },
  });
  return res.data;
};

export const fetchTopBeersApi = async () => {
  // ID 토큰을 얻습니다.
  const res = await fetch("/api/token");
  console.log("res", res);
  const { idToken } = await res.json();
  console.log("idToken", idToken);
  // 얻어낸 ID 토큰을 사용해 요청을 보냅니다.
  const response = await axios.get(
    "https://beerlot-client.vercel.app/api/v1/beers/top",
    {
      headers: {
        Authorization: `Bearer ${idToken}`,
      },
      params: {
        language: "KR",
      },
    }
  );

  return response.data;
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
