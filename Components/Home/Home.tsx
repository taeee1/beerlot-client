import { useEffect, useState } from "react";
import styled from "styled-components";
import { getAllBeers } from "../../server/api";
import { POPULAR_BEER_TITLE } from "../../Static";
import { BeerResultType } from "../../types";
import TempLogin from "../Auth/TempLogin";
import CarouselCardList from "../Card/CardList/CarouselCardList";
import TwoByTwoCardList from "../Card/CardList/TwoByTwoCardList";
import SearchInputHome from "./SearchInputHome";
import WelcomeText from "./WelcomeText";

const HomeComponent = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userNickname, setUserNickname] = useState("");
  const [allBeers, setAllBeers] = useState<BeerResultType[]>([]);

  const handleLogin = () => {
    setIsLoggedIn(!isLoggedIn);
  };

  const handleUserName = (newUserName: string) => {
    setUserNickname(newUserName);
  };

  const handleInfo = async (index: number) => {
    const beers = await getAllBeers(index);
    return beers;
  };

  const handleSetAllBeers = async () => {
    const allBeers = await Promise.all(
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0].map((index) => {
        return handleInfo(index + 1);
      })
    );
    if (allBeers) {
      setAllBeers(allBeers);
    }
  };

  useEffect(() => {
    handleSetAllBeers();
  }, []);

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
        <TwoByTwoCardList
          title={POPULAR_BEER_TITLE}
          itemList={allBeers} // list단에 전부 내리는 게 맞다고 생각하지 않음.
        />
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
