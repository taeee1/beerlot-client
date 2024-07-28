import {
  deleteReviewApi,
  fetchAllReviewsApi,
  getSingleReviewApi,
  updateReviewApi,
} from "@/api/review/review";
import {
  AllBeersQueryParamsV2,
  ReviewTypeV2,
  UpdateReviewRequestTypeV2,
} from "@/api/review/typedef";
import {
  UseMutationOptions,
  UseQueryOptions,
  useMutation,
  useQuery,
} from "react-query";
import { FailureResponseV2 } from "types/api";

export const allReviewsQueryKey = () => ["allReviews"];
export const singleReviewQueryKey = () => ["singleReview"];
export const deleteReviewMutationKey = () => ["deleteReview"];
export const updateReviewMutationKey = () => ["updateReview"];

export const useReviewUpdateMutation = (
  accessToken: string,
  options?: UseMutationOptions<
    ReviewTypeV2,
    FailureResponseV2,
    {
      reviewId: number;
      newContent: UpdateReviewRequestTypeV2;
    }
  >
) => {
  return useMutation({
    mutationKey: updateReviewMutationKey(),
    mutationFn: ({ reviewId, newContent }) => {
      return updateReviewApi(reviewId, accessToken, newContent);
    },
    ...options,
  });
};

export const useReviewQuery = (
  reviewId?: number | null,
  options?: UseQueryOptions<ReviewTypeV2, FailureResponseV2>
) => {
  return useQuery({
    queryKey: [reviewId],
    queryFn: () => getSingleReviewApi(reviewId),
    enabled: reviewId !== null && reviewId !== undefined,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    ...options,
  });
};

export const useReviewDeleteMutation = (
  accessToken: string,
  options?: UseMutationOptions<void, FailureResponseV2, number>
) => {
  return useMutation<void, FailureResponseV2, number>({
    mutationFn: (reviewId: number) => {
      return deleteReviewApi(reviewId, accessToken);
    },
    ...options,
  });
};
export const useAllReviewsQuery = (
  queryParam: AllBeersQueryParamsV2,
  options?: UseQueryOptions<ReviewTypeV2[], FailureResponseV2>
) => {
  return useQuery({
    queryKey: allReviewsQueryKey(),
    queryFn: () => fetchAllReviewsApi(queryParam),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    ...options,
  });
};
