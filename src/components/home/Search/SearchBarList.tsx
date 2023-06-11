import {useUserInfoQuery} from "@/../hooks/query/useUserQuery";
import useKeyboard from "@/../hooks/useKeyboard";
import {BeerResponseType} from "@/../typedef/server/beer";
import EmptySearchResult from "@/components/search/EmptySearchResult";
import SearchInput from "@/components/search/SearchInput";
import {Box, Center, Flex, Text} from "@chakra-ui/react";
import axios from "axios";
import Cookies from "js-cookie";
import {debounce} from "lodash";
import {useRouter} from "next/router";
import React, {useEffect, useMemo, useState} from "react";
import {useMutation} from "react-query";
interface SearchBarListProps {
  handleClickItem?: (name: string, id: number) => void;
}
const SearchBarList: React.FC<SearchBarListProps> = ({handleClickItem}) => {
  const router = useRouter();
  const [value, setValue] = useState("");

  const [selectedItems, setSelectedItems] = useState([]);
  const isInputEmpty = value.length === 0;
  const accessToken = Cookies.get("beerlot-oauth-auth-request");
  const userQuery = useUserInfoQuery(accessToken ?? "");

  useEffect(() => {
    userQuery.refetch();
  }, []);

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
        <EmptySearchBox username={userQuery?.data?.username} />
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
interface EmptySearchBoxProps {
  username?: string;
}

const EmptySearchBox: React.FC<EmptySearchBoxProps> = ({username}) => {
  return (
    <Center mt={10} flexDir="column">
      {username && (
        <Box display="block">
          <Text display={"inline"} textStyle={"h3"} textColor={"orange.200"}>
            {username}
          </Text>
          <Text display={"inline"} textStyle={"h3"} textColor={"gray.300"}>
            님,
          </Text>
        </Box>
      )}
      <Text textStyle={"h3"} textColor={"gray.300"}>
        무얼 검색하러 오셨나요 👀?
      </Text>
    </Center>
  );
};
