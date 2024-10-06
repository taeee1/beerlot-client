import {
  fetchUserLikedReviews,
  getUserLikedBeersApi,
  getUserReviewsApi,
  getUsersInfoApi,
  updateUserInfoApi,
} from '@/api/user/api'
import {
  MutationOptions,
  UseQueryOptions,
  useMutation,
  useQuery,
  UseInfiniteQueryOptions,
  useInfiniteQuery,
} from 'react-query'
import { FailureResponse as FailureResponseV2 } from 'types/api'
import { MemberTypeRequestUpdateV2 } from '../../types/review'
import { MemberType } from '../../types/server/member/response'
import { PaginatedResponseType } from '../../types/server/pagination/response'
import { MemberReviewType } from '../../types/server/review/response'
import { BeerSortType, LanguageType, ReviewSortType } from '../../types/common'

import {
  BeerPaginatedRequest,
  ReviewPaginatedRequest,
} from '../../types/server/pagination/request'
import { BeerType } from '../../types/server/beer/response'

export const getUserInfoQueryKey = () => ['getUserInfo']
export const userBeersQueryKey = () => ['userBeers']
export const userLikedReviewsQueryKey = () => ['userLikedReviews']

export const useUserInfoQuery = (
  accessToken: string,
  options?: UseQueryOptions<MemberType, FailureResponseV2>
) => {
  return useQuery({
    queryKey: getUserInfoQueryKey(),
    queryFn: () => getUsersInfoApi(accessToken),
    enabled: !!accessToken,
    ...options,
  })
}

export const useEditUserInfoMutation = (
  accessToken: string,
  options?: MutationOptions<
    MemberType,
    FailureResponseV2,
    MemberTypeRequestUpdateV2
  >
) => {
  return useMutation({
    mutationFn: (updatedInfo: MemberTypeRequestUpdateV2) =>
      updateUserInfoApi(accessToken, updatedInfo),
    ...options,
  })
}

export const useUserReviewsQuery = (
  accessToken: string,
  queryParam?: ReviewPaginatedRequest,
  options?: UseInfiniteQueryOptions<
    PaginatedResponseType<MemberReviewType>,
    FailureResponseV2,
    PaginatedResponseType<MemberReviewType>
  >
) => {
  return useInfiniteQuery<
    PaginatedResponseType<MemberReviewType>,
    FailureResponseV2,
    PaginatedResponseType<MemberReviewType>
  >({
    queryKey: ['userReviews', queryParam],
    queryFn: ({ pageParam = 1 }) =>
      getUserReviewsApi(accessToken, {
        page: pageParam ?? 1,
        size: queryParam?.size ?? 10,
        sort: queryParam?.sort ?? ReviewSortType.RECENTLY_UPDATED,
        language: queryParam?.language ?? LanguageType.KR,
      }),
    getNextPageParam: (lastPage, pages) => {
      return lastPage.nextPage
    },
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    ...options,
  })
}

export const useUserLikedBeersQuery = (
  accessToken: string,
  queryParam?: BeerPaginatedRequest,
  options?: UseInfiniteQueryOptions<
    PaginatedResponseType<BeerType>,
    FailureResponseV2,
    PaginatedResponseType<BeerType>
  >
) => {
  return useInfiniteQuery<
    PaginatedResponseType<BeerType>,
    FailureResponseV2,
    PaginatedResponseType<BeerType>
  >({
    queryKey: ['userLikedBeers', queryParam],
    queryFn: ({ pageParam = 1 }) =>
      getUserLikedBeersApi(accessToken, {
        page: pageParam ?? 1,
        size: queryParam?.size ?? 10,
        sort: queryParam?.sort ?? BeerSortType.MOST_LIKES,
        language: queryParam?.language ?? LanguageType.KR,
      }),
    getNextPageParam: (lastPage, pages) => {
      return lastPage.nextPage
    },
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    ...options,
  })
}

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
  })
}
