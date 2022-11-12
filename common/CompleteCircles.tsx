import { Circle, Flex } from "@chakra-ui/react";
import React from "react";

interface CompleteCirclesProps {
  isNicknameDone: boolean;
  isBeersDone: boolean;
}

const CompleteCircles: React.FC<CompleteCirclesProps> = ({
  isNicknameDone,
  isBeersDone,
}) => {
  return (
    <Flex justifyContent="center" w="100%" gap="10px">
      <Circle size="8px" bg={isNicknameDone ? "orange.200" : "gray.200"} />
      <Circle size="8px" bg={isBeersDone ? "orange.200" : "gray.200"} />
    </Flex>
  );
};

export default CompleteCircles;
