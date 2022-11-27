import { Box, Center, HStack, Image, Text, VStack } from "@chakra-ui/react";
import { useState } from "react";
import { LeftBackBeerNameRightHeart } from "../../common/headers/LeftBackBeerNameRightHeart";
import { LeftBackTItle } from "../../common/headers/LeftBackTitle";
import { Rating } from "../../common/Rating";

interface DetailInfoProps {
  beerName: string;
  volume: number;
  category: string;
  country: string;
  beerImg: string;
}

export const DetailInfo: React.FC<DetailInfoProps> = ({
  beerName,
  volume,
  category,
  country,
  beerImg,
}) => {
  const [didPassStar, setDidPassStar] = useState(false);
  return (
    <>
      {/* title */}
      {didPassStar ? (
        <LeftBackBeerNameRightHeart beerName={beerName} />
      ) : (
        <LeftBackTItle />
      )}
      {/* image  */}
      <Center pt="72px" w="full">
        <Image
          boxSize="320px"
          src={beerImg}
          fallbackSrc="https://via.placeholder.com/150"
          alt={`${beerName} image`}
          borderRadius="6px"
        />
      </Center>

      <VStack px="24px" py="20px" w="full" alignItems="flex-start" gap="20px">
        {/* panel */}
        <HStack w="full" justifyContent="space-between">
          <Text textStyle="h1">{beerName}</Text>
          <HStack gap="20px">
            {/* share button */}
            <Box w="40px" h="40px" bg="black" />
            {/* like button */}
            <Box w="40px" h="40px" bg="black" />
          </HStack>
        </HStack>
        {/* description */}
        <HStack>
          <Text textStyle="h2">
            {volume} | {category} | {country}
          </Text>
        </HStack>
        <Center w="full">
          <Rating
            styleProps={{
              gap: "20px",
            }}
          />
        </Center>
      </VStack>
    </>
  );
};
