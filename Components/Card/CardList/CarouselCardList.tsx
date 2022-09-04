import styled from "styled-components";
import { CardType, MOCK_CARD_LIST, POPULAR_BEER_TITLE } from "../../../Static";
import CardItem from "../CardItem";
import CardTitle from "../CardTitle";

interface CarouselCardListProps {
  title: string;
}

const CarouselCardList: React.FC<CarouselCardListProps> = ({ title }) => {
  const cardType =
    title === POPULAR_BEER_TITLE ? CardType.POPULAR : CardType.RECOMMEND;

  return (
    <Container>
      <CardTitle title={title} />
      <CardContainer>
        {MOCK_CARD_LIST.map((item) => {
          return (
            <CardItem
              isTwoByTwo={false}
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

const CardContainer = styled.div`
  display: flex;
  gap: 10px;
  overflow-x: auto;
`;

export const Container = styled.div`
  margin-top: 35px;
`;

export default CarouselCardList;
