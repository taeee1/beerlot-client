export interface BeerResponseType {
  id?: number;
  name?: string;
  origin_country?: string;
  image_url?: string;
  category?: {
    id?: number;
    name?: string;
  };
}
