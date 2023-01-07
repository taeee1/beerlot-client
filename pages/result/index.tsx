import {Box, Circle, Container, Flex} from "@chakra-ui/react";
import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import {LeftBackTitle} from "../../common/headers/LeftBackTitle";
import {
  CardType,
  MOCK_CARD_LIST,
  MOCK_CATEGORY_FILTER_LIST,
} from "../../interface/static";
import {
  CategoryFilterListType,
  CategoryTitleStatic,
} from "../../interface/types";
import {EmptyFilter, WhiteFilter} from "../../public/svg";
import CardItem from "../../src/card/CardItem";
import {CardContainer} from "../../src/card/CardList/TwoByTwoCardList";
import EmptyFilteredResult from "../../src/result/EmptyFilteredResult";
import SearchFilterList from "../../src/result/filter/search-filter-list/SearchFilterList";
import SearchInput from "../../src/search/SearchInput";

const SearchResultPage = () => {
  const router = useRouter();
  const {id} = router.query;
  const [isFilterListOpen, setIsFilterListOpen] = useState<boolean>(true);
  const [value, setValue] = useState<string>("");
  const [selectedFilters, setSelectedFilter] = useState<
    CategoryFilterListType[]
  >([{title: "정렬 기준", tags: ["a", "b"]}]);

  const clearValue = () => {
    setValue("");
  };

  const filteredItemList = MOCK_CARD_LIST.filter((item) => {
    if (!id) {
      return [];
    }
    return item.beerName.includes(id[0]);
  });

  const handleClickToggle = () => {
    setIsFilterListOpen(!isFilterListOpen);
  };

  // TODO: refactoring highly needed
  const handleClickTag = (targetTitle: string, targetTag: string) => {
    const selectedObjList = selectedFilters.filter(
      (item) => item.title === targetTitle
    );
    // new tag and title
    if (selectedObjList.length === 0) {
      const newSelectedFilters = [
        ...selectedFilters,
        {title: targetTitle, tags: [targetTag]},
      ];
      // TODO: fix problem
      // setSelectedFilter(newSelectedFilters);
      return;
    }

    const selectedTags = selectedObjList[0].tags;

    const newTags = selectedTags.includes(targetTag)
      ? selectedTags.filter((tag) => tag !== targetTag)
      : [...selectedTags, targetTag];
    const newSelectedFilters2 = selectedFilters.map((itemObj) => {
      if (itemObj.title === targetTitle) {
        return {title: targetTitle, tags: newTags};
      }
      return itemObj;
    });

    const newSelectedFilters3 = newSelectedFilters2.filter(
      (item) => item.tags.length > 0
    );
    // TODO: fix problem
    setSelectedFilter(newSelectedFilters3);
  };

  return (
    <Box w="full" h="full" bg="gray.100">
      <Container
        p={"0px"}
        h="full"
        w="full"
        bg="white"
        position="relative"
        maxW="450px"
      >
        <LeftBackTitle />
        <Box p={"68px 24px 24px"}>
          <Flex gap="10px" alignItems="center" mb="24px">
            <SearchInput clearValue={clearValue} />
            <Circle size="31px" bg="blue.100" onClick={handleClickToggle}>
              {isFilterListOpen ? <WhiteFilter /> : <EmptyFilter />}
            </Circle>
          </Flex>

          <SearchFilterList
            selectedFilters={selectedFilters}
            filterList={MOCK_CATEGORY_FILTER_LIST}
            isFilterListOpen={isFilterListOpen}
            onClickToggle={handleClickToggle}
            onClickTag={handleClickTag}
          />

          {filteredItemList.length > 0 ? (
            <Box mt="15px">
              {filteredItemList.map((item) => {
                return (
                  <CardContainer
                    key={item.id}
                    onClick={() => {
                      router.push(`/result/details?query=${item.beerName}`);
                    }}
                  >
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
        </Box>
      </Container>
    </Box>
  );
};

export default SearchResultPage;
