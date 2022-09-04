import { useRouter } from "next/router";
import styled from "styled-components";
import CardItem from "../../Components/Card/CardItem";
import { CardContainer } from "../../Components/Card/CardList/TwoByTwoCardList";
import { CardType, MOCK_CARD_LIST } from "../../Static";

const SearchResultList = () => {
  const router = useRouter();
  const { id } = router.query;
  const filteredItemList = MOCK_CARD_LIST.filter((item) => {
    if (!id) {
      return [];
    }
    return item.beerName.includes(id[0]);
  });

  return (
    <Container>
      <p>현재 검색된 맥주는 {id} </p>
      <CardContainer>
        {filteredItemList.map((item) => {
          return (
            <CardItem
              isTwoByTwo
              cardType={CardType.POPULAR}
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

export default SearchResultList;

export const Container = styled.div`
  padding: 24px;
`;
