import { checkUsernameApi } from "@/api/user/api";
import {
  useMutation,
  UseMutationOptions,
  UseMutationResult,
} from "react-query";
import { FailureResponse } from "types/api";

export enum BooleanString {
  True = "Y",
  False = "N",
}

interface CheckUsernameResponse {
  result: BooleanString;
}

export const useCheckUsernameMutation = (
  options?: UseMutationOptions<CheckUsernameResponse, FailureResponse, string>
): UseMutationResult<CheckUsernameResponse, FailureResponse, string> => {
  return useMutation({
    mutationFn: (username: string) => {
      console.log("api check", checkUsernameApi(username));
      return checkUsernameApi(username);
    },
    ...options,
  });
};
