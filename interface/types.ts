import { ReviewSortType } from '../types/common'

export type AllKeyboardEvent = React.KeyboardEvent | KeyboardEvent

export interface CategoryFilterListType {
  title: CategoryTitle
  tags: (string | number)[]
  isRange?: boolean
}
export interface ReviewCategoryFilterListType {
  title: CategoryTitle
  tags: ReviewSortType[]
}

export enum CategoryTitle {
  SORT_CRITERIA = '정렬 기준',
  BEER_TYPE = '맥주 종류',
  BEER_COUNTRY = '제조국',
  BEER_DEGREE = '도수',
}

export interface BeerResultType {
  id: number
  name_ko: string
  name_en: string
  description: string
  country: CountryType
  volume: number
  image_url: string
  category: CategoryType
  tags: TagsType[]
  like_count: number
  review_count: number
  rate?: number
}

interface TagsType {
  id: number
  name_ko: string
  name_en: string
  description?: string
  beers?: string
}

interface CountryType {
  code: string
}

export interface CategoryType {
  id: number
  name_ko: string
  name_en: string
  description: string
  parent: TagsType
}

export type SignUpType = {
  email?: string
  username?: string
  statusMessage?: string
  image_url?: string
}

export enum BeerSortEnum {
  MostLikes = 'MOST_LIKES',
  HighRate = 'HIGH_RATE',
  MostReviews = 'MOST_REVIEWS',
}

export enum ReviewSortLabelEnum {
  RECENTLY_UPDATED = '최신순',
  MOST_LIKES = '좋아요순',
  HIGH_RATE = '별점높은순',
  LOW_RATE = '별점낮은순',
}

export const ReviewFilterSort = {
  [ReviewSortType.RECENTLY_UPDATED]: ReviewSortLabelEnum.RECENTLY_UPDATED,
  [ReviewSortType.MOST_LIKES]: ReviewSortLabelEnum.MOST_LIKES,
  [ReviewSortType.HIGH_RATE]: ReviewSortLabelEnum.HIGH_RATE,
  [ReviewSortType.LOW_RATE]: ReviewSortLabelEnum.LOW_RATE,
}

export enum LANGUAGE_TYPE {
  KR = 'KR',
  EN = 'EN',
}

export enum OAUTH_PROVIDER {
  GOOGLE = 'google',
  NAVER = 'naver',
  KAKAO = 'kakao',
}
