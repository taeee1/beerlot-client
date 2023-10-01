import { Category, fetchCategoriesApi } from "@/api/filter/api";
import { FailureResponse } from "@/types/api";
import { UseQueryOptions, useQuery } from "react-query";
import { LANGUAGE_TYPE } from "../../interface/types";

export const useFetcBeerSearchCategoriesQuery = (
  queryParam?: LANGUAGE_TYPE,
  options?: UseQueryOptions<Category[], FailureResponse>
) => {
  return useQuery({
    queryKey: ["beerFilter"],
    queryFn: () => fetchCategoriesApi(queryParam),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    ...options,
  });
};
