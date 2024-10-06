import axios from 'axios'
import { LANGUAGE_TYPE } from '../../../interface/types'
import { UpdateReviewRequestTypeV2 } from '../../../types/review'
import { ReviewPaginatedRequest } from '../../../types/server/pagination/request'
import { ReviewSortType } from '../../../types/common'

export const deleteReviewApi = async (
  reviewId: number,
  accessToken: string
) => {
  const url = `/api/v1/reviews/${reviewId}`
  const config = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  }
  const res = await axios.delete(url, config)
  return res.data
}

export const fetchAllReviewsApi = async (
  queryParam: ReviewPaginatedRequest
) => {
  const {
    page = 1,
    size = 10,
    sort = ReviewSortType.RECENTLY_UPDATED,
  } = queryParam
  const language: LANGUAGE_TYPE = LANGUAGE_TYPE.KR
  const res = await axios.get(`/api/v1/reviews`, {
    params: {
      page,
      size,
      sort,
      language,
    },
  })
  return res.data
}

export const updateReviewApi = async (
  reviewId: number,
  accessToken: string,
  newContent: UpdateReviewRequestTypeV2
) => {
  const config = {
    headers: { Authorization: `Bearer ${accessToken}` },
  }
  const res = await axios.patch(
    `/api/v1/reviews/${reviewId}`,
    newContent,
    config
  )
  return res.data
}

export const getSingleReviewApi = async (reviewId?: number | null) => {
  if (reviewId === null || reviewId === undefined) {
    throw new Error('Review ID cannot be null.')
  }
  const language: LANGUAGE_TYPE = LANGUAGE_TYPE.KR
  const res = await axios.get(`/api/v1/reviews/${reviewId}`, {
    params: {
      language,
    },
  })
  return res.data
}
