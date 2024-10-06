export enum POLICY_LABEL {
  PERSONAL_INFORMATION_POLICY = 'PERSONAL_INFORMATION_POLICY',
  TERMS_OF_SERVICE = 'TERMS_OF_SERVICE',
}

export enum ReviewSortType {
  RECENTLY_UPDATED = 'RECENTLY_UPDATED',
  MOST_LIKES = 'MOST_LIKES',
  HIGH_RATE = 'HIGH_RATE',
  LOW_RATE = 'LOW_RATE',
}

export enum BeerSortType {
  MOST_LIKES = 'MOST_LIKES',
  HIGH_RATE = 'HIGH_RATE',
  MOST_REVIEWS = 'MOST_REVIEWS',
}

export enum LanguageType {
  KR = 'KR',
  EN = 'EN',
}
export interface Country {
  name: string
  flag: string
}
