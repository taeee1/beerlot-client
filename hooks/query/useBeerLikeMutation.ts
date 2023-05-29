import {FailureResponse} from "@/types/api";
import {likeBeerApi} from "api/beers/api";
import {UseMutationOptions, useMutation} from "react-query";

export const useBeerLikeMutation = (
  options?: UseMutationOptions<
    any,
    FailureResponse,
    {beerId: number; accessToken: string}
  >
) => {
  const mutationFn = async ({
    beerId,
    accessToken,
  }: {
    beerId: number;
    accessToken: string;
  }) => {
    const res = await likeBeerApi(beerId, accessToken);
    return res;
  };
  return useMutation<
    any,
    FailureResponse,
    {beerId: number; accessToken: string}
  >(mutationFn, options);
};
