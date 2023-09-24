import { BeerSortType } from "../../types/common";

export interface FailureResponse {
  response: {
    data: string;
    status: number;
    statusText: string;
  };
}

export type BeerFilterRequestType = {
  page?: number;
  size?: number;
  sort?: BeerSortType;
  keyword?: string;
  categories?: number[];
  countries?: string[];
  volume_min?: number;
  volume_max?: number;
};
