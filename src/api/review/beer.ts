import axios from 'axios'
import {
  BeerReviewQueryParamsV2,
  CreateReviewRequestTypeV2,
} from '../../../types/review'
import { ReviewSortType } from '../../../types/common'

export const createReviewApi = async (
  beerId: number,
  data: CreateReviewRequestTypeV2,
  accessToken: string
) => {
  const url = `/api/v1/beers/${beerId}/reviews`
  const config = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  }
  const response = await axios.post(
    url,
    true ? { ...data, image_url: data.image_url[0] } : data,
    config
  )

  return response.data
}

export const fetchBeerReviewsApi = async (
  queryParams: BeerReviewQueryParamsV2
) => {
  const {
    beerId,
    page = 1,
    size = 10,
    sort = ReviewSortType.RECENTLY_UPDATED,
  } = queryParams

  const res = await axios.get(`/api/v1/beers/${beerId}/reviews`, {
    params: {
      page,
      size,
      sort,
    },
  })

  return res.data.contents
}
