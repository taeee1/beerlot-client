export const WELCOME_MESSAGE_FIRST = "👋 어서와요 ";
export const WELCOME_MESSAGE_SECOND = "오늘은 어떤 맥주를 마셔볼까요?";
export const POPULAR_BEER_TITLE = "🔥 인기맥주 TOP10 🔥 ";
export const RECOMMENDED_BEER_TITLE_1 = "🍻 ";
export const RECOMMENDED_BEER_TITLE_2 = " 님께 추천해요 🍻";
export const BEERLOT_TITLE = "🍺BEER LOT🍺";
export const orangeBright = "#FEA801";
export const SEARCH_BAR_PLACEHOLDER = "맥주 이름, 종류, 향 등을 검색해보세요!";

export const textMain = "#000000";

export const getVh = (px: number) => {
  return Math.floor(765 / px);
};

export const enum CardType {
  POPULAR = "popular",
  RECOMMEND = "recommend",
}

export const MOCK_CARD_LIST = [
  {
    id: 0,
    beerName: "츄로스 랜드",
    img_src: "https://picsum.photos/id/237/200/300",
    sort: "IPA",
    country: "🌎",
  },
  {
    id: 1,
    beerName: "칠성사이다 제로",
    img_src: "https://picsum.photos/id/237/200/300",
    sort: "IPA",
    country: "🌎",
  },
  {
    id: 2,
    beerName: "펩시 제로",
    img_src: "https://picsum.photos/id/237/200/300",
    sort: "IPA",
    country: "🌎",
  },
  {
    id: 3,
    beerName: "맛소금",
    img_src: "https://picsum.photos/id/237/200/300",
    sort: "IPA",
    country: "🌎",
  },
  {
    id: 4,
    beerName: "오예스 미니",
    img_src: "https://picsum.photos/id/237/200/300",
    sort: "IPA",
    country: "🌎",
  },
];

export interface beerItemType {
  id: number;
  beerName: string;
  img_src: string;
  sort: string;
  country: string;
}

export enum ReviewStatic {
  numberOfMaxAttachedFile = 5,
  ReviewInputMaxLength = 2000,
}
