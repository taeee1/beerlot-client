import React from "react";
import { WELCOME_MESSAGE_FIRST } from "../../interface/static";
import { WELCOME_MESSAGE_SECOND } from "../../interface/static";
import styled from "styled-components";

interface WelcomeTextProps {
  nickname?: string;
}

const WelcomeText: React.FC<WelcomeTextProps> = ({ nickname }) => {
  return (
    <WelcomeTextContainer>
      <TextContainer>
        <p>{WELCOME_MESSAGE_FIRST}</p>
        {nickname && (
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

const WelcomeTextContainer = styled.div``;
