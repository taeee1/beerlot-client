import {
  Box,
  Center,
  Container,
  Divider,
  HStack,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { LeftBackBeerNameRightHeart } from "../../common/headers/LeftBackBeerNameRightHeart";
import { LeftBackTItle } from "../../common/headers/LeftBackTitle";

export const DetailTemplate = () => {
  const [didPassStar, setDidPassStar] = useState(false);
  const beerName = "버드와이저"; // mock data
  const volume = 4.4;
  const category = "라거";
  const country = "미국";
  const MOCK_IMAGE_SRC = "https://picsum.photos/seed/picsum/200/300"; // mock data
  return (
    <>
      {/* title */}
      {didPassStar ? (
        <LeftBackBeerNameRightHeart beerName={beerName} />
      ) : (
        <LeftBackTItle />
      )}
      {/* image  */}
      <Center pt="72px" w="full">
        <Image
          boxSize="320px"
          src={MOCK_IMAGE_SRC}
          fallbackSrc="https://via.placeholder.com/150"
          alt={`${beerName} image`}
          borderRadius="6px"
        />
      </Center>

      <VStack px="24px" py="20px" w="full" alignItems="flex-start" gap="20px">
        {/* panel */}
        <HStack w="full" justifyContent="space-between">
          <Text textStyle="h1">{beerName}</Text>
          <HStack gap="20px">
            {/* share button */}
            <Box w="40px" h="40px" bg="black" />
            {/* like button */}
            <Box w="40px" h="40px" bg="black" />
          </HStack>
        </HStack>
        {/* description */}
        <HStack>
          <Text textStyle="h2">
            {volume} | {category} | {country}
          </Text>
        </HStack>
      </VStack>
    </>
  );
};
