import { Flex } from "@chakra-ui/react";
import BackButton from "../../../common/BackButton";
import CompleteCircles from "../../../common/CompleteCircles";
import Nickname from "./Nickname";

const SignUpTemplate = () => {
  return (
    <Flex h="100vh" px="27.5px" pb="73px" pt="34px" flexDirection="column">
      <BackButton />
      <CompleteCircles isNicknameDone={true} isBeersDone={false} />
      <Nickname />
    </Flex>
  );
};

export default SignUpTemplate;
