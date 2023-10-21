import {
  fetchBeersApi,
  fetchRecommendedBeers,
  fetchSingleBeerInfoApi,
  fetchTopBeersApi,
} from "api/beers/api";
import { UseQueryOptions, useQuery } from "react-query";
import { BeerFilterRequestType, FailureResponse } from "types/api";
import { LANGUAGE_TYPE } from "../../interface/types";
import {
  RecommendedBeersResponse,
  SingelBeerFetchResponseType,
} from "../../typedef/server/beer";

export const topBeersQueryKey = () => ["topBeers"];

export const useTopBeersQuery = (
  options?: UseQueryOptions<any, FailureResponse> //TODO: fix any type
) => {
  return useQuery({
    queryKey: topBeersQueryKey(),
    queryFn: fetchTopBeersApi,
    enabled: false,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    ...options,
  });
};

export const beersQueryKey = () => ["beers"];

export const useBeersQuery = (
  queryParam: BeerFilterRequestType,
  options?: UseQueryOptions<any, FailureResponse> //TODO: fix any type
) => {
  return useQuery({
    queryKey: beersQueryKey(),
    queryFn: () => fetchBeersApi(queryParam),
    enabled: false,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    ...options,
  });
};

export const recommendedBeersKey = () => ["recommendedBeers"];

export const useRecommendedBeersQuery = (
  accessToken: string,
  options?: UseQueryOptions<RecommendedBeersResponse, FailureResponse>
) => {
  return useQuery({
    queryKey: recommendedBeersKey(),
    queryFn: () => fetchRecommendedBeers(accessToken),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    enabled: !!accessToken,
    ...options,
  });
};

export const singleBeerFetchKey = (beerId: number) => [
  "singleBeerFetchKey",
  beerId,
];

export const useSingleBeerFetchQuery = (
  beerId: number,
  language?: LANGUAGE_TYPE,
  options?: UseQueryOptions<SingelBeerFetchResponseType, FailureResponse>
) => {
  return useQuery({
    queryKey: singleBeerFetchKey(beerId),
    queryFn: () =>
      fetchSingleBeerInfoApi({
        id: beerId,
        language: language || LANGUAGE_TYPE.KR,
      }),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    enabled: !!beerId,
    ...options,
  });
};
