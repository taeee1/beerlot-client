import {POLICY_LABEL} from "@/../interface/server/types/Auth";
import {
  createReviewApi,
  deleteReviewApi,
  dislikeReviewApi,
  fetchAllReviewsApi,
  fetchBeerReviewsApi,
  getSingleReviewApi,
  likeReviewApi,
  updateReviewApi,
} from "@/api/review/api";
import {
  UseMutationOptions,
  UseMutationResult,
  UseQueryOptions,
  useQuery,
} from "react-query";
import {FailureResponse} from "types/api";
import {
  BeerSortEnum,
  ReviewInfoType,
  ReviewPostparamType,
  ReviewSortEnum,
  UpdatedReviewInfo,
} from "../../interface/types";
import {useMutation} from "react-query";
import {BeerReviewsQueryParams} from "@/../typedef/server/beer";

export const allReviewsQueryKey = () => ["allReviews"];
export const ReviewQueryKey = () => ["review"];
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
export const deleteReviewMutationKey = () => ["deleteReview"];
export const updateReviewMutationKey = () => ["updateReview"];

export const useCreateReviewMutation = (
  beerId: number,
  accessToken: string,
  options?: UseMutationOptions<any, FailureResponse, CreateReviewRequestType>
) => {
  return useMutation({
    mutationKey: createReviewMutationKey(),
    mutationFn: (data: CreateReviewRequestType) =>
      createReviewApi(beerId, data, accessToken),
    ...options,
  });
};

type DeleteReviewOptions = UseMutationOptions<any, FailureResponse, number>;

export const useDeleteReviewMutation = (
  accessToken: string,
  options?: DeleteReviewOptions
): UseMutationResult<any, FailureResponse, number> => {
  return useMutation<number, FailureResponse, number>(
    (reviewId: number) => deleteReviewApi(reviewId, accessToken),
    options
  );
};

export const reviewLikeKey = () => ["reviewLike"];
export const reviewDislikeKey = () => ["reviewDisike"];

export const useReviewLikeMutation = (
  reviewId: number,
  accessToken: string,
  options?: UseMutationOptions<any, FailureResponse>
) => {
  return useMutation({
    mutationFn: () => likeReviewApi(reviewId, accessToken),
    ...options,
  });
};

export const useReviewDislikeMutation = (
  reviewId: number,
  accessToken: string,
  options?: UseMutationOptions<any, FailureResponse>
) => {
  return useMutation({
    mutationFn: () => dislikeReviewApi(reviewId, accessToken),
    ...options,
  });
};
export const useReviewQuery = (
  reviewId: number | null,
  options?: UseQueryOptions<SingleReviewRes, FailureResponse>
) => {
  return useQuery({
    queryKey: ReviewQueryKey(),
    queryFn: () => getSingleReviewApi(reviewId),
    enabled: reviewId !== null,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    ...options,
  });
};

export const useReviewUpdateMutation = (
  reviewId: number,
  accessToken: string,
  content: UpdatedReviewInfo,
  options?: UseMutationOptions<any, FailureResponse>
) => {
  return useMutation({
    mutationKey: updateReviewMutationKey(),
    mutationFn: () => updateReviewApi(reviewId, accessToken, content),
    ...options,
  });
};

export type SingleReviewRes = {
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
    status_message: string;
    username_updated_at: string;
  };
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
export interface UserEditRequest {
  username?: string;
  status_message?: string;
  image_url?: string;
  agreed_policies?: POLICY_LABEL[];
}

export type UserUpdateRequestType = Pick<
  UserEditRequest,
  "status_message" | "image_url" | "username"
>;

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
  content?: string;
  rate: number;
  image_url?: string;
  buy_from?: string;
}

export const beerReviewsQueryKey = (beerId: number) => ["beerReviews", beerId];

export const useBeerReviewsQuery = (
  queryParams: BeerReviewsQueryParams,
  options?: UseQueryOptions<any, FailureResponse>
) => {
  return useQuery({
    queryKey: beerReviewsQueryKey(queryParams.beerId),
    queryFn: () => fetchBeerReviewsApi(queryParams),
    enabled: false,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    ...options,
  });
};
