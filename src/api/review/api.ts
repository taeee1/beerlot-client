import axios from "axios";
import {ReviewPostparamType, ReviewSortEnum} from "../../../interface/types";
import {AllReviewsQueryParams} from "@/../hooks/query/useReviewQuery";

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
  const res = await axios.get(`/api/v1/reviews`, {
    params: {
      page,
      size,
      sort,
    },
  });
  return res.data;
};

// 맥주 1개에 대한 리뷰 리스트 post
export const patchReviewApi = async (
  beerId: number,
  content: ReviewPostparamType
) => {
  try {
    const result = await axios.patch(`/api/v1/reviews/${beerId}`, content);
    console.log(result, "postReviewWithBeerIdApi");
    return result;
  } catch (error) {
    console.error(error);
  }
};

// 리뷰 1개 delete
export const deleteReviewApi = async (beerId: number) => {
  try {
    const result = await axios.delete(`/api/api/v1/reviews/${beerId}`);
    console.log(result, "deleteReviewApi");
    return result;
  } catch (error) {
    console.error(error);
  }
};

// like review
export const likeReviewApi = async (beerId: number) => {
  try {
    const result = await axios.post(`/api/v1/reviews/${beerId}/likes`);
    console.log(result, "likeReviewApi");
    return result;
  } catch (error) {
    console.error(error);
  }
};

// displike review
export const dislikeReviewApi = async (beerId: number) => {
  try {
    const result = await axios.delete(`/api/v1/reviews/${beerId}/likes`);
    console.log(result, "likeReviewApi");
    return result;
  } catch (error) {
    console.error(error);
  }
};
