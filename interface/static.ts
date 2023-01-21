import {beerDetailType} from "../src/details/tab-panel/BasicPanelList";
import {CategoryFilterListType} from "./types";

export const WELCOME_MESSAGE_FIRST = "👋 어서와요 ";
export const WELCOME_MESSAGE_SECOND = "오늘은 어떤 맥주를 마셔볼까요?";
export const POPULAR_BEER_TITLE = "🔥 인기맥주 TOP10 🔥 ";
export const RECOMMENDED_BEER_TITLE_1 = "🍻 ";
export const RECOMMENDED_BEER_TITLE_2 = " 님께 추천해요 🍻";
export const BEERLOT_TITLE = "🍺BEER LOT🍺";
export const orangeBright = "#FEA801";
export const SEARCH_BAR_PLACEHOLDER = "맥주 이름, 종류, 향 등을 검색해보세요!";

export const MOCK_CATEGORY_FILTER_LIST: CategoryFilterListType[] = [
  {title: "정렬 기준", tags: ["좋아요", "별점순", "리뷰많은 순"]},
  {title: "맥주 종류", tags: ["IPA", "필스너"]},
  {title: "제조국", tags: ["독일", "미국", "일본"]},
  {title: "도수", tags: ["논알콜", "3%미만", "3%대"]},
];

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

export const MOCK_BEERS_SUGGESTION = {
  id: 0,
  name_ko: "오비라거",
  name_en: "OB LAGAR",
  description: "오비라거 입니다.",
  country: "KO",
  volume: 4.4,
  image_url: "https://picsum.photos/id/237/200/300",
  category: {
    id: 1,
    name_ko: "라거",
    name_en: "lagar",
    description: "this is lagar",
    parent: {
      id: 2,
      name_ko: "밀맥주",
      name_en: "wheat beer",
    },
  },
  tags: [
    {
      id: 2,
      name_ko: "밀맥주",
      name_en: "wheat beer",
    },
  ],
  like_count: 24,
  review_count: 3,
  rate: 4.1,
};

export const BeerDetailMock: beerDetailType = {
  id: 0,
  city: "콜럼버스, 미국",
  brewary: "앤하이저-부시",
  calories: 350,
  suitableGlass: "파인트",
  desc: "미국을 대표하는 맥주로, 매년 미국에서 판매량 1위를 놓치지 않는 앤하이저부시의 대표적인 상품! ",
};
