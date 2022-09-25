import { Box, Flex, Text } from "@chakra-ui/react";
import React from "react";

interface EmptySearchResultProps {
  inputValue: string;
}

const EmptySearchResult: React.FC<EmptySearchResultProps> = ({
  inputValue,
}) => {
  return (
    <Flex
      justifyContent="center"
      alignItems="center"
      mt="118px"
      textStyle="h2_bold"
      gap="10px"
      flexDirection="column"
    >
      <Box flexDirection="row">
        <Text as="span" textStyle="h2_bold">{`'${inputValue}'`}</Text>
        <Text as="span" textStyle="h2">{`에 대한 검색 결과가 없어요🤔`}</Text>
      </Box>
      <Box>
        <Text textStyle="h3" textColor="Gray.300">
          다른 키워드로 검색해보세요!
        </Text>
      </Box>
      <Box
        borderRadius="10px"
        bg="Gray.101"
        py="10px"
        px="20px"
        color="white"
        gap="8px"
        w="100%"
        border="1px solid"
        borderColor="Gray.50"
        display="flex"
        flexDirection="column"
      >
        <Text textStyle="h3" textColor="Gray.300" textAlign="center">
          💡검색 Tip💡
        </Text>
        <Text textStyle="h3" textColor="Gray.300">
          1. 오타가 있는지 확인해보세요!
        </Text>
        <Text textStyle="h3" textColor="Gray.300">
          2. 영어로 입력했다면 한국어로 바꿔보세요!
        </Text>
        <Text textStyle="h3" textColor="Gray.300" style={{ textIndent: 12 }}>
          {`ex) OB라거 > 오비라거`}
        </Text>
      </Box>
    </Flex>
  );
};

export default EmptySearchResult;
