import {
  UseMutationOptions,
  UseQueryOptions,
  useMutation,
  useQuery,
} from "react-query";
import { FailureResponseV2 } from "types/api";
import {
  BeerReviewQueryParamsV2,
  CreateReviewRequestTypeV2,
  CreateReviewResponseTypeV2,
  ReviewTypeV2,
} from "../../typedef/review";
import { createReviewApi, fetchBeerReviewsApi } from "@/api/review/beer";

export const createReviewMutationKey = () => ["createReview"];

export const useCreateReviewMutation = (
  accessToken: string,
  options?: UseMutationOptions<
    CreateReviewResponseTypeV2,
    FailureResponseV2,
    {
      beerId: number;
      data: CreateReviewRequestTypeV2;
    }
  >
) => {
  return useMutation({
    mutationKey: createReviewMutationKey(),
    mutationFn: ({
      beerId,
      data,
    }: {
      beerId: number;
      data: CreateReviewRequestTypeV2;
    }) => {
      return createReviewApi(beerId, data, accessToken);
    },
    ...options,
  });
};

export const beerReviewsQueryKey = (beerId: number) => ["beerReviews", beerId];

export const useBeerReviewsQuery = (
  queryParams: BeerReviewQueryParamsV2,
  options?: UseQueryOptions<ReviewTypeV2[], FailureResponseV2>
) => {
  return useQuery({
    queryKey: beerReviewsQueryKey(queryParams.beerId),
    queryFn: () => fetchBeerReviewsApi(queryParams),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    ...options,
  });
};
