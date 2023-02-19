import {Box, Container, Flex, Text} from "@chakra-ui/react";
import {VStack} from "@chakra-ui/react";
import axios from "axios";
import _, {debounce} from "lodash";
import {useRouter} from "next/router";
import React, {useEffect, useMemo, useState} from "react";
import {useMutation} from "react-query";
import {LeftBackTitle} from "../../common/headers/LeftBackTitle";
import useKeyboard from "../../hooks/useKeyboard";
import {useSearch} from "../../hooks/useSearch";
import EmptySearchResult from "./EmptySearchResult";
import SearchInput from "./SearchInput";

const SearchBarTemplate = () => {
  const router = useRouter();
  const [value, setValue] = useState("");
  const [selectedItems, setSelectedItems] = useState([]);
  const {isInputEmpty} = useSearch(value);
  const searchBeer = useMutation((keyword: string) =>
    axios.get(
      `/api/v1/beers?keyword=${keyword}&page=1&size=10&sort=MOST_LIKES&language=KR`
    )
  );

  const {isEnterKey} = useKeyboard();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    debouncedSearch(e.target.value);
  };

  const debouncedSearch = useMemo(
    () =>
      debounce((value) => {
        setValue(value);
        searchBeer.mutate(value);
      }, 200),
    [searchBeer]
  );

  const handleClickItem = (id: number, name: string) => {
    router.push(`/result/details?id=${id}&name=${name}`);
  };

  const clearValue = () => {
    setValue("");
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (isEnterKey(e)) {
      // router.push(`/result/${e.target.value}`);

      router.push(`/result?query=${e.target.value}`);
    }
  };

  useEffect(() => {
    console.log("searchBeer", searchBeer.data?.data.contents);
    const newSelectedItem = searchBeer.data?.data.contents;
    setSelectedItems(newSelectedItem);
  }, [searchBeer, searchBeer.data?.data.contents]);

  return (
    <Box w="full" h="full" bg="gray.100">
      <Container h="full" w="full" bg="white" position="relative" maxW="450px">
        <VStack pt="64px">
          <LeftBackTitle />
          <Flex
            h="full"
            w="full"
            direction="column"
            borderRadius="20px"
            gap="10px"
            mt="14px"
          >
            <SearchInput
              onKeyPress={handleKeyPress}
              onChange={handleChange}
              clearValue={clearValue}
            />
            {isInputEmpty ? (
              <Box w="full" h="full" />
            ) : (
              <Flex flexDirection="column" h="full" w="full">
                <>
                  {selectedItems?.length > 0 ? (
                    selectedItems.map((beerItems: any) => {
                      return (
                        <Box
                          borderBottom="1px solid"
                          borderColor="gray.200"
                          py="10px"
                          px="15px"
                          key={beerItems.id}
                          onClick={() =>
                            handleClickItem(beerItems.id, beerItems.name)
                          }
                          cursor="pointer"
                        >
                          <Text textStyle="h2" key={beerItems.id}>
                            {beerItems.name}
                          </Text>
                        </Box>
                      );
                    })
                  ) : (
                    <EmptySearchResult inputValue={value} />
                  )}
                </>
              </Flex>
            )}
          </Flex>
        </VStack>
      </Container>
    </Box>
  );
};

export default SearchBarTemplate;
