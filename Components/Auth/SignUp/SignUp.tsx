import { Flex } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import BackButton from "../../Utils/BackButton";
import CompleteCircles from "../../Utils/CompleteCircles";
import Nickname from "./Nickname";

const SignUp = () => {
  const router = useRouter();
  const onClick = () => {
    router.back();
  };
  return (
    <Flex h="100vh" px="27.5px" pb="73px" pt="34px" flexDirection="column">
      <BackButton onClick={onClick} />
      <CompleteCircles isNicknameDone={true} isBeersDone={false} />
      <Nickname />
    </Flex>
  );
};

export default SignUp;
