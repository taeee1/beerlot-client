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
import React, {useCallback} from "react";
import {BeerResponseType} from "../../../../typedef/server/beer";
import {useRouter} from "next/router";
import {generateBeerDetailUrl} from "@/../utils/url";
import {CommonBeerImage} from "@/components/shared/CommonBeerImage/CommonBeerImage";

interface CommonBeersListProps {
  topBeersList?: BeerResponseType[];
}
const CommonBeersList: React.FC<CommonBeersListProps> = ({topBeersList}) => {
  const router = useRouter();
  const onClick = useCallback(
    (id?: number, name?: string) => {
      if (!id || !name) return; //TODO: add toast

      const url = generateBeerDetailUrl(id, name);
      router.push(url);
    },
    [router]
  );

  return (
    <>
      <Text textColor="black.100" textStyle={"h2_bold"}>
        🔥 인기맥주 TOP10 🔥
      </Text>

      <SimpleGrid columns={2} spacing={"16px"}>
        {topBeersList &&
          topBeersList.map((item) => {
            return (
              <BeerCard
                key={item.id}
                mt={1}
                w="full"
                onClick={() => onClick(item?.id, item.name)}
              >
                <BeerCardBody w="full" h="full" position={"relative"}>
                  <Box position="relative">
                    {item.image_url && (
                      <CommonBeerImage
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
