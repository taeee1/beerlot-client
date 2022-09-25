import React from "react";
import { Box, Center, Flex, Text } from "@chakra-ui/react";

const EmptyFilteredResult = () => {
  return (
    <Flex
      justifyContent="center"
      alignItems="center"
      mt="118px"
      textStyle="h2_bold"
      gap="16px"
      flexDirection="column"
    >
      <Box flexDirection="row">
        <Text
          as="span"
          textStyle="h2_bold"
        >{`아쉽게도 일치하는 맥주가 없어요😢`}</Text>
      </Box>
      <Center flexDirection="column" gap="4px">
        <Text textStyle="h3" textColor="Gray.300">
          다른 키워드로 검색해보세요!
        </Text>
        <Text textStyle="h3" textColor="Gray.300">
          {`ex) OB라거 > 오비라거`}
        </Text>
      </Center>
      <Center
        flexDirection="column"
        borderRadius="10px"
        bg="Gray.101"
        py="10px"
        px="16px"
        color="black"
        border="1px solid"
        borderColor="Gray.50"
      >
        <Box>
          <Text
            as="span"
            textStyle="h3"
            textColor="Orange.200"
            textAlign="center"
          >
            찾는 맥주
          </Text>
          <Text as="span" textStyle="h3">
            가 없나요?
          </Text>
        </Box>

        <Text
          textStyle="h3_bold"
          textColor="Orange.200"
          style={{ textIndent: 12 }}
        >
          👉 맥주 제보하기 👈
        </Text>
      </Center>
    </Flex>
  );
};

export default EmptyFilteredResult;
