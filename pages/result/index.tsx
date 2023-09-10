import { useBeersQuery } from "@/../hooks/query/useBeerQuery";
import { generateBeerDetailUrl } from "@/../utils/url";
import { CommonBeerImage } from "@/components/shared/CommonBeerImage/CommonBeerImage";
import {
  Box,
  Circle,
  Container,
  Flex,
  HStack,
  SimpleGrid,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { MOCK_CATEGORY_FILTER_LIST } from "../../interface/static";
import { CategoryFilterListType, CategoryTitle } from "../../interface/types";
import { EmptyFilter, WhiteFilter } from "../../public/svg";
import { SearchFilterList } from "../../src/components/result/filter/search-filter-list/SearchFilterList";
import SearchInput from "../../src/components/search/SearchInput";
import {
  BeerCard,
  BeerCardBody,
  BeerCardFooter,
  BeerCategoryTag,
  BeerCategoryTagLabel,
  BeerCountryText,
  BeerNameText,
} from "../../src/components/shared/Card/BeerCardItem";
import { LeftBackTitle } from "../../src/components/shared/Headers/LeftBackTitle";
import { useFetcBeerSearchCategoriesQuery } from "../../hooks/query/useFilterQuery";

const SearchResultPage = () => {
  const router = useRouter();
  const { query } = router.query;
  const [isFilterListOpen, setIsFilterListOpen] = useState<boolean>(true);
  const [value, setValue] = useState<string>("");
  const [selectedFilters, setSelectedFilter] = useState<
    CategoryFilterListType[]
  >([]);
  const { data, refetch } = useFetcBeerSearchCategoriesQuery();

  useEffect(() => {
    refetch();
  }, [refetch]);

  const SearchBeerQuery = useBeersQuery({
    keyword: typeof query === "string" ? query : "",
  });

  useEffect(() => {
    SearchBeerQuery.refetch();
  }, []);

  const clearValue = () => {
    setValue("");
  };
  const handleFocus = () => {
    router.push("/search");
  };

  const handleClickToggle = () => {
    setIsFilterListOpen(!isFilterListOpen);
  };

  const handleClickCard = useCallback(
    (id: number, name: string) => {
      const url = generateBeerDetailUrl(id, name);
      router.push(url);
    },
    [router]
  );

  const handleClickTag = (targetTitle: CategoryTitle, targetTag: string) => {
    const isSingleMode = targetTitle === CategoryTitle.SORT_CRITERIA;

    const selectedObjList = selectedFilters.find(
      (item) => item.title === targetTitle
    );

    if (selectedObjList === undefined) {
      setSelectedFilter([
        ...selectedFilters,
        { title: targetTitle, tags: [targetTag] },
      ]);

      return;
    }

    if (isSingleMode) {
      const newSelectedFilter = selectedFilters.map((obj) => {
        if (obj.title === targetTitle) {
          return { title: targetTitle, tags: [targetTag] };
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
          return { title: targetTitle, tags: [...newSelectedTagList] };
        }
        return obj;
      });
      setSelectedFilter(newSelectedFilter);
      return;
    }

    const newSelectedTagList = [...selectedObjList.tags, targetTag];
    const newSelectedFilter = selectedFilters.map((obj) => {
      if (obj.title === targetTitle) {
        return { title: targetTitle, tags: [...newSelectedTagList] };
      }
      return obj;
    });
    setSelectedFilter(newSelectedFilter);
  };

  return (
    <Box w="full" h="full" bg="gray.100" overflowY="scroll">
      <Container
        p={"0px"}
        w="full"
        bg="white"
        position="relative"
        maxW="450px"
        h="full"
      >
        <LeftBackTitle />
        <Box p={"68px 24px 24px"} h="full">
          <Flex gap="10px" alignItems="center" mb="10px" cursor={"pointer"}>
            <SearchInput
              clearValue={clearValue}
              onFocus={handleFocus}
              autoFocus={false}
            />
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
            {SearchBeerQuery.data?.contents?.map((beerItems: any) => {
              const { id, name, origin_country, image_url, category } =
                beerItems;
              return (
                <BeerCard
                  key={beerItems.id}
                  mt={1}
                  w="full"
                  onClick={() => handleClickCard(id, name)}
                >
                  <BeerCardBody w="full" h="full" position={"relative"}>
                    <Box position="relative">
                      {image_url && (
                        <CommonBeerImage
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
                      <BeerCountryText country={origin_country} />
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
