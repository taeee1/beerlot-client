import { Box, Center, Circle, Flex } from "@chakra-ui/react";
import React, { useState } from "react";
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Divider,
} from "@chakra-ui/react";
import Nickname from "./Nickname";
import Beers from "./Beers";

const SignUp = () => {
  const [isNicknameDone, setIsNickNameDone] = useState(true); // 초깃값 false
  const [isBeersDone, setIsBeersDone] = useState(false);
  return (
    <Flex h="100vh" px="27.5px" pb="73px" pt="34px" flexDirection="column">
      <Flex justifyContent="center" w="100%" gap="10px">
        <Circle size="8px" bg={isNicknameDone ? "Orange.200" : "Gray.200"} />
        <Circle size="8px" bg={isBeersDone ? "Orange.200" : "Gray.200"} />
      </Flex>
      <Nickname />
      <Beers />
    </Flex>
  );
};

export default SignUp;
