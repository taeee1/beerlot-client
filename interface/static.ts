import {v4 as uuidv4} from "uuid";
import {
  CategoryFilterListType,
  CategoryTitle,
  ReviewCategoryFilterListType,
  ReviewSortEnum,
} from "./types";

export const WELCOME_MESSAGE_FIRST = "👋 어서와요 ";
export const WELCOME_MESSAGE_SECOND = "오늘은 어떤 맥주를 마셔볼까요?";
export const POPULAR_BEER_TITLE = "🔥 인기맥주 TOP10 🔥 ";
export const RECOMMENDED_BEER_TITLE_1 = "🍻 ";
export const RECOMMENDED_BEER_TITLE_2 = " 님께 추천해요 🍻";
export const BEERLOT_TITLE = "🍺BEER LOT🍺";
export const orangeBright = "#FEA801";
export const SEARCH_BAR_PLACEHOLDER = "맥주 이름, 종류, 향 등을 검색해보세요!";

export const MOCK_FEED_FILTER_LIST: ReviewCategoryFilterListType[] = [
  {
    title: CategoryTitle.SORT_CRITERIA,
    tags: [
      ReviewSortEnum.RecentlyUpdated,
      ReviewSortEnum.HighRate,
      ReviewSortEnum.LowRate,
      ReviewSortEnum.MostLikes,
    ],
  },
];

export const ALL_FEED_MOCK = [
  {
    id: uuidv4(),
    nickname: "김누누",
    postingTime: "2시간 전",
    beerName: "버드와이저",
    ratingNumber: 4,
    imageSrc: "goat.png",
    postText:
      " 여윽시 내 최애 맥주.. 다시 미국 가고싶다ㅠㅠ 미국에서 먹었던 그 느낌을 다시 느끼고 싶을 때면 꼭 버드와이저를 찾게 되더라구요. 그리고 뭐니뭐니해도 버드와이저에는 감자칩이죠! 레이스랑 한 잔 하고 잡니다 :) 모두들 굿나잇!",
    thumbsUpNumber: 22,
  },
  {
    id: uuidv4(),
    nickname: "김태희",
    postingTime: "어제",
    beerName: "호가든",
    ratingNumber: 4,
    imageSrc: "goat.png",
    postText: "",
    thumbsUpNumber: 24,
  },
  {
    id: uuidv4(),
    nickname: "김누누",
    postingTime: "2시간 전",
    beerName: "버드와이저",
    ratingNumber: 4,
    imageSrc: "goat.png",
    postText:
      " 여윽시 내 최애 맥주.. 다시 미국 가고싶다ㅠㅠ 미국에서 먹었던 그 느낌을 다시 느끼고 싶을 때면 꼭 버드와이저를 찾게 되더라구요. 그리고 뭐니뭐니해도 버드와이저에는 감자칩이죠! 레이스랑 한 잔 하고 잡니다 :) 모두들 굿나잇!",
    thumbsUpNumber: 22,
  },
  {
    id: uuidv4(),
    nickname: "김태희",
    postingTime: "어제",
    beerName: "호가든",
    ratingNumber: 4,
    imageSrc: "goat.png",
    postText: " 여윽시 내 최애 맥주..",
    thumbsUpNumber: 24,
  },
];

export const MOCK_CATEGORY_FILTER_LIST: CategoryFilterListType[] = [
  {
    title: CategoryTitle.SORT_CRITERIA,
    tags: ["좋아요", "별점순", "리뷰많은 순"],
  },
  {
    title: CategoryTitle.BEER_TYPE,
    tags: ["IPA", "필스너", "스타우트"],
  },
  {title: CategoryTitle.BEER_COUNTRY, tags: ["독일", "미국", "일본"]},
  {
    title: CategoryTitle.BEER_DEGREE,
    tags: ["논알콜", "3%미만", "3%대"],
    isRange: true,
  },
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

export const BeerDetailMock = {
  id: 0,
  city: "콜럼버스, 미국",
  brewary: "앤하이저-부시",
  calories: 350,
  suitableGlass: "파인트",
  desc: "미국을 대표하는 맥주로, 매년 미국에서 판매량 1위를 놓치지 않는 앤하이저부시의 대표적인 상품! ",
};

const MAX_BEER_VOLUME_SLIDER = 10;
const MIN_BEER_VOLUME_SLIDER = 0;

export const MIN_MAX_BEER_VOLUME_SLIDER = [
  MIN_BEER_VOLUME_SLIDER,
  MAX_BEER_VOLUME_SLIDER,
];
