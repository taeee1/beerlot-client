import {Flex, Text} from "@chakra-ui/react";
import React from "react";
import {Rating} from "../Rating";

interface BeerRatingSectionProps {
  handleChangeRate: (rate: number) => void;
  rate: number;
}

export const BeerRatingSection: React.FC<BeerRatingSectionProps> = ({
  handleChangeRate,
  rate,
}) => {
  return (
    <Flex flexDir="column" p="10px" gap="10px">
      <Text textStyle="h2" textColor="black.100">
        얼마나 맛있었나요?
      </Text>
      <Rating
        starSize={23}
        onClick={handleChangeRate}
        buttonSize={"xs"}
        _rate={rate}
      />
    </Flex>
  );
};
