import React from "react";
import { WELCOME_MESSAGE_FIRST } from "../../Static";
import { WELCOME_MESSAGE_SECOND } from "../../Static";
import styled from "styled-components";

interface WelcomeTextProps {
  nickname: string;
  isLoggedIn: boolean;
}

const WelcomeText: React.FC<WelcomeTextProps> = ({ nickname, isLoggedIn }) => {
  return (
    <WelcomeTextContainer>
      <TextContainer>
        <p>{WELCOME_MESSAGE_FIRST}</p>
        {isLoggedIn && (
          <NickanameContainer>
            <Nickname>{nickname}</Nickname>
            <p> 님!</p>
          </NickanameContainer>
        )}
      </TextContainer>
      <TextContainer>
        <p>{WELCOME_MESSAGE_SECOND}</p>
      </TextContainer>
    </WelcomeTextContainer>
  );
};

export default WelcomeText;

const TextContainer = styled.div`
  font-family: "Roboto";
  font-weight: 700;
  margin: 10px 0px;
  font-size: 22px;

  color: rgba(0, 0, 0, 0.8);
  display: flex;
  padding: 2px 0px;
`;

const Nickname = styled.p`
  color: #fea801;
`;

const NickanameContainer = styled.div`
  display: flex;
  align-items: center;
`;

const WelcomeTextContainer = styled.div`
  margin: 8.4vh 0px 4.6vh;
`;
