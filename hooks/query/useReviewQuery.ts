import {fetchAllReviewsApi} from "@/api/review/api";
import {UseQueryOptions, useQuery} from "react-query";
import {FailureResponse} from "types/api";
import {BeerSortEnum, ReviewSortEnum} from "../../interface/types";

export const allReviewsQueryKey = () => ["allReviews"];
export const useAllReviewsQuery = (
  queryParam: AllReviewsQueryParams,
  options?: UseQueryOptions<any, FailureResponse> //TODO: fix any type
) => {
  return useQuery({
    queryKey: allReviewsQueryKey(),
    queryFn: () => fetchAllReviewsApi(queryParam),
    enabled: false,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    ...options,
  });
};

export type AllReviewsQueryParams = {
  page?: number;
  size?: number;
  sort?: ReviewSortEnum;
};

export type AllBeersQueryParams = {
  page?: number;
  size?: number;
  sort?: BeerSortEnum;
};

export type ReviewsWithLanguage = AllReviewsQueryParams & {language: string};
export type BeersWithLanguage = AllBeersQueryParams & {language: string};

export type AllReviewsQueryResponse = {
  contents: ContentType[];
};

export type ContentType = {
  id: number;
  content: string;
  image_url: string;
  rate: number;
  like_count: number;
  updated_at: string;
  member: {
    id: number;
    username: string;
    image_url: string;
  };
};
