import { ReviewSortEnum } from "@/../interface/types";

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
export type SingelBeerFetchResponseType = BeerResponseType;

export type RecommendedBeersResponse = {
  id: number[];
};

export type BeersResponseType = {
  contents: Beer[];
  pageRequest: PageRequest;
  page: number;
  totalElements: number;
  nextPage?: null;
  totalPages: number;
};

type Beer = {
  id: number;
  name: string;
  origin_country: string;
  image_url: string;
  category: {
    id: number;
    name: string;
  };
  created_at?: null;
};

type PageRequest = {
  page: number;
  size: number;
  sort: string;
  offset: number;
};

type Response = {
  contents: Beer[];
  pageRequest: PageRequest;
  page: number;
  totalElements: number;
  nextPage?: null;
  totalPages: number;
};
