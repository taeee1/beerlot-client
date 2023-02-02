export type AllKeyboardEvent = React.KeyboardEvent | KeyboardEvent;

// export interface CategoryFilterListType {
//   [index: string]: string[];
// }

export interface CategoryFilterListType {
  title: CategoryTitle;
  tags: string[];
  isRange?: boolean;
}
export interface ReviewCategoryFilterListType {
  title: CategoryTitle;
  tags: ReviewSortEnum[];
}

// export enum CategoryTitle {
//   CRITERIA = "정렬 기준",
//   SORT = "맥주 종류",
//   COUNTRY = "제조국",
//   ALCHOLE = "도수",
// }

export enum CategoryTitle {
  SORT_CRITERIA = "정렬 기준",
  BEER_TYPE = "맥주 종류",
  BEER_COUNTRY = "제조국",
  BEER_DEGREE = "도수",
}

export interface BeerResultType {
  id: number;
  name_ko: string;
  name_en: string;
  description: string;
  country: CountryType;
  volume: number;
  image_url: string;
  category: CategoryType;
  tags: TagsType[];
  like_count: number;
  review_count: number;
  rate?: number;
}

interface TagsType {
  id: number;
  name_ko: string;
  name_en: string;
  description?: string;
  beers?: string;
}

interface CountryType {
  code: string;
}

export interface CategoryType {
  id: number;
  name_ko: string;
  name_en: string;
  description: string;
  parent: TagsType;
}

export type RecoilState = "hasValue" | "loading" | "hasError";

export type SignUpType = {
  email: string;
  username: string;
  statusMessage?: string;
  image_url?: string;
};

export type ErrorResponse = {
  error: string;
  path: string;
  status: number;
  timestamp: string;
};

export interface ReviewType {
  beerName: string | null;
  rate: number;
  place?: string | null;
  review?: string | null;
  imgUrl?: string[] | null;
}

export enum ReviewSortEnum {
  RecentlyUpdated = "RECENTLY_UPDATED",
  MostLikes = "MOST_LIKES",
  HighRate = "HIGH_RATE",
  LowRate = "LOW_RATE",
}

export enum ReviewSortLabelEnum {
  RECENTLY_UPDATED = "최신순",
  MOST_LIKES = "좋아요순",
  HIGH_RATE = "별점높은순",
  LOW_RATE = "별점낮은순",
}

export const ReviewFilterSort = {
  [ReviewSortEnum.RecentlyUpdated]: ReviewSortLabelEnum.RECENTLY_UPDATED,
  [ReviewSortEnum.MostLikes]: ReviewSortLabelEnum.MOST_LIKES,
  [ReviewSortEnum.HighRate]: ReviewSortLabelEnum.HIGH_RATE,
  [ReviewSortEnum.LowRate]: ReviewSortLabelEnum.LOW_RATE,
};

export enum LANGUAGE_TYPE {
  KR = "KR",
  EN = "EN",
}

export enum OAUTH_PROVIDER {
  GOOGLE = "google",
  NAVER = "naver",
  KAKAO = "kakao",
}
