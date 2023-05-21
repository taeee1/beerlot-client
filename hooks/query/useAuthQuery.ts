import {signupApi} from "@/api/auth/api";
import {UseQueryOptions, useQuery} from "react-query";
import {FailureResponse} from "types/api";
import {SignupRequestType} from "./useReviewQuery";

export const signupQueryKey = () => ["signup"];

export const useSignupQuery = (
  queryParam: SignupRequestType,
  accessToken: string,
  options?: UseQueryOptions<any, FailureResponse>
) => {
  return useQuery({
    queryKey: signupQueryKey(),
    queryFn: () => signupApi(queryParam, accessToken),
    enabled: false,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    ...options,
  });
};
