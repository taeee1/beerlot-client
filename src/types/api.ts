import { BeerSortType } from "../../types/common";

// legacy
export interface FailureResponse {
  response: {
    data: string;
    status: number;
    statusText: string;
  };
  message: string;
}

export interface FailureResponseV2 {
  message?: string;
  status?: number;
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

export type DefaultResponse = {
  message: string;
  status: number;
};
