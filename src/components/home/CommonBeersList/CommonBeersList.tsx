import { generateBeerDetailUrl } from "@/../utils/url";
import { CommonBeerImage } from "@/components/shared/CommonBeerImage/CommonBeerImage";
import { LikeButton } from "@/components/shared/LikeButton";
import { Box, HStack, SimpleGrid, Skeleton, Text } from "@chakra-ui/react";
import {
  BeerCard,
  BeerCardBody,
  BeerCardFooter,
  BeerCategoryTag,
  BeerCategoryTagLabel,
  BeerCountryText,
  BeerNameText,
} from "@components/shared/Card/BeerCardItem";
import { useRouter } from "next/router";
import React, { useCallback } from "react";
import { BeerResponseType } from "../../../../typedef/server/beer";
interface CommonBeersListProps {
  beersList?: BeerResponseType[];
  loading: boolean;
}

const CommonBeersList: React.FC<CommonBeersListProps> = ({
  beersList,
  loading,
}) => {
  const router = useRouter();

  const clickHeart = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    router.push("/login");
    e.stopPropagation();
  };

  const handleClickCard = useCallback(
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
      {loading ? (
        <SimpleGrid columns={2} spacing={"16px"}>
          {Array(MOCK_BEERS_SKELETON_NUMBER)
            .fill("")
            .map((_, index) => (
              <BeerCard key={index} mt={1} w="full">
                <Skeleton
                  width="175px"
                  height="175px"
                  objectFit="cover"
                  bg={"gray.100"}
                />
                <BeerCardFooter>
                  <Skeleton bg={"gray.100"} w={"full"} h={"19px"} />
                  <Skeleton bg={"gray.100"} w={"full"} h={"17px"} mt={"2px"} />
                </BeerCardFooter>
              </BeerCard>
            ))}
        </SimpleGrid>
      ) : (
        <SimpleGrid columns={2} spacing={"16px"}>
          {beersList &&
            beersList.map((item) => {
              return (
                <BeerCard
                  key={item.id}
                  mt={1}
                  w="full"
                  onClick={() => handleClickCard(item?.id, item.name)}
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
                    <Box position="absolute" top={0} right={0}>
                      <LikeButton
                        isLiked={false}
                        onClick={clickHeart}
                        h={7}
                        aria-label="like button"
                      />
                    </Box>
                  </BeerCardBody>
                  <BeerCardFooter>
                    <BeerNameText>{item.name}</BeerNameText>
                    <HStack>
                      <BeerCountryText country={item.origin_country} />
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
      )}
    </>
  );
};

export { CommonBeersList };

const MOCK_BEERS_SKELETON_NUMBER = 2;
