import {BeerResponseType} from "@/../typedef/server/beer";
import React, {useEffect} from "react";
import {CommonBeerImage} from "@/components/shared/CommonBeerImage/CommonBeerImage";
import {Box, HStack, Text} from "@chakra-ui/react";
import {
  BeerCard,
  BeerCardBody,
  BeerCardFooter,
  BeerCategoryTag,
  BeerCategoryTagLabel,
  BeerNameText,
} from "@components/shared/Card/BeerCardItem";
import {LikeButton} from "@/components/shared/LikeButton";

interface RecommendedBeersListProps {
  beersList: BeerResponseType[];
  likedBeersList: BeerResponseType[] | undefined;
  username: string;
}

const RecommendedBeersList: React.FC<RecommendedBeersListProps> = ({
  beersList,
  likedBeersList,
  username,
}) => {
  useEffect(() => {
    console.log("likedBeersList", likedBeersList);
  });
  return (
    <>
      <Text textColor="black.100" textStyle={"h2_bold"} mt={8}>
        🍻{" "}
        <Text textColor="orange.200" textStyle={"h2_bold"} display="inline">
          {username}
        </Text>
        님께 추천해요 🍻
      </Text>
      <HStack overflowX={"auto"} w="full" gap={"12px"}>
        {beersList &&
          beersList.map((item) => {
            return (
              <BeerCard key={item.id} mt={1} borderColor={"orange.200"}>
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
                    <BeerCategoryTag bg="orange.200">
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

export default RecommendedBeersList;
