import {POLICY_LABEL} from "@/../interface/server/types/Auth";
import {
  createReviewApi,
  dislikeReviewApi,
  fetchAllReviewsApi,
  likeReviewApi,
} from "@/api/review/api";
import {UseMutationOptions, UseQueryOptions, useQuery} from "react-query";
import {FailureResponse} from "types/api";
import {BeerSortEnum, ReviewSortEnum} from "../../interface/types";
import {useMutation} from "react-query";

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
export const createReviewMutationKey = () => ["createReview"];

export const useCreateReviewMutation = (
  accessToken: string,
  options?: UseMutationOptions<any, FailureResponse, CreateReviewRequestType>
) => {
  return useMutation({
    mutationKey: createReviewMutationKey(),
    mutationFn: (data: CreateReviewRequestType) =>
      createReviewApi(data, accessToken),
    ...options,
  });
};
export const reviewLikeKey = () => ["reviewLike"];
export const reviewDislikeKey = () => ["reviewDisike"];

export const useReviewLikeMutation = (
  reviewId: number,
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
  reviewId: number,
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
export interface CreateReviewRequestType {
  content: string;
  rate: number;
  image_url: string;
  buy_from: string;
}
