import {Box, VStack, Text, HStack} from "@chakra-ui/react";
import React from "react";

export const BasicPanelList = () => {
  return (
    <Box>
      <VStack>
        <VStack w="full" p="20px" gap="10px" alignItems="flex-start">
          <Text textStyle="h2_bold">기본 정보</Text>
          <HStack>
            <Text textStyle="h3" color="gray.300">
              제조 도시
            </Text>
            <Text textStyle="h2">콜럼버스, 미국</Text>
          </HStack>
        </VStack>
      </VStack>
    </Box>
  );
};
