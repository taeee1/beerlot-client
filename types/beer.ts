export interface BeerResponseType {
  id?: number
  name?: string
  origin_country?: string
  image_url?: string
  category?: {
    id?: number
    name?: string
  }
}

type BeerDetail = {
  id: number
  name?: string
  origin_country?: string
  image_url?: string
  category?: {
    id?: number
    name?: string
  }
  created_at?: null
  description?: string
  brewery?: string
  origin_city?: string
  volume?: number
  calorie?: number
  calorie_unit?: number
  buy_from?: string[]
  like_count?: number
  review_count?: number
  rate?: number
}

export type SingelBeerFetchResponseType = BeerDetail

export type BeersResponseType = {
  contents: BeerType[]
  pageRequest: PageRequest
  page: number
  totalElements: number
  nextPage?: null
  totalPages: number
}

export type BeerType = {
  id: number
  name: string
  origin_country: string
  image_url: string
  category: {
    id: number
    name: string
  }
  created_at?: null
}

export type PageRequest = {
  page: number
  size: number
  sort: string
  offset: number
}

export type TopBeersType = BeerResponseType[]
