import { Flex } from "@chakra-ui/react";
import React, { useState } from "react";
import BackButton from "../../Utils/BackButton";
import CompleteCircles from "../../Utils/CompleteCircles";
import Nickname from "./Nickname";

const SignUp = () => {
  const [isNicknameDone, setIsNickNameDone] = useState(true); // 초깃값 false
  const [isBeersDone, setIsBeersDone] = useState(false);
  return (
    <Flex h="100vh" px="27.5px" pb="73px" pt="34px" flexDirection="column">
      <BackButton />
      <CompleteCircles
        isNicknameDone={isNicknameDone}
        isBeersDone={isBeersDone}
      />
      <Nickname />
    </Flex>
  );
};

export default SignUp;
