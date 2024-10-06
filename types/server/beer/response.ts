export interface BeerShortenType {
  id?: number
  name?: string
}

/* recommend beers */
export type RecommendedBeersResponse = {
  id: number[]
}

export interface BeerCategoryType {
  id?: number
  name?: string
}

export interface BeerType {
  id?: number
  name?: string
  origin_country?: string
  image_url?: string
  category?: BeerCategoryType
  created_at?: string
}

export interface CategoryType {
  id: number
  name: string
  children: string[]
}
