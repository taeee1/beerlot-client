import {BeerResponseType} from "@/../typedef/server/beer";
import {generateBeerDetailUrl} from "@/../utils/url";
import {CommonBeerImage} from "@/components/shared/CommonBeerImage/CommonBeerImage";
import {LikeButton} from "@/components/shared/LikeButton";
import {Box, HStack, Text} from "@chakra-ui/react";
import {
  BeerCard,
  BeerCardBody,
  BeerCardFooter,
  BeerCategoryTag,
  BeerCategoryTagLabel,
  BeerNameText,
} from "@components/shared/Card/BeerCardItem";
import {useRouter} from "next/router";
import React, {useCallback, useEffect} from "react";

interface TopBeersListProps {
  beersList: BeerResponseType[];
  likedBeersList: BeerResponseType[] | undefined;
}

const TopBeersList: React.FC<TopBeersListProps> = ({
  beersList,
  likedBeersList,
}) => {
  useEffect(() => {
    console.log("likedBeersList", likedBeersList);
  });
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
      <HStack overflowX={"auto"} w="full" gap={"12px"}>
        {beersList &&
          beersList.map((item) => {
            return (
              <BeerCard
                key={item.id}
                mt={1}
                pos={"relative"}
                onClick={() => onClick(item?.id, item.name)}
              >
                <Box id={"like button"} pos={"absolute"} right={4} top={4}>
                  <LikeButton isLiked={true} aria-label="like button" />
                </Box>

                <BeerCardBody position="relative">
                  <Box position="relative">
                    {item.image_url && (
                      <CommonBeerImage
                        src={item.image_url}
                        alt={item.name}
                        width="124px"
                        height="128px"
                        objectFit="cover"
                      />
                    )}
                  </Box>
                  <Box position="absolute" top={0} right={0}>
                    <LikeButton
                      isLiked={true}
                      onClick={() => console.log("like button clicked")}
                      h={7}
                      aria-label="like button"
                    />
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
      </HStack>
    </>
  );
};

export default TopBeersList;
