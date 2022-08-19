import { POPULAR_BEER_TITLE } from "../../Static";
import Card from "./Card";
import SearchBar from "./SearchBar";
import WelcomeText from "./WelcomeText";
import styled from "styled-components";
import TwoByTwoCard from "./TwoByTwoCard";
import { useState } from "react";

const HomeComponent = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userNickname, setuserNickname] = useState("");

  const handleKeypress = (e: React.KeyboardEvent) => {
    setIsLoggedIn(!isLoggedIn);
  };

  return (
    <Container>
      {isLoggedIn ? (
        <>
          <span>{`${userNickname}님 로그인 됨`}</span>
          <button
            onClick={() => {
              setIsLoggedIn(!isLoggedIn);
              setuserNickname("");
            }}
          >
            로그아웃 하기
          </button>
        </>
      ) : (
        <form>
          <input
            onChange={(e) => {
              setuserNickname(e.target.value);
            }}
            value={userNickname}
          />
          <button
            onKeyPress={handleKeypress}
            onClick={() => {
              setIsLoggedIn(!isLoggedIn);
            }}
          >
            로그인하기
          </button>
        </form>
      )}

      <WelcomeText nickname={userNickname} isLoggedIn={isLoggedIn} />
      <SearchBar />
      {isLoggedIn ? (
        <>
          <Card title={POPULAR_BEER_TITLE} />
          <Card title={userNickname} />
        </>
      ) : (
        <TwoByTwoCard />
      )}
    </Container>
  );
};

export default HomeComponent;

export const Container = styled.div`
  padding: 24px;
`;
