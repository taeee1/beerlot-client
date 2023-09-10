import {
  AllReviewsQueryParams,
  CreateReviewRequestType,
} from "@/../hooks/query/useReviewQuery";
import { BeerReviewsQueryParams } from "@/../typedef/server/beer";
import axios from "axios";
import {
  LANGUAGE_TYPE,
  ReviewPostparamType,
  ReviewSortEnum,
  UpdatedReviewInfo,
} from "../../../interface/types";

// 맥주 1개에 대한 리뷰 리스트 post
export const postReviewWithBeerIdApi = async (
  beerId: number,
  content: ReviewPostparamType
) => {
  try {
    const result = await axios.post(`/api/v1/beers/${beerId}/reviews`, content);
    console.log(result, "postReviewWithBeerIdApi");
    return result;
  } catch (error) {
    console.error(error);
  }
};

export const createReviewApi = async (
  beerId: number,
  data: CreateReviewRequestType,
  accessToken: string
) => {
  const url = `/api/v1/beers/${beerId}/reviews`;
  const config = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };
  const response = await axios.post(url, data, config);

  return response.data;
};

// 리뷰 1개 delete
export const deleteReviewApi = async (
  reviewId: number,
  accessToken: string
) => {
  const url = `/api/v1/reviews/${reviewId}`;
  const config = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };
  const response = await axios.delete(url, config);
  return response.data;
};

// 리뷰 1개 get
export const getReviewWitReviewBeerIdApi = async (
  beerId: number,
  content: ReviewPostparamType
) => {
  try {
    const result = await axios.get(`/api/v1/reviews/${beerId}`);
    return result;
  } catch (error) {
    console.error(error);
  }
};

export const fetchAllReviewsApi = async (queryParam: AllReviewsQueryParams) => {
  const {
    page = 1,
    size = 10,
    sort = ReviewSortEnum.RecentlyUpdated,
  } = queryParam;
  const language: LANGUAGE_TYPE = LANGUAGE_TYPE.KR;
  const res = await axios.get(`/api/v1/reviews`, {
    params: {
      page,
      size,
      sort,
      language,
    },
  });
  return res.data;
};

// 맥주 1개에 대한 리뷰 리스트 get
export const fetchBeerReviewsApi = async (
  queryParams: BeerReviewsQueryParams
) => {
  const {
    beerId,
    page = 1,
    size = 10,
    sort = ReviewSortEnum.RecentlyUpdated,
  } = queryParams;

  const res = await axios.get(`/api/v1/beers/${beerId}/reviews`, {
    params: {
      page,
      size,
      sort,
    },
  });

  return res.data;
};

// 맥주 1개에 대한 리뷰 리스트 edit
export const updateReviewApi = async (
  reviewId: number,
  accessToken: string,
  content: UpdatedReviewInfo
) => {
  const config = {
    headers: { Authorization: `Bearer ${accessToken}` },
  };
  const res = await axios.patch(`/api/v1/reviews/${reviewId}`, content, config);
  return res.data;
};

// like review
export const likeReviewApi = async (reviewId: number, accessToken: string) => {
  const config = {
    headers: { Authorization: `Bearer ${accessToken}` },
  };
  const res = await axios.post(
    `/api/v1/reviews/${reviewId}/likes`,
    null,
    config
  );

  return res.data;
};

// dislike review
export const dislikeReviewApi = async (
  reviewId: number,
  accessToken: string
) => {
  const config = {
    headers: { Authorization: `Bearer ${accessToken}` },
  };

  const res = await axios.delete(`/api/v1/reviews/${reviewId}/likes`, config);

  return res.data;
};

// get one review by ID
export const getSingleReviewApi = async (reviewId: number | null) => {
  if (reviewId === null) {
    throw new Error("Review ID cannot be null.");
  }

  const res = await axios.get(`/api/v1/reviews/${reviewId}`);
  return res.data;
};
