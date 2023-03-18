import {
  Box,
  Circle,
  Container,
  Flex,
  HStack,
  SimpleGrid,
} from "@chakra-ui/react";
import Image from "next/image";
import {useRouter} from "next/router";
import {useCallback, useEffect, useState} from "react";
import {MOCK_CATEGORY_FILTER_LIST} from "../../interface/static";
import {CategoryFilterListType, CategoryTitle} from "../../interface/types";
import {EmptyFilter, WhiteFilter} from "../../public/svg";
import {getBeersWithKeywordApi} from "../../src/api/beers/api";
import {mockData} from "../../src/components/home/HomeTemplate";
import {SearchFilterList} from "../../src/components/result/filter/search-filter-list/SearchFilterList";
import SearchInput from "../../src/components/search/SearchInput";
import {
  BeerCard,
  BeerCardBody,
  BeerCardFooter,
  BeerCategoryTag,
  BeerCategoryTagLabel,
  BeerNameText,
} from "../../src/components/shared/Card/BeerCardItem";
import {LeftBackTitle} from "../../src/components/shared/Headers/LeftBackTitle";

const SearchResultPage = () => {
  const router = useRouter();
  const {query} = router.query;
  const [isFilterListOpen, setIsFilterListOpen] = useState<boolean>(true);
  const [value, setValue] = useState<string>("");
  const [selectedFilters, setSelectedFilter] = useState<
    CategoryFilterListType[]
  >([]);
  const [beers, setBeers] = useState([]);
  useEffect(() => console.log("beers", beers), [beers]);
  const allKeywordAsync = useCallback(async (keyword: string) => {
    const res = await getBeersWithKeywordApi({keyword});
    setBeers(res?.data.contents);
  }, []);

  useEffect(() => {
    if (typeof query !== "string") return;
    allKeywordAsync(query);
  }, [allKeywordAsync, query]);

  const clearValue = () => {
    setValue("");
  };

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
    <Box w="full" h="full" bg="gray.100" overflowY="scroll">
      <Container p={"0px"} w="full" bg="white" position="relative" maxW="450px">
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
          <SimpleGrid columns={2} spacing={"16px"} mt={"8px"}>
            {beers &&
              [mockData, mockData, mockData].map((beerItems: any) => {
                const {name, origin_country, image_url, category} = beerItems;
                return (
                  <BeerCard key={beerItems.id} mt={1} w="full">
                    <BeerCardBody w="full" h="full" position={"relative"}>
                      <Box position="relative">
                        {image_url && (
                          <Image
                            src={image_url}
                            alt={name}
                            width="175px"
                            height="175px"
                            objectFit="cover"
                          />
                        )}
                      </Box>
                    </BeerCardBody>
                    <BeerCardFooter>
                      <BeerNameText>{name}</BeerNameText>
                      <HStack>
                        <BeerNameText>{origin_country}</BeerNameText>
                        <BeerCategoryTag>
                          <BeerCategoryTagLabel>
                            {category?.name}
                          </BeerCategoryTagLabel>
                        </BeerCategoryTag>
                      </HStack>
                    </BeerCardFooter>
                  </BeerCard>
                );
              })}
          </SimpleGrid>
          <Box h="64px" />
        </Box>
      </Container>
    </Box>
  );
};

export default SearchResultPage;

// {filteredItemList.length > 0 ? (
//   <Box mt="15px">
//     {filteredItemList.map((item) => {
//       return (
//         <Box key={item.id}>
//           {/* <CardContainer
//             key={item.id}
//             onClick={() => {
//               router.push(`/result/details?query=${item.beerName}`);
//             }}
//           >
//             <CardItem
//               isTwoByTwo
//               cardType={CardType.POPULAR}
//               beerName={item.beerName}
//               img_src={item.img_src}
//               sort={item.sort}
//               country={item.country}
//             />
//           </CardContainer> */}
//         </Box>
//       );
//     })}
//   </Box>
// ) : (
//   <EmptyFilteredResult />
// )}
