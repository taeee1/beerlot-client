import React, {useEffect, useMemo, useState} from "react";
import {Box, Container, Flex, Text} from "@chakra-ui/react";
import {useRouter} from "next/router";
import SearchInput from "@/components/search/SearchInput";
import _, {debounce} from "lodash";
import axios from "axios";
import {useMutation} from "react-query";
import useKeyboard from "@/../hooks/useKeyboard";
import EmptySearchResult from "@/components/search/EmptySearchResult";
import {BeerResponseType} from "@/../typedef/server/beer";

interface SearchBarListProps {
  handleClickItem?: (name: string, id?: number) => void;
}
const SearchBarList: React.FC<SearchBarListProps> = ({handleClickItem}) => {
  const router = useRouter();
  const [value, setValue] = useState("");

  const [selectedItems, setSelectedItems] = useState([]);
  const isInputEmpty = value.length === 0;

  const searchBeer = useMutation((keyword: string) =>
    axios.get(
      `/api/v1/beers?keyword=${keyword}&page=1&size=10&sort=MOST_LIKES&language=KR`
    )
  );
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    debouncedSearch(e.target.value);
  };
  const {isEnterKey} = useKeyboard();
  const clearValue = () => {
    setValue("");
  };
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (isEnterKey(e)) {
      // router.push(`/result/${e.target.value}`);

      router.push(`/result?query=${e.target.value}`);
    }
  };

  const debouncedSearch = useMemo(
    () =>
      debounce((value) => {
        setValue(value);
        searchBeer.mutate(value);
      }, 200),
    [searchBeer]
  );

  useEffect(() => {
    const newSelectedItem = searchBeer.data?.data.contents;
    setSelectedItems(newSelectedItem);
  }, [searchBeer, searchBeer.data?.data.contents]);

  return (
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
              selectedItems.map((beerItems: BeerResponseType) => {
                return (
                  <Box
                    borderBottom="1px solid"
                    borderColor="gray.200"
                    py="10px"
                    px="15px"
                    key={beerItems.id}
                    onClick={() => {
                      if (beerItems.id && beerItems.name) {
                        handleClickItem?.(beerItems.name, beerItems.id);
                      }
                    }}
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
  );
};

export {SearchBarList};
