export interface SignUpRequestType {
  username: string
  status_message: string
  image_url: string
  agreed_policies: POLICY_LABEL[]
}

export enum POLICY_LABEL {
  PERSONAL_INFORMATION_POLICY = 'PERSONAL_INFORMATION_POLICY',
  TERMS_OF_SERVICE = 'TERMS_OF_SERVICE',
}
