import { BeerFilterRequestType } from '@/types/api'
import axios from 'axios'
import { CategoryType, LANGUAGE_TYPE } from '../../../interface/types'
import { BeerSortType } from '../../../types/common'
import { SingelBeerFetchResponseType } from '../../../types/beer'

export const getNewAccessTokenWithRefreshToken = async () => {
  const res = await axios.get('/api/v1/auth/refresh')
  return res.data
}

export const fetchBeersApi = async (params: BeerFilterRequestType) => {
  const language: LANGUAGE_TYPE = LANGUAGE_TYPE.KR
  const res = await axios.get('/api/v1/beers', {
    params: {
      language: language,
      page: params.page || 1,
      size: params.size || 10,
      sort: params.sort || BeerSortType.MOST_LIKES,
      keyword: params.keyword || undefined,
      categories: Array.isArray(params.categories)
        ? params.categories.length > 0
          ? String(params.categories.join(','))
          : undefined
        : undefined,
      countries: Array.isArray(params.countries)
        ? params.countries.length > 0
          ? String(params.countries.join(','))
          : undefined
        : undefined,
      volume_min:
        params.volume_min !== undefined ? params.volume_min : undefined,
      volume_max: params.volume_max || undefined,
    },
  })
  return res.data
}

export const fetchTopBeersApi = async () => {
  const language: LANGUAGE_TYPE = LANGUAGE_TYPE.KR
  const res = await axios.get('/api/v1/beers/top', {
    params: {
      language: language,
    },
  })
  return res.data
}

export const fetchSingleBeerInfoApi = async ({
  id,
  language = LANGUAGE_TYPE.KR,
}: {
  id: number
  language?: LANGUAGE_TYPE
}) => {
  const res = await axios.get<SingelBeerFetchResponseType>(
    `/api/v1/beers/${id}?language=${language}`
  )
  return res.data
}

export const likeBeerApi = async (beerId: number, accessToken: string) => {
  const config = {
    headers: { Authorization: `Bearer ${accessToken}` },
  }
  const res = await axios.post(`/api/v1/beers/${beerId}/likes`, null, config)
  return res.data
}

export const dislikeBeerApi = async (beerId: number, accessToken: string) => {
  const config = {
    headers: { Authorization: `Bearer ${accessToken}` },
  }
  const res = await axios.delete(`/api/v1/beers/${beerId}/likes`, config)
  return res.data
}

export const fetchRecommendedBeers = async (accessToken: string) => {
  const config = {
    headers: { Authorization: `Bearer ${accessToken}` },
  }
  const res = await axios.get(`/api/v1/beers/recommend`, config)
  return res.data
}

export const fetchMyReviewsApi = async (
  beerId: number,
  accessToken: string
) => {
  const config = {
    headers: { Authorization: `Bearer ${accessToken}` },
  }
  const res = await axios.get(`/api/v1/beers/${beerId}/reviews/me`, config)
  return res.data
}
