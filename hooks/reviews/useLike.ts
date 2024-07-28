import { dislikeReviewApi, likeReviewApi } from "@/api/review/like";
import { UseMutationOptions, useMutation } from "react-query";
import { FailureResponseV2 } from "types/api";

export const reviewLikeKey = () => ["reviewLike"];
export const reviewDislikeKey = () => ["reviewDisike"];

export const useReviewLikeMutation = (
  reviewId: number,
  accessToken: string,
  options?: UseMutationOptions<void, FailureResponseV2>
) => {
  return useMutation({
    mutationFn: () => likeReviewApi(reviewId, accessToken),
    ...options,
  });
};

export const useReviewDislikeMutation = (
  reviewId: number,
  accessToken: string,
  options?: UseMutationOptions<void, FailureResponseV2>
) => {
  return useMutation({
    mutationFn: () => dislikeReviewApi(reviewId, accessToken),
    ...options,
  });
};
