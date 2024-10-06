import { MemberType } from '../member/response'
import { BeerShortenType } from '../beer/response'

export interface ReviewType {
  id?: number
  content?: string
  image_url?: string
  rate?: number
  like_count?: number
  updated_at?: string
  buy_from?: string
  member?: MemberType
  beer?: BeerShortenType
}

export interface MemberReviewType
  extends Omit<ReviewType, 'member' | 'buy_from'> {}
