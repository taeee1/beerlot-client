export interface MemberType {
  id?: number
  username?: string
  email?: string
  image_url?: string
  status_message?: string
  username_updated_at?: string
}

export interface CheckUsernameResponse {
  taken: string
}
