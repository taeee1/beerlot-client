import {ReviewSortEnum} from "@/../interface/types";

export interface BeerResponseType {
  id?: number;
  name?: string;
  origin_country?: string;
  image_url?: string;
  category?: {
    id?: number;
    name?: string;
  };
}
export interface BeerReviewsQueryParams {
  beerId: number;
  page?: number;
  size?: number;
  sort?: ReviewSortEnum;
}
