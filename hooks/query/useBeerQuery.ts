import {
  fetchBeersApi,
  fetchMyReviewsApi,
  fetchRecommendedBeers,
  fetchSingleBeerInfoApi,
  fetchTopBeersApi,
} from 'api/beers/api'
import { UseQueryOptions, useInfiniteQuery, useQuery } from 'react-query'
import { BeerFilterRequestType, FailureResponse } from 'types/api'
import { LANGUAGE_TYPE } from '../../interface/types'
import {
  BeersResponseType,
  SingelBeerFetchResponseType,
  TopBeersType,
} from '../../types/beer'
import { ReviewTypeV2 } from '../../types/review'
import { RecommendedBeersResponse } from '../../types/server/beer/response'

export const topBeersQueryKey = () => ['topBeers']
export const myReviewsQueryKey = (beerId: number) => [`myReviews`, beerId]

export const useTopBeersQuery = (
  options?: UseQueryOptions<TopBeersType, FailureResponse>
) => {
  return useQuery({
    queryKey: topBeersQueryKey(),
    queryFn: fetchTopBeersApi,
    enabled: false,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    ...options,
  })
}

export const beersQueryKey = () => ['beers']

export const useBeersQuery = (
  queryParam: BeerFilterRequestType,
  options?: UseQueryOptions<BeersResponseType, FailureResponse>
) => {
  return useQuery({
    queryKey: ['beers', queryParam.keyword],
    queryFn: () => fetchBeersApi(queryParam),
    enabled: false,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    ...options,
  })
}

export const recommendedBeersKey = () => ['recommendedBeers']

export const useRecommendedBeersQuery = (
  accessToken: string,
  options?: UseQueryOptions<RecommendedBeersResponse, FailureResponse>
) => {
  return useQuery({
    queryKey: recommendedBeersKey(),
    queryFn: () => fetchRecommendedBeers(accessToken),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    ...options,
  })
}

export const singleBeerFetchKey = (beerId: number) => [
  'singleBeerFetchKey',
  beerId,
]

export const useSingleBeerFetchQuery = (
  beerId: number,
  language?: LANGUAGE_TYPE,
  options?: UseQueryOptions<SingelBeerFetchResponseType, FailureResponse>
) => {
  return useQuery({
    queryKey: singleBeerFetchKey(beerId),
    queryFn: () =>
      fetchSingleBeerInfoApi({
        id: beerId,
        language: language || LANGUAGE_TYPE.KR,
      }),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    enabled: !!beerId,
    ...options,
  })
}
