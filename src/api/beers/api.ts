import { BeerFilterRequestType } from "@/types/api";
import axios from "axios";
import { GoogleAuth, OAuth2Client } from "google-auth-library";
import { LANGUAGE_TYPE } from "../../../interface/types";
import { SingelBeerFetchResponseType } from "../../../typedef/server/beer";
import { BeerSortType } from "../../../types/common";

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

const url = "https://beerlot-core-api-lopbi5pmwq-du.a.run.app/";
const targetAudience = "https://beerlot-core-api-lopbi5pmwq-du.a.run.app/";

const googleAuth: GoogleAuth = new GoogleAuth();
let client: OAuth2Client | null = null;

export const fetchTopBeersApi = async (): Promise<any> => {
  const language: LANGUAGE_TYPE = LANGUAGE_TYPE.KR;

  try {
    client = client || (await googleAuth.getIdTokenClient(targetAudience));

    const res = await client.request({
      url: `${url}api/v1/beers/top`,
      params: {
        language,
      },
    });

    console.info(res.data);
    return res.data;
  } catch (err) {
    console.error(err);
    return Promise.reject(err);
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
