export interface ReviewResult {
  id: number;
  content: string;
  image_url: string;
  rate: number;
  like_count: number;
  updated_at: string;
  member: Member;
  beer: Beer;
}

export interface Member {
  id: number;
  username: string;
  image_url: string;
  status_message: string;
  username_updated_at: string;
}

export interface Beer {
  id: number;
  name: string;
}
