import { LanguageType, ReviewSortType } from '../../../types/common'
import axios from 'axios'
import { BeerSortEnum, OAUTH_PROVIDER } from '../../../interface/types'
import { MemberTypeRequestUpdateV2 } from '../../../types/review'

import {
  BeerPaginatedRequest,
  ReviewPaginatedRequest,
} from '../../../types/server/pagination/request'

const redirectUrl = 'https://beerlot.info'

export const getUsersInfoApi = async (accessToken: string) => {
  const res = await axios.get('/api/v1/members/me', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
  return res.data
}

export const updateUserInfoApi = async (
  accessToken: string,
  updatedInfo: MemberTypeRequestUpdateV2
) => {
  const res = await axios.put('/api/v1/members/me', updatedInfo, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
  return res.data
}

export const getUserReviewsApi = async (
  accessToken: string,
  queryParam: ReviewPaginatedRequest
) => {
  const { page, size, sort, language } = queryParam
  const res = await axios.get(`/api/v1/members/reviews`, {
    params: {
      page,
      size,
      sort,
      language,
    },
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
  return res.data
}

export const getUserLikedBeersApi = async (
  accessToken: string,
  queryParam?: BeerPaginatedRequest,
  language: LanguageType = LanguageType.KR
) => {
  const {
    page = 1,
    size = 10,
    sort = BeerSortEnum.MostLikes,
  } = queryParam ?? {}
  const res = await axios.get(`/api/v1/members/beers`, {
    params: {
      page,
      size,
      sort,
      language,
    },
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
  return res.data
}

export const fetchUserLikedReviews = async (accessToken: string) => {
  const res = await axios.get('/api/v1/members/reviews/likes', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })

  return res.data
}

export const generateSocialLoginUrl = (provider: OAUTH_PROVIDER) => {
  return `https://beerlot-core-api-lopbi5pmwq-du.a.run.app/api/v1/auth/authorize/${provider}?redirect-url=${redirectUrl}`
}

export const checkUsernameApi = async (username: string) => {
  const res = await axios.post('/api/v1/members/check-username', {
    username: username,
  })
  return res.data
}
