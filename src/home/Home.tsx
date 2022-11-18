import React, { useEffect, useState } from "react";
import { Loadable, useRecoilValue, useRecoilValueLoadable } from "recoil";
import styled from "styled-components";
import { POPULAR_BEER_TITLE } from "../../interface/static";
import { BeerResultType, RecoilState } from "../../interface/types";
import TempLogin from "../auth/sign-in/TempLogin";
import CarouselCardList from "../card/card-list/CarouselCardList";
import TwoByTwoCardList from "../card/card-list/TwoByTwoCardList";
import { popularBeerState } from "../store/selector";
import SearchInputHome from "./SearchInputHome";
import WelcomeText from "./WelcomeText";

const HomeComponent = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userNickname, setUserNickname] = useState("");
  const allBeers: Loadable<BeerResultType> =
    useRecoilValueLoadable(popularBeerState);
  // TODO: any 타입 없애야 함.
  const { contents, state }: { contents: any; state: RecoilState } = allBeers;
  const handleLogin = () => {
    setIsLoggedIn(!isLoggedIn);
  };

  // const allBeers = {
  //   id: 1,
  //   name_ko: "빅 웨이브",
  //   name_en: "Bigwave",
  //   description:
  //     "미묘한 과일 향과 섬세한 홉 향이 나는 가벼운 골든 에일입니다. 부드럽고 마시기 좋은 상쾌한 에일입니다. 가볍게 볶은 허니 몰트는 이 맥주의 황금빛 색조에 기여하고 우리의 특별한 홉 블렌드로 균형을 이루는 약간의 단맛을 제공합니다.",
  //   country: {
  //     code: "US",
  //     name_ko: "미국",
  //     name_en: "The United States",
  //   },
  //   volume: 4.4,
  //   image_url: "returned_from_server: <base_url>/<file_name>",
  //   category: {
  //     id: 1,
  //     name_ko: "아메리칸 블론드 에일",
  //     name_en: "American Blonde Ale",
  //     description: "아메리칸 블론드 에일은...",
  //     parent: {
  //       id: 10,
  //       name_ko: "에일",
  //       name_en: "Ale",
  //       description: "에일은...",
  //     },
  //   },
  //   tags: [
  //     {
  //       id: 1,
  //       name_ko: "시트라",
  //       name_en: "Citra",
  //       description: "시트라 홉은...",
  //     },
  //   ],
  //   like_count: 13,
  //   review_count: 2,
  //   rate: 4.25,
  // };

  const handleUserName = (newUserName: string) => {
    setUserNickname(newUserName);
  };

  return (
    <Container>
      <TempLogin
        handleLogin={handleLogin}
        handleUserName={handleUserName}
        isLoggedIn={isLoggedIn}
        userNickname={userNickname}
      />
      <WelcomeText nickname={userNickname} isLoggedIn={isLoggedIn} />
      <SearchInputHome />
      {isLoggedIn ? (
        <>
          <CarouselCardList title={POPULAR_BEER_TITLE} />
          <CarouselCardList title={userNickname} />
        </>
      ) : (
        state === "hasValue" && (
          <TwoByTwoCardList
            title={POPULAR_BEER_TITLE}
            itemList={[contents]} // list단에 전부 내리는 게 맞다고 생각하지 않음.
          />
        )
      )}
    </Container>
  );
};

export default HomeComponent;

export const Container = styled.div`
  padding: 24px;
  background: white;
  max-width: 450px;
`;
