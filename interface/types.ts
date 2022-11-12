export interface BeerResultType {
  id: number;
  name_ko: string;
  name_en: string;
  description: string;
  country: CountryType;
  volume: number;
  image_url: string;
  category: {
    id: number;
    name_ko: string;
    name_en: string;
    description: string;
    parent: TagType;
  };
  tags: TagType[];
  like_count: number;
  review_count: number;
  rate: number;
}

interface TagType {
  id: number;
  name_ko: string;
  name_en: string;
  description: string;
}

interface CountryType {
  code: string;
  name_ko: string;
  name_en: string;
}

export type RecoilState = "hasValue" | "loading" | "hasError";
