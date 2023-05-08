import {fetchAllBeersApi} from "@/api/review/api";
import {UseQueryOptions, useQuery} from "react-query";
import {FailureResponse} from "types/api";
import {ReviewSortEnum} from "../interface/types";

export const allReviewsQueryKey = () => ["allReviews"];
export const useAllReviewsQuery = (
  queryParam: AllReviewsQueryParams,
  options?: UseQueryOptions<any, FailureResponse> //TODO: fix any type
) => {
  return useQuery({
    queryKey: allReviewsQueryKey(),
    queryFn: () => fetchAllBeersApi(queryParam),
    enabled: false,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    ...options,
  });
};

export type AllReviewsQueryParams = {
  // beerId: number;
  page?: number;
  size?: number;
  sort?: ReviewSortEnum;
};
