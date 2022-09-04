import styled from "styled-components";
import {
  CardType,
  RECOMMENDED_BEER_TITLE_1,
  RECOMMENDED_BEER_TITLE_2,
  POPULAR_BEER_TITLE,
} from "../../Static";

interface CardProps {
  title: string;
}
const CardTitle: React.FC<CardProps> = ({ title }) => {
  const cardType =
    title === POPULAR_BEER_TITLE ? CardType.POPULAR : CardType.RECOMMEND;

  return (
    <>
      {cardType === CardType.POPULAR ? (
        <PopularTitle>{title}</PopularTitle>
      ) : (
        <TitleContainer>
          <PopularTitle>{RECOMMENDED_BEER_TITLE_1}</PopularTitle>
          <RecommendTitle>{title}</RecommendTitle>
          <PopularTitle>{RECOMMENDED_BEER_TITLE_2}</PopularTitle>
        </TitleContainer>
      )}
    </>
  );
};

export default CardTitle;

export const PopularTitle = styled.p`
  margin-bottom: 10px;

  font-family: "Roboto";
  font-weight: 700;

  color: rgba(0, 0, 0, 0.8);
`;

export const TitleContainer = styled.div`
  display: flex;
`;
export const RecommendTitle = styled.p`
  margin-bottom: 10px;

  font-family: "Roboto";
  font-weight: 700;

  color: #fea801;
`;
