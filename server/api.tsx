import axios from "axios";
import {BeerResultType, CategoryType, ReviewSortType} from "../interface/types";

export const getAllBeersApi = async (index: number) => {
  const result: BeerResultType = await axios
    .get(`/api/v1/beers/${index}`)
    .then((res) => {
      return res.data;
    });
  return result;
};

export const getTop10BeersApi = async () => {
  const result: BeerResultType[] = await axios
    .get(`/api/v1/beers/top`)
    .then((res) => {
      return res.data;
    });
  return result;
};

export const getBeerCategoriesApi = async () => {
  const result: CategoryType[] = await axios
    .get(`/api/v1/categories`)
    .then((res) => {
      return res.data;
    });
  return result;
};

// review
export const getAllReviewApi = async () => {
  const result = await axios
    .get(`/api/v1/reviews?page=1&size=10&sort=${ReviewSortType.MostLikes}`)
    .then((res) => {
      return res.data;
    });
  return result;
};
