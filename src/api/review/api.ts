import axios from "axios";
import {useMutation} from "react-query";
import {ReviewSortEnum} from "../../../interface/types";

// review
export const getAllReviewApi = async ({
  page = 1,
  size = 10,
  sort = ReviewSortEnum.RecentlyUpdated,
}: {
  page?: number;
  size?: number;
  sort?: ReviewSortEnum;
}) => {
  try {
    const result = await axios.get(
      `/api/v1/reviews?page=${page}&size=${size}&sort=${sort}`
    );
    console.log(result, "getAllReviewApi");
    return result;
  } catch (error) {
    console.error(error);
  }
};

export const likeBeerApi = async (beerId: number) => {
  try {
    const result = await axios.post(`/api/v1/beers/${beerId}/likes`);
    console.log(result, "likeBeerApi");
    return result;
  } catch (error) {
    console.error(error);
  }
};

export const dislikeBeerApi = async (beerId: number) => {
  try {
    const result = await axios.delete(`/api/v1/beers/${beerId}/likes`);
    console.log(result, "dislikeBeerApi");
    return result;
  } catch (error) {
    console.error(error);
  }
};
