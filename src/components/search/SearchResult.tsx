import { EmptyFilteredResult } from "@/components/result/EmptyFilteredResult";
import { CommonBeerImage } from "@/components/shared/CommonBeerImage/CommonBeerImage";
import { Box, HStack, SimpleGrid } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import {
  BeerCard,
  BeerCardBody,
  BeerCardFooter,
  BeerCategoryTag,
  BeerCategoryTagLabel,
  BeerCountryText,
  BeerNameText,
} from "../shared/Card/BeerCardItem";
import { BeerResponseType } from "../../../typedef/server/beer";
import { generateBeerDetailUrl } from "../../../utils/url";

interface SearchResultProps {
  loading: boolean;
  beers?: BeerResponseType[];
}

export const SearchResult: React.FC<SearchResultProps> = ({
  loading,
  beers,
}) => {
  const router = useRouter();

  const handleClickCard = (id: number, name: string) => {
    const url = generateBeerDetailUrl(id, name);
    router.push(url);
  };

  if (loading) return <div>loading...</div>;

  if (beers && beers.length === 0) return <EmptyFilteredResult />;

  return (
    <SimpleGrid columns={2} spacing={"16px"} mt={"8px"}>
      {beers?.map((beerItems) => {
        const {
          id = 0,
          name = "",
          origin_country,
          image_url,
          category,
        } = beerItems;
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
                  <BeerCategoryTagLabel>{category?.name}</BeerCategoryTagLabel>
                </BeerCategoryTag>
              </HStack>
            </BeerCardFooter>
          </BeerCard>
        );
      })}
    </SimpleGrid>
  );
};
