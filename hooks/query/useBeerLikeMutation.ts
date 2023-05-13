import {FailureResponse} from "@/types/api";
import {likeBeerApi} from "api/beers/api";
import {UseMutationOptions, useMutation} from "react-query";

export const useBeerLikeMutation = (
  options?: UseMutationOptions<any, FailureResponse, {beerId: number}>
) => {
  const mutationFn = async ({beerId}: {beerId: number}) => {
    const res = await likeBeerApi(beerId);
    return res;
  };
  return useMutation<any, FailureResponse, {beerId: number}>(
    mutationFn,
    options
  );
};
