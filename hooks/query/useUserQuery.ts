import {
  getUserLikedBeersApi,
  getUserReviewsApi,
  getUsersInfoApi,
  putUsersInfoApi,
} from "@/api/auth/api";
import {UseQueryOptions, useQuery} from "react-query";
import {FailureResponse} from "types/api";
import {BeersWithLanguage, ReviewsWithLanguage} from "./useReviewQuery";

export const getUserInfoQueryKey = () => ["getUserInfo"];
export const putUserInfoQueryKey = () => ["putUserInfo"];
export const userReviewsQueryKey = () => ["userReviews"];
export const userBeersQueryKey = () => ["userBeers"];

export const useUserInfoQuery = (
  options?: UseQueryOptions<any, FailureResponse> //TODO: fix any type
) => {
  return useQuery({
    queryKey: getUserInfoQueryKey(),
    queryFn: getUsersInfoApi,
    enabled: false,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    ...options,
  });
};

export const usePutUserInfoQuery = (
  options?: UseQueryOptions<any, FailureResponse> //TODO: fix any type
) => {
  return useQuery({
    queryKey: putUserInfoQueryKey(),
    queryFn: putUsersInfoApi,
    enabled: false,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    ...options,
  });
};

export const useUserReviewsQuery = (
  queryParam: ReviewsWithLanguage,
  options?: UseQueryOptions<any, FailureResponse>
) => {
  return useQuery({
    queryKey: userReviewsQueryKey(),
    queryFn: () => getUserReviewsApi(queryParam),
    enabled: false,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    ...options,
  });
};

export const useUserBeersQuery = (
  queryParam: BeersWithLanguage,
  options?: UseQueryOptions<any, FailureResponse>
) => {
  return useQuery({
    queryKey: userBeersQueryKey(),
    queryFn: () => getUserLikedBeersApi(queryParam),
    enabled: false,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    ...options,
  });
};
