import {FailureResponse} from "types/api";
import {fetchTopBeersApi} from "api/beers/api";
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
