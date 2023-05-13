import {Box, Image as ChakraImage, HStack, Text} from "@chakra-ui/react";
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
import {LikeButton} from "@/components/shared/LikeButton";

interface LoggedInBeersListProps {
  topBeersList?: BeerResponseType[];
  userName?: string;
}
const LoggedInBeersList: React.FC<LoggedInBeersListProps> = ({
  topBeersList,
  userName,
}) => {
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
        {topBeersList &&
          topBeersList.map((item) => {
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

                <BeerCardBody>
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
      <Text textColor="black.100" textStyle={"h2_bold"} mt={8}>
        🍻{" "}
        <Text textColor="orange.200" textStyle={"h2_bold"} display="inline">
          {userName}
        </Text>
        님께 추천해요 🍻
      </Text>
      <HStack overflowX={"auto"} w="full" gap={"12px"}>
        {topBeersList &&
          topBeersList.map((item) => {
            return (
              <BeerCard key={item.id} mt={1} borderColor={"orange.200"}>
                <BeerCardBody>
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

export {LoggedInBeersList};
