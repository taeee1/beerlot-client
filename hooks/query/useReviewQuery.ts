import {POLICY_LABEL} from "@/../interface/server/types/Auth";
import {
  dislikeReviewApi,
  fetchAllReviewsApi,
  likeReviewApi,
} from "@/api/review/api";
import {UseQueryOptions, useQuery} from "react-query";
import {FailureResponse} from "types/api";
import {BeerSortEnum, ReviewSortEnum} from "../../interface/types";

export const allReviewsQueryKey = () => ["allReviews"];
export const useAllReviewsQuery = (
  queryParam: AllReviewsQueryParams,
  options?: UseQueryOptions<any, FailureResponse>
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

export const reviewLikeKey = () => ["reviewLike"];
export const reviewDislikeKey = () => ["reviewDisike"];

export const useReviewLikeMutation = (
  reviewId: string,
  accessToken: string,
  options?: UseQueryOptions<any, FailureResponse>
) => {
  return useQuery({
    queryKey: reviewLikeKey(),
    queryFn: () => likeReviewApi(reviewId, accessToken),
    enabled: false,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    ...options,
  });
};

export const useReviewDislikeMutation = (
  reviewId: string,
  accessToken: string,
  options?: UseQueryOptions<any, FailureResponse>
) => {
  return useQuery({
    queryKey: reviewDislikeKey(),
    queryFn: () => dislikeReviewApi(reviewId, accessToken),
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

export type SignupRequestType = {
  username: string;
  status_message: string;
  image_url: string;
  agreed_policies: POLICY_LABEL[];
};

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
