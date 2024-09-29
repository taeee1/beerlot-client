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
import {
  AllBeersQueryParamsV2,
  ReviewTypeV2,
  UpdateReviewRequestTypeV2,
} from '../../typedef/review'
import { ReviewSortEnum } from '../../interface/types'
import { fetchMyReviewsApi } from '@/api/beers/api'
import { myReviewsQueryKey } from '../query/useBeerQuery'

export const allReviewsQueryKey = (sort?: ReviewSortEnum) => [
  'allReviews',
  sort,
]
export const singleReviewQueryKey = () => ['singleReview']
export const deleteReviewMutationKey = () => ['deleteReview']
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
export const useAllReviewsQuery = (
  queryParam: AllBeersQueryParamsV2,
  options?: UseQueryOptions<ReviewTypeV2[], FailureResponseV2>
) => {
  return useQuery({
    queryKey: allReviewsQueryKey(queryParam.sort),
    queryFn: () => fetchAllReviewsApi(queryParam),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    ...options,
  })
}

export const useAllReviewsInfiniteQuery = (
  queryParam: AllBeersQueryParamsV2,
  options?: UseInfiniteQueryOptions<ReviewTypeV2[], FailureResponseV2>
) => {
  return useInfiniteQuery({
    queryKey: allReviewsQueryKey(queryParam.sort),
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
  options?: UseQueryOptions<ReviewTypeV2, FailureResponseV2> // 배열로 설정

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
