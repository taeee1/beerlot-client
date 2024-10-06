import { BeerSortType, LanguageType, ReviewSortType } from '../../common'

export interface ReviewPaginatedRequest {
  page: number
  size: number
  sort: ReviewSortType
  language: LanguageType
}

export interface BeerPaginatedRequest {
  page: number
  size: number
  sort: BeerSortType
  language: LanguageType
}
