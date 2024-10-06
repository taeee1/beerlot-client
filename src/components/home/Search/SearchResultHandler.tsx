import EmptySearchResult from "@/components/search/EmptySearchResult";
import { Box, Center, Text } from "@chakra-ui/react";
import React from "react";
import { BeerResponseType } from "../../../../types/beer";
import { SearchPromptBox } from "./SearchPromptBox";
import { BeerlotLoading } from "@/components/shared/Loading";

interface SearchResultHandlerProps {
  input: string;
  username?: string;
  searchResult?: BeerResponseType[];
  isLoading?: boolean;
  onClickBeerCard?: (name: string, id: number) => void;
}

export const SearchResultHandler: React.FC<SearchResultHandlerProps> = ({
  input,
  username,
  searchResult,
  isLoading,
  onClickBeerCard,
}) => {
  if (isLoading)
    return (
      <Center mx={"auto"} py={48}>
        <BeerlotLoading />
      </Center>
    );

  if (input.length == 0) return <SearchPromptBox username={username} />;

  if (searchResult?.length === 0)
    return <EmptySearchResult inputValue={input} />;

  return (
    <>
      {searchResult?.map((beerItems: BeerResponseType) => {
        return (
          <Box
            borderBottom="1px solid"
            borderColor="gray.200"
            py="10px"
            px="15px"
            key={beerItems.id}
            onClick={() => {
              if (beerItems.id && beerItems.name) {
                onClickBeerCard?.(beerItems.name, beerItems.id);
              }
            }}
            cursor="pointer"
          >
            <Text textStyle="h2" key={beerItems.id}>
              {beerItems.name}
            </Text>
          </Box>
        );
      })}
    </>
  );
};
