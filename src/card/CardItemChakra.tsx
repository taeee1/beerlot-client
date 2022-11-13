import { Flex, Text, VStack } from "@chakra-ui/react";
import React, { useState } from "react";
import styled from "styled-components";
import LikeButton from "../../common/OrangeLikeButton";

interface CardItemProps {
  isTwoByTwo: boolean;
  beerName: string;
  img_src: string;
  sort: string;
  country: string;
  borderColor: string;
}

const CardItemChakra: React.FC<CardItemProps> = ({
  beerName,
  img_src,
  sort,
  country,
  isTwoByTwo,
  borderColor,
}) => {
  const [isLiked, setIsLiked] = useState(false);
  const handleClick = (state: boolean) => {
    setIsLiked(state);
  };

  const iconProps = {
    position: "absolute",
    top: "12px",
    right: "12px",
    w: "27px",
    h: "29px",
    filter: isLiked ? "none" : "drop-shadow(1px 1px 1px rgba(0, 0, 0, 0.5))",
    color: isLiked ? "orange.300" : "#ffffff",
  };

  return (
    <>
      <VStack
        position="absolute"
        alignItems="flex-start"
        gap="4px"
        p="8px"
        border="1px solid"
        borderRadius="12px"
        borderColor={borderColor}
      >
        <LikeButton
          isClicked={isLiked}
          onClick={handleClick}
          iconProps={iconProps}
        />
        <CardImage src={img_src} alt={beerName} isTwoByTwo={isTwoByTwo} />
        <Text textStyle="h4" color="black">
          {beerName}
        </Text>
        <Flex justifyContent="space-between">
          <Text py="0" px="3px">
            {country}
          </Text>
          <Flex
            py="0"
            px="5px"
            borderRadius="20px"
            bg="orange.300"
            alignItems="center"
          >
            <Text textStyle="h4" color="white">
              {sort}
            </Text>
          </Flex>
        </Flex>
      </VStack>
    </>
  );
};

export default CardItemChakra;

export const CardImage = styled.img<{ isTwoByTwo: boolean }>`
  border-radius: 7px;
  width: ${(isTwoByTwo) => (isTwoByTwo ? `37vw` : `30vw`)};
  height: ${(isTwoByTwo) => (isTwoByTwo ? `37vw` : `30vw`)};
`;
