import {AxiosError} from "axios";
import {useEffect} from "react";
import {useQuery} from "react-query";
import {useRecoilState} from "recoil";
import styled from "styled-components";
import {RightBellHeader} from "../../common/headers/RightBell";
import {POPULAR_BEER_TITLE} from "../../interface/static";
import {BeerResultType, ErrorResponse} from "../../interface/types";
import {getTop10BeersAsync} from "../../server/api";
import CarouselCardList from "../card/card-list/CarouselCardList";
import TwoByTwoCardList from "../card/card-list/TwoByTwoCardList";
import {userInfoState, top10BeersState} from "../store/atom";
import SearchInputHome from "./SearchInputHome";
import WelcomeText from "./WelcomeText";

const HomeTemplate = () => {
  const [userInfo] = useRecoilState(userInfoState);
  const [top10Beers, setTop10Beers] = useRecoilState(top10BeersState);
  const popularBeers = useQuery<BeerResultType[], ErrorResponse>(
    "top10Beers",
    getTop10BeersAsync,
    {
      enabled: !userInfo,
      refetchOnWindowFocus: false,
      retry: 1,
      onSuccess: (data: BeerResultType[]) => {
        setTop10Beers(data);
      },
      onError: (error: ErrorResponse) => {
        console.error(error);
        // toast 처리
      },
    }
  );

  return (
    <Container>
      <RightBellHeader />

      <WelcomeText nickname={userInfo?.username} />

      <SearchInputHome />
      {userInfo ? (
        <>
          <CarouselCardList title={POPULAR_BEER_TITLE} />
          <CarouselCardList title={userInfo.username} />
        </>
      ) : (
        top10Beers && (
          <TwoByTwoCardList
            title={POPULAR_BEER_TITLE}
            itemList={top10Beers} // list단에 전부 내리는 게 맞다고 생각하지 않음.
          />
        )
      )}
    </Container>
  );
};

export default HomeTemplate;

export const Container = styled.div`
  padding: 24px;
  padding-top: 64px;
  width: 100%;
  height: 100%;
  position: absolute;
  background: white;
  max-width: 450px;
`;
