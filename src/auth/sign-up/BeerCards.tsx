import { Box, Text, VStack, Flex, SimpleGrid } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import FloatingButton from "../../../common/FloatingButton";

interface BeerCardsProps {
  nickName: string;
}

const BeerCards: React.FC<BeerCardsProps> = ({ nickName }) => {
  const [isFullfilled, setIsFullfilled] = useState<boolean>(false);
  const [selectedBeers, setSelectedBeers] = useState([]);

  useEffect(() => {
    setIsFullfilled(selectedBeers.length > 0);
  }, [selectedBeers.length]);

  // temp 함수
  const onClick = () => {
    setIsFullfilled(true);
  };
  return (
    <>
      <FloatingButton
        disabled={!isFullfilled}
        text="완료!"
        href="/"
        bgColor={isFullfilled ? "orange.200" : "gray.200"}
        textColor={isFullfilled ? "white.100" : "black.100"}
        boxShadow={isFullfilled ? "0px 8px 16px rgba(0, 0, 0, 0.3)" : "none"}
      />
      <VStack gap={"25px"} p={0} pb={"25px"} alignItems="start">
        <VStack pt={"64px"} textStyle="h1" gap="5px" alignItems="start">
          <Box p={0}>
            <Text as="span" textColor="orange.200">
              {nickName}
            </Text>
            <Text as="span">님의 최애맥주</Text>
          </Box>
          <Box>
            <Text> N개를 골라주세요!</Text>
          </Box>
          <Box>
            <Text fontSize="12px" textColor="gray.300">
              고른 맥주를 바탕으로 취향 분석 후, 맥주를 추천해드릴게요 :)
            </Text>
          </Box>
        </VStack>
        <SimpleGrid columns={3} spacingX="10px" spacingY="25px">
          <Box bg="tomato" height="80px" width="100px" onClick={onClick}></Box>
          <Box bg="tomato" height="80px" width="100px"></Box>
          <Box bg="tomato" height="80px" width="100px"></Box>
          <Box bg="tomato" height="80px" width="100px"></Box>
          <Box bg="tomato" height="80px" width="100px"></Box>
          <Box bg="tomato" height="80px" width="100px"></Box>
          <Box bg="tomato" height="80px" width="100px"></Box>
          <Box bg="tomato" height="80px" width="100px"></Box>
          <Box bg="tomato" height="80px" width="100px"></Box>
          <Box bg="tomato" height="80px" width="100px"></Box>
          <Box bg="tomato" height="80px" width="100px"></Box>
          <Box bg="tomato" height="80px" width="100px"></Box>
          <Box bg="tomato" height="80px" width="100px"></Box>
          <Box bg="tomato" height="80px" width="100px"></Box>
          <Box bg="tomato" height="80px" width="100px"></Box>
          <Box bg="tomato" height="80px" width="100px"></Box>
          <Box bg="tomato" height="80px" width="100px"></Box>
          <Box bg="tomato" height="80px" width="100px"></Box>
          <Box bg="tomato" height="80px" width="100px"></Box>
          <Box bg="tomato" height="80px" width="100px"></Box>
          <Box bg="tomato" height="80px" width="100px"></Box>
          <Box bg="tomato" height="80px" width="100px"></Box>
          <Box bg="tomato" height="80px" width="100px"></Box>
        </SimpleGrid>
      </VStack>
    </>
  );
};

export default BeerCards;
