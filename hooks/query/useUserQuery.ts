import { MemberReviewsRequest } from "@/../types/member/request";
import {
  getUserLikedBeersApi,
  getUserLikedReviewsApi,
  getUserReviewsApi,
  getUsersInfoApi,
  updateUserInfoApi,
} from "@/api/user/api";
import {
  MutationOptions,
  UseQueryOptions,
  useMutation,
  useQuery,
} from "react-query";
import { FailureResponse } from "types/api";
import {
  BeersWithLanguage,
  UserEditRequest,
  UserUpdateRequestType,
} from "./useReviewQuery";
import { access } from "fs/promises";

export const getUserInfoQueryKey = () => ["getUserInfo"];
export const putUserInfoQueryKey = () => ["putUserInfo"];
export const userReviewsQueryKey = () => ["userReviews"];
export const userBeersQueryKey = () => ["userBeers"];

export const useUserInfoQuery = (
  accessToken: string,
  options?: UseQueryOptions<any, FailureResponse> //TODO: fix any type
) => {
  return useQuery({
    queryKey: getUserInfoQueryKey(),
    queryFn: () => getUsersInfoApi(accessToken),
    enabled: false,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    ...options,
  });
};

export const useEditUserInfoMutation = (
  accessToken: string,
  options?: MutationOptions<any, FailureResponse, UserUpdateRequestType>
) => {
  return useMutation({
    mutationFn: (updatedInfo: UserUpdateRequestType) =>
      updateUserInfoApi(accessToken, updatedInfo),
    ...options,
  });
};

export const useUserReviewsQuery = (
  accessToken: string,
  queryParam?: MemberReviewsRequest,
  options?: UseQueryOptions<any, FailureResponse>
) => {
  return useQuery({
    queryKey: userReviewsQueryKey(),
    queryFn: () => getUserReviewsApi(accessToken, queryParam),
    enabled: false,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    ...options,
  });
};

export const useUserBeersQuery = (
  accessToken: string,
  queryParam?: BeersWithLanguage,
  options?: UseQueryOptions<any, FailureResponse>
) => {
  return useQuery({
    queryKey: userBeersQueryKey(),
    queryFn: () => getUserLikedBeersApi(accessToken, queryParam),
    enabled: false,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    ...options,
  });
};

export const useUserLikedReviewsQuery = (
  accessToken: string,
  options?: UseQueryOptions<number[], FailureResponse>
) => {
  return useQuery({
    queryKey: ["userLikedReviews", accessToken],
    queryFn: () => getUserLikedReviewsApi(accessToken),
    enabled: !!accessToken,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    ...options,
  });
};
