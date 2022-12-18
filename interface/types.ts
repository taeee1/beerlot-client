export type AllKeyboardEvent = React.KeyboardEvent | KeyboardEvent;

export interface BeerResultType {
  id: number;
  name_ko: string;
  name_en: string;
  description: string;
  country: CountryType;
  volume: number;
  image_url: string;
  category: CategoryType;
  tags: TagsType[];
  like_count: number;
  review_count: number;
  rate?: number;
}

interface TagsType {
  id: number;
  name_ko: string;
  name_en: string;
  description?: string;
  beers?: string;
}

interface CountryType {
  code: string;
}

export interface CategoryType {
  id: number;
  name_ko: string;
  name_en: string;
  description: string;
  parent: TagsType;
}

export type RecoilState = "hasValue" | "loading" | "hasError";

export type SignUpType = {
  email: string;
  username: string;
};

export type ErrorResponse = {
  error: string;
  path: string;
  status: number;
  timestamp: string;
};
