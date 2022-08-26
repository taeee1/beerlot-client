import React from "react";
import styled from "styled-components";
import {
  beerItemType,
  CardType,
  MOCK_CARD_LIST,
  POPULAR_BEER_TITLE,
  RECOMMENDED_BEER_TITLE_1,
} from "../../Static";
import CardItem from "./CardItem";

interface TwoByTwoCardProps {
  title: string;
  itemList: beerItemType[];
}

const TwoByTwoCard: React.FC<TwoByTwoCardProps> = ({ title, itemList }) => {
  const cardType =
    title === POPULAR_BEER_TITLE ? CardType.POPULAR : CardType.RECOMMEND;

  return (
    <Container>
      {/* TODO: 리팩토링 하면서 title 하나로 통일하고 컴포넌트 쪼개는 단위 바꾸기 */}
      {cardType === CardType.POPULAR ? (
        <PopularTitle>{title}</PopularTitle>
      ) : (
        <TitleContainer>
          <PopularTitle>{RECOMMENDED_BEER_TITLE_1}</PopularTitle>
          <RecommendTitle>{title}</RecommendTitle>
          <PopularTitle>{RECOMMENDED_BEER_TITLE_1}</PopularTitle>
        </TitleContainer>
      )}
      <CardContainer>
        {itemList.map((item) => {
          return (
            <CardItem
              isTwoByTwo
              cardType={cardType}
              key={item.id}
              beerName={item.beerName}
              img_src={item.img_src}
              sort={item.sort}
              country={item.country}
            />
          );
        })}
      </CardContainer>
    </Container>
  );
};

export const TitleContainer = styled.div`
  display: flex;
`;

export const CardContainer = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
`;

export const Container = styled.div`
  margin-top: 35px;
`;

export const PopularTitle = styled.p`
  margin-bottom: 10px;

  font-family: "Roboto";
  font-weight: 700;

  color: rgba(0, 0, 0, 0.8);
`;
export const RecommendTitle = styled.p`
  margin-bottom: 10px;

  font-family: "Roboto";
  font-weight: 700;

  color: #fea801;
`;

export default TwoByTwoCard;
