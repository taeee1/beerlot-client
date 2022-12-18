import { Box, Text, VStack } from "@chakra-ui/react";
import React from "react";

const MarketingText = () => {
  return (
    <Box pt={"50px"}>
      <VStack gap={"10px"}>
        <Box>
          <Text as="span" textColor={"orange.200"}>
            3초만에{" "}
          </Text>
          <Text as="span" textColor={"black.100"}>
            로그인하고
          </Text>
        </Box>

        <Text textColor={"black.100"}>비어랏과 함께해요!</Text>
      </VStack>
    </Box>
  );
};

export default MarketingText;
