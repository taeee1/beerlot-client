import {Box, Circle, Container, Flex} from "@chakra-ui/react";
import {useRouter} from "next/router";
import {useState} from "react";
import {
  CardType,
  MOCK_CARD_LIST,
  MOCK_CATEGORY_FILTER_LIST,
} from "../../interface/static";
import {CategoryFilterListType, CategoryTitle} from "../../interface/types";
import {EmptyFilter, WhiteFilter} from "../../public/svg";
import CardItem, {CardContainer} from "../../src/card/CardItem";
import EmptyFilteredResult from "../../src/result/EmptyFilteredResult";
import {SearchFilterList} from "../../src/result/filter/search-filter-list/SearchFilterList";
import SearchInput from "../../src/search/SearchInput";
import {LeftBackTitle} from "../../src/shared/Headers/LeftBackTitle";

const SearchResultPage = () => {
  const router = useRouter();
  const {id} = router.query;
  const [isFilterListOpen, setIsFilterListOpen] = useState<boolean>(true);
  const [value, setValue] = useState<string>("");
  const [selectedFilters, setSelectedFilter] = useState<
    CategoryFilterListType[]
  >([]);

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

  const handleClickTag = (targetTitle: CategoryTitle, targetTag: string) => {
    const isSingleMode = targetTitle === CategoryTitle.SORT_CRITERIA;

    const selectedObjList = selectedFilters.find(
      (item) => item.title === targetTitle
    );

    if (selectedObjList === undefined) {
      setSelectedFilter([
        ...selectedFilters,
        {title: targetTitle, tags: [targetTag]},
      ]);

      return;
    }

    if (isSingleMode) {
      const newSelectedFilter = selectedFilters.map((obj) => {
        if (obj.title === targetTitle) {
          return {title: targetTitle, tags: [targetTag]};
        }
        return obj;
      });

      setSelectedFilter(newSelectedFilter);

      return;
    }

    const isSelectedTag = selectedObjList.tags.includes(targetTag);
    if (isSelectedTag) {
      const newSelectedTagList = selectedObjList.tags.filter(
        (tag) => tag !== targetTag
      );
      const newSelectedFilter = selectedFilters.map((obj) => {
        if (obj.title === targetTitle) {
          return {title: targetTitle, tags: [...newSelectedTagList]};
        }
        return obj;
      });
      setSelectedFilter(newSelectedFilter);
      return;
    }

    const newSelectedTagList = [...selectedObjList.tags, targetTag];
    const newSelectedFilter = selectedFilters.map((obj) => {
      if (obj.title === targetTitle) {
        return {title: targetTitle, tags: [...newSelectedTagList]};
      }
      return obj;
    });
    setSelectedFilter(newSelectedFilter);
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
          <Flex gap="10px" alignItems="center" mb="10px" cursor={"pointer"}>
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
                  <Box key={item.id}>
                    {/* <CardContainer
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
                    </CardContainer> */}
                  </Box>
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
