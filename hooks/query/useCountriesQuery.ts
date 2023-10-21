import {
  Category,
  fetchCategoriesApi,
  fetchCountriesApi,
} from "@/api/filter/api";
import { FailureResponse } from "@/types/api";
import { UseQueryOptions, useQuery } from "react-query";
import { LANGUAGE_TYPE } from "../../interface/types";

export const useFetchCountriesQuery = (
  queryParam?: LANGUAGE_TYPE,
  options?: UseQueryOptions<string[], FailureResponse>
) => {
  return useQuery({
    queryKey: ["countries"],
    queryFn: () => fetchCountriesApi(queryParam),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    ...options,
  });
};
