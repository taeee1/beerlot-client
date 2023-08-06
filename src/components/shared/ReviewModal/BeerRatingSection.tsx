import React from "react";
import {
  Box,
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Text,
  Textarea,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
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
      <Rating starSize={24} onClick={handleChangeRate} _rate={rate} />
    </Flex>
  );
};
