import {
  Box,
  Image as ChakraImage,
  HStack,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import {
  BeerCard,
  BeerCardBody,
  BeerCardFooter,
  BeerCategoryTag,
  BeerCategoryTagLabel,
  BeerNameText,
} from "@components/shared/Card/BeerCardItem";
import React from "react";
import {BeerResponseType} from "../../../../typedef/server/beer";

interface CommonBeersListProps {
  topBeersList?: BeerResponseType[];
}
const CommonBeersList: React.FC<CommonBeersListProps> = ({topBeersList}) => {
  return (
    <>
      <Text textColor="black.100" textStyle={"h2_bold"}>
        🔥 인기맥주 TOP10 🔥
      </Text>

      <SimpleGrid columns={2} spacing={"16px"}>
        {topBeersList &&
          topBeersList.map((item) => {
            return (
              <BeerCard key={item.id} mt={1} w="full">
                <BeerCardBody w="full" h="full" position={"relative"}>
                  <Box position="relative">
                    {item.image_url && (
                      <ChakraImage
                        src={item.image_url}
                        alt={item.name}
                        width="175px"
                        height="175px"
                        objectFit="cover"
                      />
                    )}
                  </Box>
                </BeerCardBody>
                <BeerCardFooter>
                  <BeerNameText>{item.name}</BeerNameText>
                  <HStack>
                    <BeerNameText>{item.origin_country}</BeerNameText>
                    <BeerCategoryTag>
                      <BeerCategoryTagLabel>
                        {item.category?.name}
                      </BeerCategoryTagLabel>
                    </BeerCategoryTag>
                  </HStack>
                </BeerCardFooter>
              </BeerCard>
            );
          })}
      </SimpleGrid>
    </>
  );
};

export {CommonBeersList};
