import React, {useState} from "react";

import styled from "styled-components";
import {CardType} from "../../../interface/static";
import {LikeButton} from "../shared/LikeButton";

interface CardItemProps {
  isTwoByTwo: boolean;
  beerName: string;
  img_src: string;
  sort: string;
  country: string;
  cardType: CardType;
}

const CardItem: React.FC<CardItemProps> = ({
  beerName,
  img_src,
  sort,
  country,
  cardType,
  isTwoByTwo,
}) => {
  const color = cardType === CardType.POPULAR ? "orange.300" : "orange.200";
  const [isClicked, setIsClicked] = useState(false);
  const handleClick = () => {
    setIsClicked(!isClicked);
  };

  return (
    <>
      <CardContainer color={color}>
        <LikeButton
          isClicked={isClicked}
          onClick={handleClick}
          position="absolute"
          top="12px"
          right="12px"
          w="27px"
          h="29px"
          filter={
            isClicked ? "none" : "drop-shadow(1px 1px 1px rgba(0, 0, 0, 0.5))"
          }
          color={isClicked ? "orange.300" : "#ffffff"}
        />
        <CardImage src={img_src} alt={beerName} isTwoByTwo={isTwoByTwo} />

        <CardTextContainer>
          <NameP>{beerName}</NameP>
        </CardTextContainer>
        <CardTextContainer>
          <p>{country}</p>
          <SortContainer color={color}>
            <SortP>{sort}</SortP>
          </SortContainer>
        </CardTextContainer>
      </CardContainer>
    </>
  );
};

export default CardItem;

export const SortContainer = styled.div<{color: string}>`
  padding: 0px 5px;
  background: ${({color}) => color};
  border-radius: 20px;
  display: flex;
  align-items: center;
`;

export const NameP = styled.p`
  font-family: "Roboto";
  font-size: 12px;
  color: rgba(0, 0, 0, 0.8);
`;

export const SortP = styled.p`
  font-family: "Roboto";
  font-size: 12px;
  color: #fdf9ea;
`;

//TODO: 색상 지정
export const CardContainer = styled.div<{color: string}>`
  padding: 8px;
  position: relative;
  border: ${({color}) => `${color} solid 1px`};
  border-radius: 11px;
  display: flex;
  flex-direction: column;
  flex: 0 0 auto;
  gap: 5px;
`;

{
  /* TODO: 이렇게 width잡으면 안 좋음 375미만에서 깨짐 */
}
export const CardImage = styled.img<{isTwoByTwo: boolean}>`
  border-radius: 7px;
  width: ${(isTwoByTwo) => (isTwoByTwo ? `37vw` : `30vw`)};
  height: ${(isTwoByTwo) => (isTwoByTwo ? `37vw` : `30vw`)};
`;

export const CardTextContainer = styled.div`
  display: flex;
  align-items: center;
`;
