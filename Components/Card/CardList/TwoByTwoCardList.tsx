import React from "react";
import styled from "styled-components";
import { beerItemType, CardType, POPULAR_BEER_TITLE } from "../../../Static";
import CardItem from "../CardItem";
import CardTitle from "../CardTitle";

interface TwoByTwoCardListProps {
  title: string;
  itemList: beerItemType[];
}

const TwoByTwoCardList: React.FC<TwoByTwoCardListProps> = ({
  title,
  itemList,
}) => {
  const cardType =
    title === POPULAR_BEER_TITLE ? CardType.POPULAR : CardType.RECOMMEND;

  return (
    <Container>
      <CardTitle title={title} />
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

export const CardContainer = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  justify-content: space-between;
`;

export const Container = styled.div`
  margin-top: 35px;
`;

export default TwoByTwoCardList;
