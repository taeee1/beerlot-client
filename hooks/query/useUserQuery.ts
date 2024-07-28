import { Member, MemberReviewsRequest } from "@/../types/member/request";
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
import { FailureResponse as FailureResponseV2 } from "types/api";
import {
  AllBeersQueryParamsV2,
  MemberTypeRequestUpdateV2,
} from "../../typedef/review";

export const getUserInfoQueryKey = () => ["getUserInfo"];
export const putUserInfoQueryKey = () => ["putUserInfo"];
export const userReviewsQueryKey = () => ["userReviews"];
export const userBeersQueryKey = () => ["userBeers"];
export const userLikedReviewsQueryKey = () => ["userLikedReviews"];

export const useUserInfoQuery = (
  accessToken: string,
  options?: UseQueryOptions<Member, FailureResponseV2>
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
  options?: MutationOptions<
    Member,
    FailureResponseV2,
    MemberTypeRequestUpdateV2
  >
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
  options?: UseQueryOptions<any, FailureResponseV2>
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
  options?: UseQueryOptions<any, FailureResponseV2>
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
  options?: UseQueryOptions<number[], FailureResponseV2>
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
