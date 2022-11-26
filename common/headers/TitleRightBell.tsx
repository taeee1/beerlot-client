import { Box, Flex } from "@chakra-ui/react";
import React from "react";
import { AlertBellPath } from "../custom-icons/customPath";
import BeerlotTitle from "./BeerlotTitle";

export const TitleRightBellHeader = () => {
  return (
    <Flex
      position="absolute"
      top="0px"
      right="0px"
      left="0px"
      pt="30px"
      pb="10px"
      px="20px"
      justifyContent="space-between"
      alignItems="center"
      dropShadow="0px 4px 4px rgba(0, 0, 0, 0.25)"
    >
      <Box w="24px" h="24px" />
      <BeerlotTitle />
      {AlertBellPath()}
    </Flex>
  );
};
