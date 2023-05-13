import {BeerFilterRequestType, FailureResponse} from "types/api";
import {fetchBeersApi, fetchTopBeersApi} from "api/beers/api";
import {UseQueryOptions, useQuery} from "react-query";

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
