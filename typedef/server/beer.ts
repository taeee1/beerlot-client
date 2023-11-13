import { ReviewSortEnum } from "@/../interface/types";

// should be incompatible with BeerDetail
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

// should be incompatible with BeerResponseType
type BeerDetail = {
  id: number;
  name?: string;
  origin_country?: string;
  image_url?: string;
  category?: {
    id?: number;
    name?: string;
  };
  created_at?: null;
  description?: string;
  brewery?: string;
  origin_city?: string;
  volume?: number;
  calorie?: number;
  calorie_unit?: number;
  buy_from?: string[];
  like_count?: number;
  review_count?: number;
  rate?: number;
};

export type SingelBeerFetchResponseType = BeerDetail;

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

export type PageRequest = {
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

export type TopBeersType = BeerResponseType[];
