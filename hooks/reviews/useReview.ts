import {
  deleteReviewApi,
  fetchAllReviewsApi,
  getSingleReviewApi,
  updateReviewApi,
} from '@/api/review/review'

import {
  UseMutationOptions,
  UseQueryOptions,
  useMutation,
  useQuery,
  useInfiniteQuery,
  UseInfiniteQueryOptions,
} from 'react-query'
import { FailureResponseV2 } from 'types/api'
import { ReviewTypeV2, UpdateReviewRequestTypeV2 } from '../../types/review'
import { fetchMyReviewsApi } from '@/api/beers/api'
import { myReviewsQueryKey } from '../query/useBeerQuery'
import { ReviewType } from '../../types/server/review/response'
import { ReviewPaginatedRequest } from '../../types/server/pagination/request'
import { PaginatedResponseType } from '../../types/server/pagination/response'

export const updateReviewMutationKey = () => ['updateReview']

export const useReviewUpdateMutation = (
  accessToken: string,
  options?: UseMutationOptions<
    ReviewTypeV2,
    FailureResponseV2,
    {
      reviewId: number
      newContent: UpdateReviewRequestTypeV2
    }
  >
) => {
  return useMutation({
    mutationKey: updateReviewMutationKey(),
    mutationFn: ({ reviewId, newContent }) => {
      return updateReviewApi(reviewId, accessToken, newContent)
    },
    ...options,
  })
}

export const useReviewQuery = (
  reviewId?: number | null,
  options?: UseQueryOptions<ReviewTypeV2, FailureResponseV2>
) => {
  return useQuery({
    queryKey: ['singleReview', reviewId],
    queryFn: () => getSingleReviewApi(reviewId),
    enabled: reviewId !== null && reviewId !== undefined,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    ...options,
  })
}

export const useReviewDeleteMutation = (
  accessToken: string,
  options?: UseMutationOptions<void, FailureResponseV2, number>
) => {
  return useMutation<void, FailureResponseV2, number>({
    mutationFn: (reviewId: number) => {
      return deleteReviewApi(reviewId, accessToken)
    },
    ...options,
  })
}

export const useAllReviewsInfiniteQuery = (
  queryParam: ReviewPaginatedRequest,
  options?: UseInfiniteQueryOptions<
    PaginatedResponseType<ReviewType>,
    FailureResponseV2,
    PaginatedResponseType<ReviewType>
  >
) => {
  return useInfiniteQuery<
    PaginatedResponseType<ReviewType>,
    FailureResponseV2,
    PaginatedResponseType<ReviewType>
  >({
    queryKey: ['allReviews', queryParam],
    queryFn: ({ pageParam = 1 }) =>
      fetchAllReviewsApi({ ...queryParam, page: pageParam }),
    getNextPageParam: (lastPage, pages) => {
      return lastPage.nextPage
    },
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    ...options,
  })
}

export const useMyReviewsQuery = (
  beerId: number,
  accessToken: string,
  options?: UseQueryOptions<ReviewType, FailureResponseV2>
) => {
  return useQuery({
    queryKey: myReviewsQueryKey(beerId),
    queryFn: () => fetchMyReviewsApi(beerId, accessToken),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    enabled: !!beerId && !!accessToken,
    ...options,
  })
}
