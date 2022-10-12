import { Box, Center, Circle, Flex } from "@chakra-ui/react";
import React, { useState } from "react";
import Beers from "../../Components/Auth/SignUp/Beers";
import Nickname from "../../Components/Auth/SignUp/Nickname";
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Divider,
} from "@chakra-ui/react";
import { LeftArrow } from "../../public/svg";
import BackButton from "../../Components/Utils/BackButton";
import SignUp from "../../Components/Auth/SignUp/SignUp";

// nickname을 정하지 않고,
// Beers로 넘어가는 경우 처리

const index = () => {
  return (
    <>
      <BackButton />
      <SignUp />
    </>
  );
};

export default index;
