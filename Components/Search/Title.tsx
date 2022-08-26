import { useRouter } from "next/router";
import React from "react";
import styled from "styled-components";
import { BEERLOT_TITLE } from "../../Static";

const Title = () => {
  const router = useRouter();
  const handleClick = () => {
    router.push(`/`);
  };

  return (
    <TitleContainer onClick={handleClick}>
      <BackIcon></BackIcon>
      <TitleText>{BEERLOT_TITLE}</TitleText>
    </TitleContainer>
  );
};

const TitleContainer = styled.div`
  height: 40px;
  padding: 0px 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const BackIcon = styled.div`
  height: 40px;
`;

const TitleText = styled.p`
  font-family: "Roboto";
  font-weight: 700;
  color: black;
  text-shadow: 0px 8px 20px rgba(0, 0, 0, 0.4);
`;

export default Title;
