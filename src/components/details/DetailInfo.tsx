import { roundToDecimal } from "@/../utils/number";
import { Box, Center, HStack, Text, VStack, useToast } from "@chakra-ui/react";
import axios from "axios";
import Cookies from "js-cookie";
import React, { useMemo, useState } from "react";
import { useMutation } from "react-query";
import {
  useBeerDislikeMutation,
  useBeerLikeMutation,
} from "../../../hooks/query/useBeerLikeMutation";
import { useUserBeersQuery } from "../../../hooks/query/useUserQuery";
import { BeerResponseType } from "../../../typedef/server/beer";
import { CommonBeerImage } from "../shared/CommonBeerImage/CommonBeerImage";
import { LeftBackBeerNameRightHeart } from "../shared/Headers/LeftBackBeerNameRightHeart";
import { LeftBackTitle } from "../shared/Headers/LeftBackTitle";
import { LikeButton } from "../shared/LikeButton";
import { Rating } from "../shared/Rating";

interface DetailInfoProps {
  beerName: string;
  volume: number;
  category: string;
  country: string;
  beerImg: string;
  beerId: number;
  rate: number;
}

export const DetailInfo: React.FC<DetailInfoProps> = ({
  beerName,
  volume,
  category,
  country,
  beerImg,
  beerId,
  rate,
}) => {
  const [didPassStar, setDidPassStar] = useState(false);
  const rateToUse = roundToDecimal(rate);
  const toastId = "test-toast";
  const accessToken = Cookies.get("beerlot-oauth-auth-request") ?? "";
  const userBeersQuery = useUserBeersQuery(accessToken);
  const likedBeersList = userBeersQuery?.data?.contents;
  const likedBeerIds = useMemo(
    () => likedBeersList?.map((item: BeerResponseType) => item.id),
    [likedBeersList]
  );
  const isLikedBeer = likedBeerIds?.includes(beerId);

  const likeBeerMutation = useBeerLikeMutation({
    onSuccess: () => {
      userBeersQuery.refetch();
    },
  });

  const dislikeBeerMutation = useBeerDislikeMutation({
    onSuccess: () => {
      userBeersQuery.refetch();
    },
  });

  const toastTitle = isLikedBeer
    ? "좋아요한 맥주에서 삭제했어요!"
    : "좋아요한 맥주에 추가했어요!";

  const toast = useToast({
    position: "bottom",
    title: toastTitle,
    id: toastId,
    isClosable: true,
    duration: 3000,
    containerStyle: {
      margin: "8px",
    },
    render: () => (
      <Box
        mx="12px"
        py="8px"
        color="white"
        bg="blue.500"
        backgroundColor="black.200"
        borderRadius="5px"
      >
        <Text textStyle={"h3"} textColor="white" textAlign={"center"}>
          {toastTitle}
        </Text>
      </Box>
    ),
  });

  const handleClickLike = () => {
    toast();
    if (!isLikedBeer) {
      likeBeerMutation.mutate({ beerId: beerId, accessToken });
    } else {
      dislikeBeerMutation.mutate({ beerId: beerId, accessToken });
    }
  };

  return (
    <>
      {/* title */}
      {didPassStar ? (
        <LeftBackBeerNameRightHeart beerName={beerName} />
      ) : (
        <LeftBackTitle />
      )}
      {/* image  */}
      <Center pt="72px" w="full" px="24px">
        <CommonBeerImage
          boxSize="320px"
          src={beerImg}
          alt={`${beerName} image`}
          borderRadius="6px"
        />
      </Center>

      <VStack px="24px" py="20px" w="full" alignItems="flex-start" gap="20px">
        {/* panel */}
        <HStack w="full" justifyContent="space-between">
          <Text textStyle="h1">{beerName}</Text>
          <HStack gap="20px">
            <LikeButton
              isLiked={isLikedBeer}
              onClick={handleClickLike}
              w="40px"
              h="40px"
              fontSize={"28px"}
              cursor="pointer"
              aria-label="like button"
            />
          </HStack>
        </HStack>
        {/* description */}
        <HStack>
          <Text textStyle="h2">
            {volume} | {category} | {country}
          </Text>
        </HStack>
        <Center w="full">
          <Rating
            _rate={rateToUse}
            starSize={40}
            styleProps={{
              gap: "20px",
            }}
          />
        </Center>
      </VStack>
    </>
  );
};
