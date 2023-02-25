import {
  Box,
  BoxProps,
  HStack,
  ImageProps,
  Img,
  Text,
  TextProps,
  VStack,
} from "@chakra-ui/react";
import axios from "axios";
import React, {useState} from "react";
import {useMutation} from "react-query";
import {dislikeBeerApi, likeBeerApi} from "../src/api/beers/api";
import {LikeButton} from "./LikeButton";

interface BeerCardProps {
  styleProps?: styleProps;
  isLikable?: boolean;
  beerName: string;
  img_src: string;
  country: string;
  sort: string;
  beerId: number;
}

interface styleProps {
  boxStyleProps?: BoxProps;
  nameProps?: TextProps;
  countryProps?: TextProps;
  sortProps?: TextProps;
  imageProps?: ImageProps;
}

const BeerCard: React.FC<BeerCardProps> = ({
  styleProps,
  isLikable,
  beerName,
  img_src,
  country,
  sort,
  beerId,
}) => {
  const [isLiked, setIsLiked] = useState(false);

  const handleClick = () => {
    setIsLiked(!isLiked);
    isLiked ? dislikeBeerApi(beerId) : likeBeerApi(beerId); // 데이터 저장
  };

  return (
    <VStack {...styleProps?.boxStyleProps} w="full">
      {isLikable && (
        <Box position="absolute" right="0px" top="0px">
          <LikeButton
            isClicked={isLiked}
            onClick={handleClick}
            position="absolute"
            top="12px"
            right="12px"
            w="27px"
            h="29px"
            filter={
              isLiked ? "none" : "drop-shadow(1px 1px 1px rgba(0, 0, 0, 0.5))"
            }
            color={isLiked ? "orange.300" : "#ffffff"}
          />
        </Box>
      )}
      <Img
        alt={`photo of ${beerName}`}
        src={img_src}
        {...styleProps?.imageProps}
      />
      <Text {...styleProps?.nameProps}>{beerName}</Text>
      <HStack>
        <Text {...styleProps?.countryProps}>{country}</Text>
        <Text {...styleProps?.sortProps}>{sort}</Text>
      </HStack>
    </VStack>
  );
};

export default BeerCard;
