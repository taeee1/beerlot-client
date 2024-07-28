import { signupApi } from "@/api/auth/api";
import { SignupRequestType } from "@/api/review/typedef";
import { UseQueryOptions, useQuery } from "react-query";
import { DefaultResponse, FailureResponse } from "types/api";

export const signupQueryKey = () => ["signup"];

export const useSignupQuery = (
  queryParam: SignupRequestType,
  accessToken: string,
  options?: UseQueryOptions<DefaultResponse, FailureResponse>
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
