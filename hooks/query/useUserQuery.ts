import { Member, MemberReviewsRequest } from "@/../types/member/request";
import {
  AllBeersQueryParamsV2,
  MemberTypeRequestUpdateV2,
} from "@/api/review/typedef";
import {
  fetchUserLikedReviews,
  getUserLikedBeersApi,
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

export const getUserInfoQueryKey = () => ["getUserInfo"];
export const putUserInfoQueryKey = () => ["putUserInfo"];
export const userReviewsQueryKey = () => ["userReviews"];
export const userBeersQueryKey = () => ["userBeers"];
export const userLikedReviewsQueryKey = () => ["userLikedReviews"];

export const useUserInfoQuery = (
  accessToken: string,
  options?: UseQueryOptions<Member, FailureResponse>
) => {
  return useQuery({
    queryKey: getUserInfoQueryKey(),
    queryFn: () => getUsersInfoApi(accessToken),
    enabled: !!accessToken,
    ...options,
  });
};

export const useEditUserInfoMutation = (
  accessToken: string,
  options?: MutationOptions<Member, FailureResponse, MemberTypeRequestUpdateV2>
) => {
  return useMutation({
    mutationFn: (updatedInfo: MemberTypeRequestUpdateV2) =>
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
    ...options,
  });
};

export const useUserLikedBeersQuery = (
  accessToken: string,
  queryParam?: AllBeersQueryParamsV2,
  options?: UseQueryOptions<any, FailureResponse>
) => {
  return useQuery({
    queryKey: userBeersQueryKey(),
    queryFn: () => getUserLikedBeersApi(accessToken, queryParam),
    enabled: !!accessToken,
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
    queryKey: userLikedReviewsQueryKey(),
    queryFn: () => fetchUserLikedReviews(accessToken),
    enabled: !!accessToken,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    ...options,
  });
};
