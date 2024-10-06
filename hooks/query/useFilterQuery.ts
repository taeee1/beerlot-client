import { fetchCategoriesApi } from '@/api/filter/api'
import { FailureResponseV2 } from '@/types/api'
import { UseQueryOptions, useQuery } from 'react-query'
import { LANGUAGE_TYPE } from '../../interface/types'
import { CategoryType } from '../../types/server/beer/response'

export const useFetchBeerSearchCategoriesQuery = (
  queryParam?: LANGUAGE_TYPE,
  options?: UseQueryOptions<CategoryType[], FailureResponseV2>
) => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: () => fetchCategoriesApi(queryParam),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    ...options,
  })
}
