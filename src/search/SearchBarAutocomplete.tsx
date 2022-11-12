import { Box, Flex, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { beerItemType, MOCK_CARD_LIST } from "../../interface/static";
import EmptySearchResult from "./EmptySearchResult";
import SearchInput from "./SearchInput";

const SearchBarAutocomplete = () => {
  const [value, setValue] = useState("");
  const [selectedItems, setSelectedItems] = useState<beerItemType[]>([]);
  const router = useRouter();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setValue(e.target.value);
  const handleClick = (e: React.MouseEvent) => {
    const selectedName = e.currentTarget.textContent;
    router.push(`/result/${selectedName}`);
  };

  // MOCK_BEER_ITEM useMemo처리 안하면, VALUE한번 바꿀 때마다 mock_beer_info가 다시 RENDER됨.
  useEffect(() => {
    const newSelectedItems: beerItemType[] = MOCK_CARD_LIST.filter(
      (beerItems) => beerItems.beerName.includes(value)
    );
    setSelectedItems(newSelectedItems);
  }, [value]);

  const clearInput = () => {
    setValue("");
  };

  return (
    <Flex w="full" direction="column" borderRadius="20px" gap="10px" mt="14px">
      <SearchInput
        value={value}
        handleChange={handleChange}
        clearInput={clearInput}
      />

      <Flex flexDirection="column">
        <>
          {selectedItems.length > 0 ? (
            selectedItems.map((beerItems) => {
              return (
                <Box
                  borderBottom="1px solid"
                  borderColor="gray.200"
                  py="10px"
                  px="15px"
                  key={beerItems.id}
                >
                  <Text textStyle="h2" key={beerItems.id} onClick={handleClick}>
                    {beerItems.beerName}
                  </Text>
                </Box>
              );
            })
          ) : (
            <EmptySearchResult inputValue={value} />
          )}
        </>
      </Flex>
    </Flex>
  );
};

export default SearchBarAutocomplete;
