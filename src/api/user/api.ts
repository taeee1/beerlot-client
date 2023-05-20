import {
  BeersWithLanguage,
  ReviewsWithLanguage,
} from "@/../hooks/query/useReviewQuery";
import axios from "axios";
import {
  BeerSortEnum,
  LANGUAGE_TYPE,
  OAUTH_PROVIDER,
  ReviewSortEnum,
} from "../../../interface/types";

const redirectUrl = "https://beerlot-client.vercel.app";

export const getUsersInfoApi = async () => {
  const res = await axios.get("/api/v1/members/me");
  return res.data;
};

export const putUsersInfoApi = async () => {
  const res = await axios.put("/api/v1/members/me");
  return res.data;
};

export const getUserReviewsApi = async (queryParam: ReviewsWithLanguage) => {
  const language: LANGUAGE_TYPE = LANGUAGE_TYPE.KR;
  const {
    page = 1,
    size = 10,
    sort = ReviewSortEnum.RecentlyUpdated,
  } = queryParam;
  const res = await axios.get(`/api/v1/members/reviews`, {
    params: {
      page,
      size,
      sort,
      language,
    },
  });
  return res.data;
};

export const getUserLikedBeersApi = async (queryParam: BeersWithLanguage) => {
  const language: LANGUAGE_TYPE = LANGUAGE_TYPE.KR;
  const {page = 1, size = 10, sort = BeerSortEnum.MostLikes} = queryParam;
  const res = await axios.get(`/api/v1/members/beers`, {
    params: {
      page,
      size,
      sort,
      language,
    },
  });
  return res.data;
};

export const generateSocialLoginUrl = (provider: OAUTH_PROVIDER) => {
  return `https://beerlot-core-api-lopbi5pmwq-du.a.run.app/api/v1/auth/authorize/${provider}?redirect-url=${redirectUrl}`;
};
