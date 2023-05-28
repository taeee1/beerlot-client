import {LanguageType, POLICY_LABEL, ReviewSortType, SortType} from "../common";

export interface MemberRequest {
  username: string;
  status_message: string;
  image_url: string;
  agreed_policies: POLICY_LABEL[];
}

export interface MemberReviewsRequest {
  page: number;
  size: number;
  sort: ReviewSortType;
  language: LanguageType;
}

export interface MemberBeersRequest {
  page: number;
  size: number;
  sort: SortType;
  language: LanguageType;
}
