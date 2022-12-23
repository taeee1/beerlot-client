import { Box, Text, VStack, Flex, SimpleGrid } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import FloatingButton from "../../../common/FloatingButton";
import BeerCard from "../../../common/headers/BeerCard";
import { MOCK_BEERS_SUGGESTION } from "../../../interface/static";
import CardItemChakra from "../../card/CardItemChakra";
import { chosenBeerIdsState } from "../../store/atom";

interface BeerCardsProps {
  nickName: string;
}

const BeerCards: React.FC<BeerCardsProps> = ({ nickName }) => {
  const [chosenBeerIds, setChosenBeerIds] = useRecoilState(chosenBeerIdsState);
  const isFullfilled = chosenBeerIds && chosenBeerIds.length > 0;
  const router = useRouter();
  const handleClick = () => {
    router.push("/");
  };

  const handleClickBeer = (newBeerId: number) => {
    let newChosenBeers = [...chosenBeerIds];
    if (newBeerId in chosenBeerIds) {
      newChosenBeers = newChosenBeers.filter((id) => id !== newBeerId);
    } else {
      newChosenBeers.push(newBeerId);
    }
    setChosenBeerIds(newChosenBeers);
  };

  const styleProps = {
    boxStyleProps: {
      p: "6px",
      border: "1px solid",
      borderColor: "orange.200",
      borderRadius: "10px",
    },
    nameProps: {},
    countryProps: {},
    sortProps: {},
    imageProps: {
      borderRadius: "6px",
      w: "92px",
      h: "110px",
    },
  };

  return (
    <VStack w="full" h="full" border="1px solid black">
      <FloatingButton
        disabled={!isFullfilled}
        text="완료!"
        onClick={handleClick}
        bgColor={isFullfilled ? "orange.200" : "gray.200"}
        textColor={isFullfilled ? "white.100" : "black.100"}
        boxShadow={isFullfilled ? "0px 8px 16px rgba(0, 0, 0, 0.3)" : "none"}
      />
      <VStack gap={"25px"} p={0} pb={"25px"} alignItems="start">
        <VStack pt={"64px"} textStyle="h1" gap="5px" alignItems="start">
          <Box p={0}>
            <Text as="span" textColor="orange.200">
              {nickName}
            </Text>
            <Text as="span">님의 최애맥주</Text>
          </Box>
          <Box>
            <Text> N개를 골라주세요!</Text>
          </Box>
          <Box>
            <Text fontSize="12px" textColor="gray.300">
              고른 맥주를 바탕으로 취향 분석 후, 맥주를 추천해드릴게요 :)
            </Text>
          </Box>
        </VStack>
        <SimpleGrid
          columns={3}
          spacingX="10px"
          spacingY="25px"
          border="1px solid black"
        >
          {[
            MOCK_BEERS_SUGGESTION,
            MOCK_BEERS_SUGGESTION,
            MOCK_BEERS_SUGGESTION,
            MOCK_BEERS_SUGGESTION,
            MOCK_BEERS_SUGGESTION,
            MOCK_BEERS_SUGGESTION,
          ].map((item, idx) => {
            return (
              <Box key={idx} onClick={() => handleClickBeer(item.id)}>
                <BeerCard
                  beerName={item.name_ko}
                  img_src={item.image_url}
                  country={item.country}
                  sort={item.category.name_ko}
                  beerId={item.id}
                  styleProps={styleProps}
                />
              </Box>
            );
          })}
        </SimpleGrid>
      </VStack>
    </VStack>
  );
};

export default BeerCards;
