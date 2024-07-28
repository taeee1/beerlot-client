import { POLICY_LABEL } from "../common";

export interface MemberResponse {
  id: number;
  username: string;
  image_url: string;
}

export interface UpdateMemberResponse {
  username: string;
  status_message: string;
  image_url: string;
  agreed_policies: POLICY_LABEL[];
}
export interface MemberReviewResponse {
  id: number;
  content: string;
  image_url: string[];
  rate: number;
  like_count: number;
  updated_at: string;
  beer: {
    id: number;
    name: string;
    image_url: string;
  };
}
