import {
  BeerResponseType,
  SingelBeerFetchResponseType,
} from "@/../typedef/server/beer";
import React, { useCallback, useEffect, useMemo } from "react";
import { CommonBeerImage } from "@/components/shared/CommonBeerImage/CommonBeerImage";
import { Box, HStack, Text } from "@chakra-ui/react";
import {
  BeerCard,
  BeerCardBody,
  BeerCardFooter,
  BeerCategoryTag,
  BeerCategoryTagLabel,
  BeerCountryText,
  BeerNameText,
} from "@components/shared/Card/BeerCardItem";
import { LikeButton } from "@/components/shared/LikeButton";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import {
  useBeerDislikeMutation,
  useBeerLikeMutation,
} from "@/../hooks/query/useBeerLikeMutation";
import { generateBeerDetailUrl } from "@/../utils/url";

interface RecommendedBeersListProps {
  beersList: (SingelBeerFetchResponseType | undefined)[];
  likedBeersList: BeerResponseType[] | undefined;
  username: string;
  onValidateLikedBeersList: () => void;
}

const RecommendedBeersList: React.FC<RecommendedBeersListProps> = ({
  onValidateLikedBeersList,
  beersList,
  likedBeersList,
  username,
}) => {
  const router = useRouter();
  const accessToken = Cookies.get("beerlot-oauth-auth-request") ?? "";
  const likedBeerIds = useMemo(
    () => likedBeersList?.map((item) => item?.id),
    [likedBeersList]
  );

  const likeBeerMutation = useBeerLikeMutation({
    onSuccess: () => {
      onValidateLikedBeersList();
    },
  });

  const dislikeBeerMutation = useBeerDislikeMutation({
    onSuccess: () => {
      onValidateLikedBeersList();
    },
  });

  const handleClickLike = useCallback(
    (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, id?: number) => {
      e.stopPropagation();
      if (id === undefined) return;

      const isLiked = likedBeerIds?.includes(id);

      if (!isLiked) {
        likeBeerMutation.mutate({ beerId: id, accessToken });
      } else {
        dislikeBeerMutation.mutate({ beerId: id, accessToken });
      }
    },
    [accessToken, dislikeBeerMutation, likeBeerMutation, likedBeerIds]
  );

  const checkIsLiked = (id?: number) => {
    if (id === undefined) return false;
    return likedBeerIds?.includes(id) ?? false;
  };

  const handleClickCard = useCallback(
    (id?: number, name?: string) => {
      if (!id || !name) return;
      const url = generateBeerDetailUrl(id, name);
      router.push(url);
    },
    [router]
  );
  if (beersList.includes(undefined)) return null;

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
            console.log("item");
            return (
              <BeerCard
                key={item?.id}
                mt={1}
                borderColor={"orange.200"}
                onClick={() => handleClickCard(item?.id, item?.name)}
              >
                <BeerCardBody position="relative">
                  <Box position="relative">
                    {item?.image_url && (
                      <CommonBeerImage
                        src={item?.image_url}
                        alt={item?.name}
                        width="124px"
                        height="128px"
                        objectFit="cover"
                      />
                    )}
                  </Box>
                  <Box position="absolute" top={0} right={0}>
                    <LikeButton
                      isLiked={checkIsLiked(item?.id)}
                      onClick={(e) => handleClickLike(e, item?.id)}
                      h={7}
                      aria-label="like button"
                    />
                  </Box>
                </BeerCardBody>
                <BeerCardFooter>
                  <BeerNameText>{item?.name}</BeerNameText>
                  <HStack>
                    <BeerCountryText country={item?.origin_country} />
                    <BeerCategoryTag bg="orange.200">
                      <BeerCategoryTagLabel>
                        {item?.category?.name}
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
