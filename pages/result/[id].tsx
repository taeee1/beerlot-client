import { Box, Circle, Flex } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useState } from "react";
import styled from "styled-components";
import CardItem from "../../Components/Card/CardItem";
import { CardContainer } from "../../Components/Card/CardList/TwoByTwoCardList";
import SearchInputHome from "../../Components/Home/SearchInputHome";
import EmptyFilteredResult from "../../Components/Result/EmptyFilteredResult";
import SearchFilterList from "../../Components/Result/Filter/SearchFilterList/SearchFilterList";
import { EmptyFilter, WhiteFilter } from "../../public/svg";
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
  const [isFilterListOpen, setIsFilterListOpen] = useState<boolean>(true);
  const handleClick = () => {
    setIsFilterListOpen(!isFilterListOpen);
  };

  return (
    <Container>
      <Flex gap="10px" alignItems="center" onClick={handleClick} mb="24px">
        <SearchInputHome />

        <Circle size="31px" bg="Blue.100">
          {isFilterListOpen ? <WhiteFilter /> : <EmptyFilter />}
        </Circle>
      </Flex>

      <SearchFilterList
        onClick={handleClick}
        isFilterListOpen={isFilterListOpen}
      />

      {filteredItemList.length > 0 ? (
        <Box mt="15px">
          {filteredItemList.map((item) => {
            return (
              <CardContainer key={item.id}>
                <CardItem
                  isTwoByTwo
                  cardType={CardType.POPULAR}
                  beerName={item.beerName}
                  img_src={item.img_src}
                  sort={item.sort}
                  country={item.country}
                />
              </CardContainer>
            );
          })}
        </Box>
      ) : (
        <EmptyFilteredResult />
      )}
    </Container>
  );
};

export default SearchResultList;

export const Container = styled.div`
  padding: 24px;
`;
