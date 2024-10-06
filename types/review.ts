import { POLICY_LABEL } from './common'

export type ReviewTypeV2 = {
  id: number
  content: string
  image_url: string
  rate: number
  buy_from: string
  like_count: number
  updated_at: string
  member: MemberTypeV2
  beer: BeerTypeV2
}

export type BeerTypeV2 = {
  id: number
  name: string
}

export type CreateReviewRequestTypeV2 = Pick<
  ReviewTypeV2,
  'content' | 'rate' | 'image_url' | 'buy_from'
>
export type CreateReviewResponseTypeV2 = void

export type UpdateReviewRequestTypeV2 = Partial<CreateReviewRequestTypeV2> & {
  content: string
  rate: number
}

export type BeerReviewQueryParamsV2 = {
  beerId: number
  page?: number
  size?: number
  sort?: string
}

export type MemberTypeV2 = {
  id: number
  username: string
  image_url: string
  status_message: string
  username_updated_at: string
}

export type MemberTypeRequestUpdateV2 = Pick<
  MemberTypeV2,
  'status_message' | 'username' | 'image_url'
>

export type SignupRequestType = {
  username?: string
  status_message?: string
  image_url?: string
  agreed_policies?: POLICY_LABEL[]
}
