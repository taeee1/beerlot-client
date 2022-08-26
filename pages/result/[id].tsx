import { useRouter } from "next/router";
import TwoByTwoCard from "../../Components/Home/TwoByTwoCard";
import { beerItemType, MOCK_CARD_LIST, POPULAR_BEER_TITLE } from "../../Static";
import styled from "styled-components";

// TODO: 혼자 hierarchy가 안맞음. 한번 더 래핑해야 함.
const SearchResultList = () => {
  const router = useRouter();
  const { id } = router.query;
  const filteredItemList = MOCK_CARD_LIST.filter((item) => {
    if (!id) {
      return [];
    }
    return item.beerName.includes(id[0]);
  });

  //   console.log(index);
  return (
    <Container>
      <p>현재 검색된 맥주는 {id} </p>
      <TwoByTwoCard title={POPULAR_BEER_TITLE} itemList={filteredItemList} />
    </Container>
  );
};

export default SearchResultList;

export const Container = styled.div`
  padding: 24px;
`;
