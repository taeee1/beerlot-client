import { Flex } from "@chakra-ui/react";
import React from "react";
import BackButton from "../BackButton";
import { AlertBellPath } from "../custom-icons/customPath";
import BeerlotTitle from "./BeerlotTitle";

export const LeftBackTItleRightBell = () => {
  return (
    <Flex
      position="absolute"
      top="0px"
      right="0px"
      left="0px"
      pt="30px"
      pb="30px"
      px="35px"
      justifyContent="space-between"
      alignItems="center"
      dropShadow="0px 4px 4px rgba(0, 0, 0, 0.25)"
    >
      <BackButton />
      <BeerlotTitle />
      {AlertBellPath()}
    </Flex>
  );
};
