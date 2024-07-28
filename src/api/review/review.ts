import axios from "axios";
import { LANGUAGE_TYPE, ReviewSortEnum } from "../../../interface/types";
import { AllBeersQueryParamsV2, UpdateReviewRequestTypeV2 } from "./typedef";

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
  const res = await axios.delete(url, config);
  return res.data;
};

export const fetchAllReviewsApi = async (queryParam: AllBeersQueryParamsV2) => {
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
  return res.data.contents;
};

export const updateReviewApi = async (
  reviewId: number,
  accessToken: string,
  newContent: UpdateReviewRequestTypeV2
) => {
  const config = {
    headers: { Authorization: `Bearer ${accessToken}` },
  };
  const res = await axios.patch(
    `/api/v1/reviews/${reviewId}`,
    newContent,
    config
  );
  return res.data;
};

export const getSingleReviewApi = async (reviewId?: number | null) => {
  if (reviewId === null || reviewId === undefined) {
    throw new Error("Review ID cannot be null.");
  }
  const language: LANGUAGE_TYPE = LANGUAGE_TYPE.KR;
  const res = await axios.get(`/api/v1/reviews/${reviewId}`, {
    params: {
      language,
    },
  });
  return res.data;
};
