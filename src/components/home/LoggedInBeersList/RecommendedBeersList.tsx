import {
  BeerResponseType,
  SingelBeerFetchResponseType,
} from "@/../typedef/server/beer";
import React, { useCallback, useEffect, useMemo } from "react";
import { CommonBeerImage } from "@/components/shared/CommonBeerImage/CommonBeerImage";
import {Box, HStack, Text, Flex, Skeleton, SkeletonText} from "@chakra-ui/react";
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
import {mockSession} from "next-auth/client/__tests__/helpers/mocks";

interface RecommendedBeersListProps {
  beersList: (SingelBeerFetchResponseType | undefined)[];
  likedBeersList: BeerResponseType[] | undefined;
  username: string;
  isLoading?:boolean;
  onValidateLikedBeersList: () => void;
}

const RecommendedBeersList: React.FC<RecommendedBeersListProps> = ({
  onValidateLikedBeersList,
  beersList,
  likedBeersList,
    isLoading,
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

  const skeletonList = Array(5).fill("");
  return (
      <Box pt={4}>
          <Text textColor="black.100" textStyle={"h2_bold"}>
              {`🍻 `}
              <Box as="span" color="orange.200">
                  {username}
              </Box>
              {`님께 추천해요 🍻`}
          </Text>
          <HStack
              overflowY={"auto"}
              w="full"
              gap={"12px"}
              sx={{
                  "::-webkit-scrollbar": {
                      display: "none",
                  },
              }}
          >
              {isLoading
                  ? skeletonList.map((_, index) => (
                      <BeerCard key={index} mt={1} pos={"relative"}>
                          <BeerCardBody position="relative">
                              <Box position="relative">
                                  <Skeleton width="124px" height="128px" />
                              </Box>
                          </BeerCardBody>
                          <BeerCardFooter>
                              <SkeletonText noOfLines={1} skeletonHeight={"17px"} />
                              <Skeleton mt={"2px"}>
                                  <HStack>
                                      <BeerCountryText country="" />
                                      <BeerCategoryTag>
                                          <BeerCategoryTagLabel />
                                      </BeerCategoryTag>
                                  </HStack>
                              </Skeleton>
                          </BeerCardFooter>
                      </BeerCard>
                  ))
                  : beersList.map((beer) => (
                      <BeerCard
                          key={beer?.id}
                          mt={1}
                          pos={"relative"}
                          onClick={() => handleClickCard(beer?.id, beer?.name)}
                      >
                          <BeerCardBody position="relative">
                              <Box position="relative">
                                  {beer?.image_url && (
                                      <CommonBeerImage
                                          src={beer.image_url}
                                          alt={beer.name}
                                          width="124px"
                                          height="128px"
                                          objectFit="cover"
                                      />
                                  )}
                              </Box>
                              <Box position="absolute" top={0} right={0}>
                                  <LikeButton
                                      isLiked={likedBeerIds?.includes(beer?.id) ?? false}
                                      onClick={(e) => handleClickLike(e, beer?.id)}
                                      h={7}
                                      aria-label="like button"
                                  />
                              </Box>
                          </BeerCardBody>
                          <BeerCardFooter>
                              <BeerNameText>{beer?.name}</BeerNameText>
                              <Flex>
                                  <BeerCountryText country={beer?.origin_country} />
                                  <BeerCategoryTag>
                                      <BeerCategoryTagLabel>
                                          {beer?.category?.name}
                                      </BeerCategoryTagLabel>
                                  </BeerCategoryTag>
                              </Flex>
                          </BeerCardFooter>
                      </BeerCard>
                  ))}
          </HStack>
      </Box>
  );
};

export default RecommendedBeersList;
