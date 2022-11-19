import { Flex } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useState } from "react";
import BackButton from "../../../common/BackButton";
import CompleteCircles from "../../../common/CompleteCircles";
import BeerCards from "./BeerCards";

const Beers = () => {
  return (
    <>
      <Flex h="100vh" px="21px" pt="34px" flexDirection="column">
        <BackButton />
        <CompleteCircles isNicknameDone={true} isBeersDone={true} />
        <BeerCards nickName="김태희" />
      </Flex>
    </>
  );
};

export default Beers;
